'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { InstantBack } from '@/components/instant-back'

const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'hilol.support@gmail.com'
const categories = ['ORDER', 'PAYMENT', 'DELIVERY', 'SIZE & FIT', 'PRODUCT', 'RETURNS & REFUNDS', 'OTHER']
const helpItems = [
  ['How long does delivery take?', 'Standard delivery is included and is estimated at 4–5 days after dispatch. Express is an optional ₹40 upgrade where available and may be 1–2 days faster.'],
  ['Can I cancel an order?', 'Contact Support within 60 minutes of placing the order and before printing begins. Cancellation is complete only when HILOL confirms it.'],
  ['Can I change my size or design?', 'Made-to-order products enter production quickly. Contact Support immediately, but changes are not guaranteed after the cancellation window or once printing begins.'],
  ['What if my item is damaged or wrong?', 'Contact Support within 24 hours of delivery with your order number, photographs, and an uncut 360° unboxing video if requested.'],
  ['Can I return an item because I chose the wrong size?', 'Ordinary returns are not normally accepted for wrong size, colour, design, quantity, change of mind, or customer-caused damage. Check the Size Guide before ordering.'],
  ['How do I choose a size?', 'Compare the measurements in the Size Guide with a garment you already own. Standard-fit and oversized garments use different charts.'],
  ['How do I track an order?', 'Tracking is provided when available and may take time to activate after dispatch. Contact Support if it does not update for an unusually long period.'],
  ['What payment methods are available?', 'Available payment methods are shown at checkout. Cash on Delivery may be available for eligible orders and includes an upfront ₹80 payment.'],
  ['Are taxes and standard shipping included?', 'Where applicable, GST and standard shipping costs are incorporated into the displayed product price. Optional services are shown before confirmation.'],
  ['How can I contact HILOL?', 'Use the form below or email HILOL Support with your order number and the phone or email used for the order.'],
]

export default function SupportPage() {
  const [category, setCategory] = useState('ORDER')
  const [status, setStatus] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('Sending…')
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/support', { method: 'POST', body: JSON.stringify(Object.fromEntries(form)), headers: { 'content-type': 'application/json' } })
    setStatus(response.ok ? 'Request received. We’ll get back to you shortly.' : `Support is being configured. Please email ${supportEmail} for now.`)
    if (response.ok) event.currentTarget.reset()
  }

  return <main className="policy-page support-page">
    <Link className="logo" href="#top"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-9F22B585-1kqlezpaxC4jw8agJdCKAv0KH87Ucf.jpeg" alt="HILOL — wear your humor" /></Link>
    <InstantBack /><span className="eyebrow">SUPPORT / HUMAN HELP</span>
    <h1>Need help?</h1>
    <p className="policy-lede">Choose a category, add your order details if relevant, and tell us what happened.</p>
    <section className="help-faq" aria-labelledby="help-faq-title"><span className="eyebrow">QUICK ANSWERS</span><h2 id="help-faq-title">THE IMPORTANT<br /><em>STUFF.</em></h2>{helpItems.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</section><div className="support-grid">{categories.map((item) => <button className={category === item ? 'is-selected' : ''} onClick={() => setCategory(item)} key={item}><b>{item}</b><span>→</span></button>)}</div>
    <form className="support-form" onSubmit={submit}>
      <input type="hidden" name="category" value={category} />
      <label>ORDER ID <input name="orderId" placeholder="Only if relevant" /></label>
      <label>PHONE OR EMAIL <input name="contact" required placeholder="How should we reach you?" /></label>
      <label>MESSAGE <textarea name="message" required rows={5} placeholder="Tell us what happened." /></label>
      <button className="button button-black" type="submit">SEND TO SUPPORT</button>
      {status && <p className="support-status" role="status">{status}</p>}
    </form>
    <p className="policy-note">For now, support is available at <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.</p>
  </main>
}
