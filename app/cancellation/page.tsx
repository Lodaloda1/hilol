import { InstantBack } from '@/components/instant-back'
import { policies } from '@/lib/policies'

export default function CancellationPage() {
  return <main className="policy-page legal-page"><a className="logo" href="/"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-9F22B585-1kqlezpaxC4jw8agJdCKAv0KH87Ucf.jpeg" alt="HILOL — wear your humor" /></a><InstantBack /><p className="eyebrow">POLICY / CANCELLATION</p><h1>CANCELLATION.</h1><p className="policy-lede">Made-to-order products enter production quickly, so the cancellation window is intentionally short.</p><section><h2>60-minute window</h2><p>{policies.cancellation}</p></section><section><h2>How to request</h2><p>Contact support with your order details as soon as possible. A request is not confirmed until HILOL confirms it.</p></section><section><h2>Review before launch</h2><p>These policies are a general business draft and should be reviewed by a qualified legal professional before launch.</p></section></main>
}
