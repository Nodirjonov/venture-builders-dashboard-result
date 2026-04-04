import { createFileRoute } from '@tanstack/react-router'
import { FinancialsExpenses } from '@/features/financials'

export const Route = createFileRoute('/_authenticated/financials/expenses')({
  component: FinancialsExpenses,
})
