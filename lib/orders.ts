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

export async function createOrder(customer: OrderCustomer, items: OrderItem[]): Promise<{ id: string; total: number }> {
  if (!items.length) throw new Error('Order must contain at least one item')
  if (!customer.name || !customer.phone || !customer.email || !customer.address || !customer.pincode || !customer.city || !customer.state) throw new Error('All customer fields are required')

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  if (total <= 0) throw new Error('Order total must be positive')

  const orderId = `HL${Date.now().toString(36).toUpperCase().slice(-6)}`
  const now = new Date()

  const result = await db
    .insert(orders)
    .values({
      id: orderId,
      customerName: customer.name,
      customerEmail: customer.email,
      items: { customer, items },
      total,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    })
    .returning()

  if (!result[0]) throw new Error('Failed to create order')
  return { id: orderId, total }
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
