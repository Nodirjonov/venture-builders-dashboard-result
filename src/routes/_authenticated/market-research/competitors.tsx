import { createFileRoute } from '@tanstack/react-router'
import { MarketResearchCompetitors } from '@/features/market-research'

export const Route = createFileRoute('/_authenticated/market-research/competitors')({
  component: MarketResearchCompetitors,
})
