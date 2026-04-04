import { createFileRoute } from '@tanstack/react-router'
import { MarketResearchPersonas } from '@/features/market-research'

export const Route = createFileRoute('/_authenticated/market-research/personas')({
  component: MarketResearchPersonas,
})
