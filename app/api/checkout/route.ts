import { NextResponse } from 'next/server'
import { createOrder, type OrderItem, type OrderCustomer, type ShippingMethod, type PaymentMethod } from '@/lib/orders'

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)

    if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

    const { customer, items, shippingMethod = 'standard', paymentMethod = 'prepaid' } = body as { customer?: unknown; items?: unknown; shippingMethod?: ShippingMethod; paymentMethod?: PaymentMethod }

    if (!customer || typeof customer !== 'object') return NextResponse.json({ error: 'Customer details required' }, { status: 400 })
    if (!Array.isArray(items) || items.length === 0) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })

    const typedCustomer = customer as Record<string, unknown>
    const name = String(typedCustomer.name ?? '')
    const phone = String(typedCustomer.phone ?? '')
    const email = String(typedCustomer.email ?? '')
    const address = String(typedCustomer.address ?? '')
    const pincode = String(typedCustomer.pincode ?? '')
    const city = String(typedCustomer.city ?? '')
    const state = String(typedCustomer.state ?? '')

    if (!name || !phone || !email || !address || !pincode || !city || !state) return NextResponse.json({ error: 'All customer fields are required' }, { status: 400 })

    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    if (!/^\d{6}$/.test(pincode.replace(/\D/g, ''))) return NextResponse.json({ error: 'Invalid pincode' }, { status: 400 })

    const typedItems: OrderItem[] = items.map((item: unknown) => {
      const typedItem = item as Record<string, unknown>
      return {
        id: String(typedItem.id ?? ''),
        garmentId: String(typedItem.garmentId ?? ''),
        variantId: String(typedItem.variantId ?? ''),
        name: String(typedItem.name ?? ''),
        size: String(typedItem.size ?? ''),
        color: String(typedItem.color ?? ''),
        meme: String(typedItem.meme ?? ''),
        quantity: Math.max(1, Math.min(100, Math.floor(Number(typedItem.quantity) || 1))),
        price: Math.max(0, Math.floor(Number(typedItem.price) || 0)),
      }
    })

    if (typedItems.some((item) => !item.id || !item.garmentId || !item.size || item.quantity <= 0 || item.price <= 0)) {
      return NextResponse.json({ error: 'Invalid cart items' }, { status: 400 })
    }

    const orderCustomer: OrderCustomer = { name, phone, email, address, pincode, city, state }
    const result = await createOrder(orderCustomer, typedItems, shippingMethod, paymentMethod)

    return NextResponse.json({ orderId: result.id, total: result.total, upfront: result.upfront, deliveryDue: result.deliveryDue }, { status: 201 })
  } catch (error) {
    console.error('[v0] Checkout error:', error)
    return NextResponse.json({ error: 'Unable to create order' }, { status: 500 })
  }
}
