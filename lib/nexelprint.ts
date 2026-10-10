import crypto from 'node:crypto'

const baseUrl = process.env.NEXELPRINT_API_BASE_URL || 'https://api.nexelprint.com'

export type NexelPrintOrder = {
  client_reference_id: string
  payment_method: 'prepaid' | 'cod'
  shipping_address: { name: string; phone: string; address_line1: string; address_line2?: string; city: string; state: string; postal_code: string; country: 'IN' }
  items: Array<{ sku: string; quantity: number; print_technique: 'DTF_INDUSTRIAL'; artwork_front_url: string; print_front_width_inches: number; print_front_height_inches: number; artwork_back_url?: string; print_back_width_inches?: number; print_back_height_inches?: number; artwork_neck_label_url?: string }>
  branding?: { custom_neck_label: boolean; brand_name_on_awb: string; brand_support_phone: string; brand_packing_slip_message: string }
}

function authHeaders() {
  const token = process.env.NEXELPRINT_API_KEY
  if (!token) throw new Error('NEXELPRINT_API_KEY is not configured')
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
}

export async function createNexelPrintOrder(order: NexelPrintOrder) {
  const response = await fetch(`${baseUrl}/v1/orders`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(order), cache: 'no-store' })
  const payload = await response.json().catch(() => null)
  if (!response.ok) throw new Error(`NexelPrint order failed (${response.status}): ${JSON.stringify(payload)}`)
  return payload
}

export function verifyNexelPrintWebhook(rawBody: string, signature: string | null) {
  const secret = process.env.NEXELPRINT_WEBHOOK_SECRET
  if (!secret || !signature) return false
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
  const provided = signature.replace(/^sha256=/, '')
  return provided.length === expected.length && crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(expected))
}
