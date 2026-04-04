import { createFileRoute } from '@tanstack/react-router'
import { FinancialsFinancing } from '@/features/financials'

export const Route = createFileRoute('/_authenticated/financials/financing')({
  component: FinancialsFinancing,
})
