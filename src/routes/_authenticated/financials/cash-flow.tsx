import { createFileRoute } from '@tanstack/react-router'
import { FinancialsCashFlow } from '@/features/financials'

export const Route = createFileRoute('/_authenticated/financials/cash-flow')({
  component: FinancialsCashFlow,
})
