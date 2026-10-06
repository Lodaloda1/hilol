import { LegalPage } from '@/components/legal-page'
import { legalContent } from '@/lib/legal-content'

export default function ShippingPage() { const content = legalContent.shipping; return <LegalPage {...content} /> }
