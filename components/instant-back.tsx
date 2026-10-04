'use client'

import { useRouter } from 'next/navigation'

export function InstantBack() {
  const router = useRouter()
  return <button className="policy-back" type="button" onClick={() => window.history.length > 1 ? router.back() : router.push('/')} aria-label="Go back">← BACK</button>
}

export function HomeBack() {
  const router = useRouter()

  return (
    <button className="policy-back" type="button" onClick={() => router.push('/')}>
      BACK TO HILOL
    </button>
  )
}
