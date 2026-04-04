import { createFileRoute } from '@tanstack/react-router'
import { AiConsultant } from '@/features/ai-consultant'

export const Route = createFileRoute('/_authenticated/ai-consultant/')({
  component: AiConsultant,
})
