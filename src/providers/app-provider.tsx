import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { IntlProvider } from '@/context/intl-provider'
import { ThemeProvider } from '@/context/theme-provider'
import { FontProvider } from '@/context/font-provider'
import { DirectionProvider } from '@/context/direction-provider'

interface AppProviderProps {
  queryClient: QueryClient
  children: React.ReactNode
}

/**
 * AppProvider — single composition root for all global providers.
 *
 * Order matters:
 *   1. QueryClientProvider  — data layer, everything can use queries
 *   2. IntlProvider         — locale, messages
 *   3. ThemeProvider        — applies theme class to <html>
 *   4. FontProvider         — applies font class to <html>
 *   5. DirectionProvider    — applies dir attr to <html>, wraps Radix DirectionProvider
 *
 * LayoutProvider and SearchProvider are NOT here — they belong inside
 * AuthenticatedLayout because they depend on the sidebar/search being mounted.
 */
export function AppProvider({ queryClient, children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider>
        <ThemeProvider>
          <FontProvider>
            <DirectionProvider>{children}</DirectionProvider>
          </FontProvider>
        </ThemeProvider>
      </IntlProvider>
    </QueryClientProvider>
  )
}
