import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const orderId = url.searchParams.get('orderId')?.trim().toUpperCase()
  const contact = url.searchParams.get('contact')?.trim().toLowerCase()
  if (!orderId || !contact) return NextResponse.json({ error: 'Order ID and email or phone are required' }, { status: 400 })
  const result = await db.select({ id: orders.id, status: orders.status, createdAt: orders.createdAt, updatedAt: orders.updatedAt, customerEmail: orders.customerEmail, items: orders.items }).from(orders).where(eq(orders.id, orderId))
  const order = result[0]
  const rawItems = order?.items as { customer?: { phone?: string; email?: string } } | null
  const savedPhone = rawItems?.customer?.phone?.replace(/\D/g, '')
  const normalizedContact = contact.replace(/\D/g, '')
  const matches = Boolean(order && (order.customerEmail.toLowerCase() === contact || (savedPhone && savedPhone === normalizedContact)))
  if (!order || !matches) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  return NextResponse.json({ id: order.id, status: order.status, createdAt: order.createdAt, updatedAt: order.updatedAt })
}
