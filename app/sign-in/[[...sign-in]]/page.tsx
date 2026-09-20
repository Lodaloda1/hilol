'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default function SignInPage() {
  const router = useRouter()
  const [accessCode, setAccessCode] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true); setError('')
    const bootstrap = await fetch('/api/admin/bootstrap', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ accessCode, password }) })
    if (!bootstrap.ok) { setError('Invalid username or password.'); setLoading(false); return }
    const result = await authClient.signIn.email({ email: 'hardik_10@hilol.local', password })
    if (result.error) setError('Unable to sign in. Please try again.')
    else { router.push('/admin'); router.refresh() }
    setLoading(false)
  }

  return <main className="auth-page"><a className="auth-logo" href="/" aria-label="Back to HILOL"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-9F22B585-1kqlezpaxC4jw8agJdCKAv0KH87Ucf.jpeg" alt="HILOL" /></a><p className="eyebrow">HILOL / PRIVATE ADMIN</p><h1>control<br /><em>the feed.</em></h1><p className="auth-lede">Private order management for the HILOL team. This access is restricted.</p><form className="auth-card" onSubmit={submit}><label>Private access code<input required autoComplete="username" value={accessCode} onChange={(event) => setAccessCode(event.target.value)} /></label><label>Password<input required type="password" inputMode="numeric" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>{error && <p role="alert" className="auth-error">{error}</p>}<button className="auth-primary-button" disabled={loading}>{loading ? 'Checking…' : 'Sign in'}</button></form></main>
}
