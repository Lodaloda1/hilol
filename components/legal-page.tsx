import Link from 'next/link'
import { InstantBack } from '@/components/instant-back'
import type { LegalSection } from '@/lib/legal-content'

type LegalPageProps = { eyebrow: string; title: string; lede: string; sections: readonly (LegalSection | readonly [string, string])[] }

export function LegalPage({ eyebrow, title, lede, sections }: LegalPageProps) {
  return <main className="policy-page legal-page"><Link className="logo" href="/"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-9F22B585-1kqlezpaxC4jw8agJdCKAv0KH87Ucf.jpeg" alt="HILOL — wear your humor" /></Link><InstantBack /><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p className="policy-lede">{lede}</p>{sections.map((section) => { const [title, body] = Array.isArray(section) ? section : [section.title, section.body]; return <section key={title}><h2>{title}</h2><p>{body}</p></section> })}</main>
}
