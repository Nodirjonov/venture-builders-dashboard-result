import { createFileRoute } from '@tanstack/react-router'
import { FinancialsBalanceSheet } from '@/features/financials'

export const Route = createFileRoute('/_authenticated/financials/balance-sheet')({
  component: FinancialsBalanceSheet,
})
