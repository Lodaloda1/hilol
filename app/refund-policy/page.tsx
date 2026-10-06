import { LegalPage } from '@/components/legal-page'
import { legalContent } from '@/lib/legal-content'

export default function RefundPolicyPage() { const content = legalContent.refunds; return <LegalPage {...content} /> }
