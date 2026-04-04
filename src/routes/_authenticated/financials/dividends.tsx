import { createFileRoute } from '@tanstack/react-router'
import { FinancialsDividends } from '@/features/financials'

export const Route = createFileRoute('/_authenticated/financials/dividends')({
  component: FinancialsDividends,
})
