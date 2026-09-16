'use client'

import { useRouter } from 'next/navigation'

export function InstantBack() {
  const router = useRouter()

  return (
    <button className="policy-back" type="button" onClick={() => {
      if (window.history.length > 1) router.back()
      else router.push('/')
    }}>
      ← Back
    </button>
  )
}

export function HomeBack() {
  const router = useRouter()

  return (
    <button className="policy-back" type="button" onClick={() => router.push('/')}>
      BACK TO HILOL
    </button>
  )
}
