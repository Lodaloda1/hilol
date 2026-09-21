'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

type CheckoutItem = { id: string; name: string; size: string; color: string; meme: string; quantity: number; price: number }

export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([])
  const [status, setStatus] = useState('')
  const [orderId, setOrderId] = useState('')
  const subtotal = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items])

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('hilol-checkout')
      if (saved) setItems(JSON.parse(saved) as CheckoutItem[])
    } catch {
      setItems([])
    }
  }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('Creating secure order…')
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/checkout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ customer: Object.fromEntries(form.entries()), items }) })
    const result = await response.json()
    if (!response.ok) { setStatus(result.error ?? 'Unable to create order'); return }
    setOrderId(result.orderId)
    setStatus('Order created. Payment adapter is ready for Cashfree connection.')
    window.localStorage.removeItem('hilol-checkout')
  }

  if (orderId) return <main className="checkout-page"><p className="eyebrow">HILOL / ORDER CONFIRMED</p><h1>order<br /><em>received.</em></h1><p className="checkout-note">HILOL order {orderId}. Your order is safely recorded. Payment will be enabled when Cashfree is connected.</p><Link className="button button-black" href={`/track?order=${orderId}`}>TRACK ORDER</Link></main>

  return <main className="checkout-page"><header className="checkout-header"><Link className="text-link" href="/">← SHOP</Link><span className="eyebrow">SECURE CHECKOUT</span></header><div className="checkout-layout"><section><p className="eyebrow">DELIVERY DETAILS</p><h1>checkout<br /><em>clean.</em></h1><form className="checkout-form" onSubmit={submit}><label>Name<input name="name" required autoComplete="name" /></label><label>Phone<input name="phone" required inputMode="tel" autoComplete="tel" /></label><label>Email<input name="email" required type="email" autoComplete="email" /></label><label>Address<input name="address" required autoComplete="street-address" /></label><div className="checkout-two"><label>Pincode<input name="pincode" required inputMode="numeric" pattern="[0-9]{6}" /></label><label>City<input name="city" required autoComplete="address-level2" /></label></div><label>State<input name="state" required autoComplete="address-level1" /></label><button className="button button-black" type="submit" disabled={!items.length}>{items.length ? `PLACE ORDER / PAY ₹${subtotal}` : 'CART IS EMPTY'}</button>{status && <p className="auth-error" role="status">{status}</p>}</form></section><aside className="order-summary"><p className="eyebrow">ORDER SUMMARY</p>{items.length ? items.map((item) => <div className="summary-line" key={item.id}><span>{item.name}<small>{item.size} / {item.color} / {item.meme} × {item.quantity}</small></span><strong>₹{item.price * item.quantity}</strong></div>) : <p>Your cart is empty. Add something first.</p>}<div className="summary-total"><span>Total</span><strong>₹{subtotal}</strong></div><small>Prepaid only. No COD. Shipping is included in the displayed price.</small></aside></div></main>
}
