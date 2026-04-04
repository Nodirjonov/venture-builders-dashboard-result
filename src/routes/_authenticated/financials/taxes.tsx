import { createFileRoute } from '@tanstack/react-router'
import { FinancialsTaxes } from '@/features/financials'

export const Route = createFileRoute('/_authenticated/financials/taxes')({
  component: FinancialsTaxes,
})
