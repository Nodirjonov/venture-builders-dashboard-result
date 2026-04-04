import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useLocale, ALL_LOCALES, type Locale } from '@/context/intl-provider'

export function LanguageSwitcher() {
  const t = useTranslations('languages')
  const { locale: currentLocale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className='relative w-44'>
      <button
        onClick={() => setOpen((v) => !v)}
        className='w-full flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 bg-white hover:bg-gray-50 transition-colors focus:outline-none'
        aria-haspopup='listbox'
        aria-expanded={open}
      >
        <span>{t(currentLocale as Locale)}</span>
        <ChevronDown />
      </button>

      {open && (
        <div
          role='listbox'
          className='absolute left-0 top-full mt-1 w-full bg-gray-100 border border-gray-200 rounded-md shadow-md z-20 py-1'
        >
          {ALL_LOCALES.map((locale) => (
            <button
              key={locale}
              role='option'
              aria-selected={locale === currentLocale}
              onClick={() => {
                setLocale(locale)
                setOpen(false)
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${
                locale === currentLocale
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className='w-4 flex-shrink-0'>
                {locale === currentLocale && (
                  <svg
                    width='14'
                    height='14'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={2.5}
                  >
                    <path d='M5 13l4 4L19 7' />
                  </svg>
                )}
              </span>
              {t(locale as Locale)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ChevronDown() {
  return (
    <svg
      width='14'
      height='14'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path d='M6 9l6 6 6-6' />
    </svg>
  )
}
