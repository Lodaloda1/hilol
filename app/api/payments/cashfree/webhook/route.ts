import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const rawBody = await request.text()
  const signature = request.headers.get('x-webhook-signature')
  const idempotencyKey = request.headers.get('x-idempotency-key') ?? request.headers.get('x-idempotency-header')
  if (!rawBody || !signature || !idempotencyKey || !process.env.CASHFREE_SECRET_KEY) return NextResponse.json({ error: 'Webhook is not configured' }, { status: 503 })
  return NextResponse.json({ error: 'Webhook verification is not configured' }, { status: 503 })
}
