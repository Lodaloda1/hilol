import Link from 'next/link'
import { InstantBack } from '@/components/instant-back'
import type { LegalSection } from '@/lib/legal-content'

export function LegalPage({ eyebrow, title, lede, sections }: { eyebrow: string; title: string; lede: string; sections: readonly LegalSection[] }) {
  return <main className="policy-page legal-page"><Link className="logo" href="/"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-9F22B585-1kqlezpaxC4jw8agJdCKAv0KH87Ucf.jpeg" alt="HILOL — wear your humor" /></Link><InstantBack /><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p className="policy-lede">{lede}</p>{sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}</main>
}
