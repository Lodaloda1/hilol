'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export function InstantBack() {
  const router = useRouter()
  const [armed, setArmed] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleBack() {
    if (!armed) {
      setArmed(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setArmed(false), 1800)
      return
    }
    if (timer.current) clearTimeout(timer.current)
    if (window.history.length > 1) router.back()
    else router.push('/')
  }

  return <button className="policy-back" type="button" onClick={handleBack} aria-label={armed ? 'Tap again to go back' : 'Tap twice to go back'}>{armed ? '← Tap again to go back' : '← Back (tap twice)'}</button>
}

export function HomeBack() {
  const router = useRouter()

  return (
    <button className="policy-back" type="button" onClick={() => router.push('/')}>
      BACK TO HILOL
    </button>
  )
}
