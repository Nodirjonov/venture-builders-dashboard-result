export type GuideStatus = 'locked' | 'preview' | 'free'

export interface Guide {
  id: string
  title: string
  description: string
  status: GuideStatus
  imageGradient: string
  imageUrl?: string
  route: string
}

export interface MarketingTactic {
  title: string
  description: string
  category: string
  budget: number
}

export interface LicenseCardData {
  title: string
  level: 'National' | 'Local'
  description: string
  link: string
}
