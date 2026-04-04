import { createFileRoute } from '@tanstack/react-router'
import { MarketResearchAudience } from '@/features/market-research'

export const Route = createFileRoute('/_authenticated/market-research/')({
  component: MarketResearchAudience,
})
