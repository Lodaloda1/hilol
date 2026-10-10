import { NextResponse } from 'next/server'
import { verifyNexelPrintWebhook } from '@/lib/nexelprint'

export async function POST(request: Request) {
  const rawBody = await request.text()
  const signature = request.headers.get('x-nexelprint-signature') || request.headers.get('x-webhook-signature')
  if (!verifyNexelPrintWebhook(rawBody, signature)) return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 })

  const event = JSON.parse(rawBody) as { event?: string; order_id?: string; client_reference_id?: string }
  console.info('[nexelprint] webhook received', { event: event.event, orderId: event.order_id, reference: event.client_reference_id })
  return NextResponse.json({ received: true })
}
