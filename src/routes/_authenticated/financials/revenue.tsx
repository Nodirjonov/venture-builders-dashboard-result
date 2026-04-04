import { createFileRoute } from '@tanstack/react-router'
import { FinancialsRevenue } from '@/features/financials'

export const Route = createFileRoute('/_authenticated/financials/revenue')({
  component: FinancialsRevenue,
})
