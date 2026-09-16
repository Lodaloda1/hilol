'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { InstantBack } from '@/components/instant-back'

const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'hilol.support@gmail.com'
const categories = ['ORDER', 'PAYMENT', 'DELIVERY', 'SIZE & FIT', 'PRODUCT', 'RETURNS & REFUNDS', 'OTHER']

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
    <div className="support-grid">{categories.map((item) => <button className={category === item ? 'is-selected' : ''} onClick={() => setCategory(item)} key={item}><b>{item}</b><span>→</span></button>)}</div>
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
