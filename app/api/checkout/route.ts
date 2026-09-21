import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { checkoutPayload } from '@/lib/order-validation'
import { randomUUID } from 'node:crypto'

export async function POST(request: Request) {
  const parsed = checkoutPayload.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Check your delivery details and cart items.' }, { status: 400 })
  const { customer, items } = parsed.data
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  if (total <= 0) return NextResponse.json({ error: 'Order total must be greater than zero.' }, { status: 400 })
  const orderId = `HL${Date.now().toString(36).toUpperCase().slice(-6)}${randomUUID().slice(0, 4).toUpperCase()}`
  await db.insert(orders).values({ id: orderId, customerName: customer.name, customerEmail: customer.email, items, total, status: 'pending', createdAt: new Date(), updatedAt: new Date() })
  return NextResponse.json({ orderId, paymentStatus: 'pending', paymentAdapter: process.env.CASHFREE_APP_ID ? 'cashfree-ready' : 'cashfree-not-connected' }, { status: 201 })
}
