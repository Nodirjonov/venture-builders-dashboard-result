import { createFileRoute } from '@tanstack/react-router'
import { FinancialsProfitLoss } from '@/features/financials'

export const Route = createFileRoute('/_authenticated/financials/profit-loss')({
  component: FinancialsProfitLoss,
})
