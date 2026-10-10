import crypto from 'node:crypto'

export type NexelPrintEnvironment = 'sandbox' | 'live'

function getConfig(environment: NexelPrintEnvironment = 'sandbox') {
  const baseUrl = environment === 'sandbox' ? process.env.NEXELPRINT_SANDBOX_API_BASE_URL : process.env.NEXELPRINT_LIVE_API_BASE_URL
  const token = environment === 'sandbox' ? process.env.NEXELPRINT_SANDBOX_API_KEY : process.env.NEXELPRINT_LIVE_API_KEY
  if (!baseUrl) throw new Error(`NexelPrint ${environment} base URL is not configured`)
  if (!token) throw new Error(`NexelPrint ${environment} API key is not configured`)
  return { baseUrl, token }
}

export type NexelPrintOrder = {
  client_reference_id: string
  payment_method: 'prepaid' | 'cod'
  shipping_address: { name: string; phone: string; address_line1: string; address_line2?: string; city: string; state: string; postal_code: string; country: 'IN' }
  items: Array<{ sku: string; quantity: number; print_technique: 'DTF_INDUSTRIAL'; artwork_front_url: string; print_front_width_inches: number; print_front_height_inches: number; artwork_back_url?: string; print_back_width_inches?: number; print_back_height_inches?: number; artwork_neck_label_url?: string }>
  branding?: { custom_neck_label: boolean; brand_name_on_awb: string; brand_support_phone: string; brand_packing_slip_message: string }
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
}

export async function createNexelPrintOrder(order: NexelPrintOrder, environment: NexelPrintEnvironment = 'sandbox') {
  const { baseUrl, token } = getConfig(environment)
  if (environment === 'live' && process.env.ALLOW_NEXELPRINT_LIVE_ORDERS !== 'true') throw new Error('Live NexelPrint orders are disabled')
  const response = await fetch(`${baseUrl}/v1/orders`, { method: 'POST', headers: authHeaders(token), body: JSON.stringify(order), cache: 'no-store' })
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
