import type { Guide } from '@/types'
import { guides as mockGuides } from '@/features/guides/data/guides'

// TODO: replace mock implementations with real apiClient calls when backend is ready
// import { apiClient } from './client'

export async function getGuides(): Promise<Guide[]> {
  // TODO: return apiClient.get('/guides').then(r => r.data)
  return mockGuides as Guide[]
}

export async function getGuideBySlug(_slug: string): Promise<Guide | undefined> {
  // TODO: return apiClient.get(`/guides/${slug}`).then(r => r.data)
  return mockGuides.find((g) => g.id === _slug) as Guide | undefined
}
