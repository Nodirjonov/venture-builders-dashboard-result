import { createContext, useContext, useState } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getCookie, setCookie } from '@/lib/storage/cookies'

import enMessages from '../../messages/en.json'
import frMessages from '../../messages/fr.json'
import esMessages from '../../messages/es.json'
import deMessages from '../../messages/de.json'
import itMessages from '../../messages/it.json'
import ptMessages from '../../messages/pt.json'

export type Locale = 'en' | 'fr' | 'es' | 'de' | 'it' | 'pt'

export const ALL_LOCALES: Locale[] = ['en', 'fr', 'es', 'de', 'it', 'pt']

const messages: Record<Locale, object> = {
  en: enMessages,
  fr: frMessages,
  es: esMessages,
  de: deMessages,
  it: itMessages,
  pt: ptMessages,
}

type LocaleContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {},
})

export function IntlProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = getCookie('locale') as Locale
    return ALL_LOCALES.includes(saved) ? saved : 'en'
  })

  function setLocale(newLocale: Locale) {
    setCookie('locale', newLocale, 60 * 60 * 24 * 365)
    setLocaleState(newLocale)
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages[locale]}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
