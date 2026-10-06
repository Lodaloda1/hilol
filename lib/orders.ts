import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export type OrderItem = {
  id: string
  garmentId: string
  variantId: string
  name: string
  size: string
  color: string
  meme: string
  quantity: number
  price: number
}

export type ShippingMethod = 'standard' | 'express'
export type PaymentMethod = 'prepaid' | 'cod'

const authoritativePrices: Record<string, number> = { 'round-neck': 469, 'normal-oversized-tee': 579, 'premium-oversized-tee': 629, 'premium-acid-wash-oversized-tee': 679 }

export type OrderCustomer = {
  name: string
  phone: string
  email: string
  address: string
  pincode: string
  city: string
  state: string
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export const stateTransitions: Record<OrderStatus, OrderStatus[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['shipped'],
  shipped: ['delivered'],
  delivered: [],
  cancelled: [],
}

export async function createOrder(customer: OrderCustomer, items: OrderItem[], shippingMethod: ShippingMethod = 'standard', paymentMethod: PaymentMethod = 'prepaid'): Promise<{ id: string; total: number; upfront: number; deliveryDue: number }> {
  if (!items.length) throw new Error('Order must contain at least one item')
  if (!customer.name || !customer.phone || !customer.email || !customer.address || !customer.pincode || !customer.city || !customer.state) throw new Error('All customer fields are required')

  if (!['standard', 'express'].includes(shippingMethod) || !['prepaid', 'cod'].includes(paymentMethod)) throw new Error('Invalid checkout options')
  const pricedItems = items.map((item) => { const unitPrice = authoritativePrices[item.garmentId]; if (!unitPrice) throw new Error('Invalid product'); return { ...item, price: unitPrice } })
  const subtotal = pricedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const expressFee = shippingMethod === 'express' ? 40 : 0
  const codFee = paymentMethod === 'cod' ? 35 : 0
  const upfront = paymentMethod === 'cod' ? 80 : subtotal + expressFee
  const deliveryDue = paymentMethod === 'cod' ? subtotal + expressFee + codFee - 80 : 0
  const total = subtotal + expressFee + codFee
  if (total <= 0 || (paymentMethod === 'cod' && deliveryDue < 0)) throw new Error('Order total must be positive')

  const orderId = `HL${Date.now().toString(36).toUpperCase().slice(-6)}`
  const now = new Date()

  const result = await db
    .insert(orders)
    .values({
      id: orderId,
      customerName: customer.name,
      customerEmail: customer.email,
      items: { customer, items: pricedItems, shippingMethod, paymentMethod, expressFee, codFee, upfront, deliveryDue },
      total,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    })
    .returning()

  if (!result[0]) throw new Error('Failed to create order')
  return { id: orderId, total, upfront, deliveryDue }
}

export async function getOrder(orderId: string) {
  const result = await db.select().from(orders).where(eq(orders.id, orderId))
  if (!result[0]) return null
  const order = result[0]
  try {
    const parsed = JSON.parse(order.items as string)
    return { ...order, items: parsed }
  } catch {
    return order
  }
}

export async function canTransition(orderId: string, newStatus: OrderStatus): Promise<boolean> {
  const order = await getOrder(orderId)
  if (!order) return false
  const currentStatus = order.status as OrderStatus
  return stateTransitions[currentStatus]?.includes(newStatus) ?? false
}
