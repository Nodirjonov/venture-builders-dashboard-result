import { createFileRoute } from '@tanstack/react-router'
import { FinancialsOverview } from '@/features/financials'

export const Route = createFileRoute('/_authenticated/financials/')({
  component: FinancialsOverview,
})
