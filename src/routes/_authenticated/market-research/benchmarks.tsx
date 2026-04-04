import { createFileRoute } from '@tanstack/react-router'
import { MarketResearchBenchmarks } from '@/features/market-research'

export const Route = createFileRoute('/_authenticated/market-research/benchmarks')({
  component: MarketResearchBenchmarks,
})
