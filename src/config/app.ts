export const APP_NAME = 'Venture Builders'
export const APP_VERSION = '1.0.0'

export const SUPPORTED_LOCALES = ['en', 'fr', 'es', 'de', 'it', 'pt'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]
export const DEFAULT_LOCALE: SupportedLocale = 'en'

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/',
  TASKS: '/tasks',
  USERS: '/users',
  APPS: '/apps',
  CHATS: '/chats',
  GUIDES: '/guides',
  FINANCIALS: '/financials',
  PLANS: '/plans',
  PITCH: '/pitch',
  RADAR: '/radar',
  MARKET_RESEARCH: '/market-research',
  FORMATION: '/formation',
  HELP_CENTER: '/help-center',
  AI_CONSULTANT: '/ai-consultant',
  SETTINGS: '/settings',
  SETTINGS_ACCOUNT: '/settings/account',
  SETTINGS_APPEARANCE: '/settings/appearance',
  SETTINGS_NOTIFICATIONS: '/settings/notifications',
  SETTINGS_DISPLAY: '/settings/display',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  FORGOT_PASSWORD: '/forgot-password',
} as const
