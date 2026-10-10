import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { ADMIN_EMAIL } from '@/lib/admin'
import { getOrder } from '@/lib/orders'

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user?.email !== ADMIN_EMAIL) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json().catch(() => null) as { orderId?: string; environment?: string } | null
  if (!body?.orderId) return NextResponse.json({ error: 'orderId is required' }, { status: 400 })
  const order = await getOrder(body.orderId)
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  if (body.environment !== 'sandbox') return NextResponse.json({ error: 'Only sandbox fulfillment is available. Live orders are disabled.' }, { status: 409 })
  return NextResponse.json({ mode: 'mock', environment: 'sandbox', submitted: false, orderId: order.id, message: 'Mock fulfillment prepared. No NexelPrint request was sent.' })
}
