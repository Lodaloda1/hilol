import Link from 'next/link'
import { InstantBack } from '@/components/instant-back'
import { policies } from '@/lib/policies'

export default function RefundPage() {
  return <main className="policy-page legal-page"><Link className="logo" href="/"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-9F22B585-1kqlezpaxC4jw8agJdCKAv0KH87Ucf.jpeg" alt="HILOL — wear your humor" /></Link><InstantBack /><p className="eyebrow">POLICY / RETURNS</p><h1>REFUNDS.</h1><p className="policy-lede">Made-to-order clothing deserves a clear process when something goes wrong.</p><section><h2>Cancellation window</h2><p>{policies.cancellation}</p></section><section><h2>Eligible returns</h2><p>{policies.eligibleReturns}</p></section><section><h2>Not eligible</h2><p>Change of mind, selecting the wrong size or color, normal wear, incorrect care, or customer-caused damage are not eligible for return or refund.</p></section><section><h2>How to contact us</h2><p>Use the Support link in the footer with your order number, phone number, and clear photographs where relevant. We will review the request under applicable Indian law.</p></section></main>
}
