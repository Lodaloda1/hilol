import { LegalPage } from '@/components/legal-page'
import { legalContent } from '@/lib/legal-content'

export default function TermsPage() { const content = legalContent.terms; return <LegalPage {...content} /> }
