import { Link } from '@tanstack/react-router'
import { Search, ChevronDown, Folder, Layout } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useLocale, ALL_LOCALES, type Locale } from '@/context/intl-provider'
import { Header } from '@/components/layout/header'
import { useState, useRef, useEffect } from 'react'

function HelpLanguageSwitcher() {
  const tLangs = useTranslations('languages')
  const { locale: currentLocale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className='relative'>
      <button
        onClick={() => setOpen((v) => !v)}
        className='flex items-center gap-1.5 text-sm text-[#6b7280] border-none cursor-pointer p-2.5 rounded-md hover:bg-[#f3f4f6] transition-colors bg-transparent'
      >
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='shrink-0'>
          <circle cx='12' cy='12' r='10' />
          <line x1='2' y1='12' x2='22' y2='12' />
          <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
        </svg>
        <span className='hidden sm:inline'>{tLangs(currentLocale as Locale)}</span>
        <ChevronDown size={14} className='shrink-0' />
      </button>
      {open && (
        <div className='absolute right-0 top-full mt-1 w-40 bg-gray-100 border border-gray-200 rounded-md shadow-md z-20 py-1'>
          {ALL_LOCALES.map((locale) => (
            <button
              key={locale}
              onClick={() => { setLocale(locale); setOpen(false) }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${
                locale === currentLocale ? 'text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className='w-4 flex-shrink-0'>
                {locale === currentLocale && (
                  <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2.5}>
                    <path d='M5 13l4 4L19 7' />
                  </svg>
                )}
              </span>
              {tLangs(locale as Locale)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function HelpCenterView() {
  const t = useTranslations('help')

  const cards = [
    { titleKey: 'cards.quick_guides_title', descKey: 'cards.quick_guides_desc', articles: 10, author: 'Sophie', initial: 'S' },
    { titleKey: 'cards.business_plan_title', descKey: 'cards.business_plan_desc', articles: 7, author: 'Sophie', initial: 'S' },
    { titleKey: 'cards.financials_title', descKey: 'cards.financials_desc', articles: 4, author: 'Sophie', initial: 'S' },
    { titleKey: 'cards.account_mgmt_title', descKey: 'cards.account_mgmt_desc', articles: 5, author: 'Sophie', initial: 'S' },
    { titleKey: 'cards.troubleshoot_title', descKey: 'cards.troubleshoot_desc', articles: 2, author: 'Sophie', initial: 'S' },
    { titleKey: 'cards.formation_title', descKey: 'cards.formation_desc', articles: 7, author: 'Sophie', initial: 'S' },
    { titleKey: 'cards.additional_title', descKey: 'cards.additional_desc', articles: 1, author: 'Sophie', initial: 'S' },
    { titleKey: 'cards.contact_title', descKey: 'cards.contact_desc', articles: 1, author: 'Sophie', initial: 'S' },
  ] as const

  return (
    <div className='font-sans bg-white min-h-screen text-[#111827] overflow-y-auto'>
      {/* HEADER */}
      <Header className='bg-white border-b border-[#e5e7eb] px-4 sm:px-10 h-[60px] sticky top-0 z-50'>
        <div className='flex items-center justify-between w-full h-full'>
          <Link to='/' className='flex items-center gap-2 no-underline shrink-0'>
            <img src='/images/logo.png' alt='Venturekit' className='w-8 h-8 object-contain shrink-0' />
            <span className='text-base font-bold tracking-tight'>Venturekit</span>
          </Link>
          <div className='flex items-center gap-1'>
            <HelpLanguageSwitcher />
          </div>
        </div>
      </Header>

      {/* HERO */}
      <div className='bg-white px-4 sm:px-10 pt-12 pb-14 text-center border-b border-[#e5e7eb]'>
        <h1 className='text-[28px] font-bold mb-7 tracking-tight'>{t('hero_title')}</h1>
        <div className='max-w-[640px] mx-auto relative'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#9ca3af]' />
          <input
            className='w-full h-12 pl-11 pr-5 border-[1.5px] border-[#e5e7eb] rounded-xl text-base outline-none focus:border-[#22c88a] focus:ring-4 focus:ring-[#22c88a]/10 transition-all placeholder:text-[#9ca3af]'
            type='text'
            placeholder={t('search_placeholder')}
          />
        </div>
      </div>

      {/* MAIN */}
      <main className='max-w-[800px] mx-auto py-10 px-5 flex flex-col gap-3.5'>
        {cards.map((card, idx) => (
          <Link
            key={idx}
            to='/'
            className='bg-white border border-[#e5e7eb] rounded-xl p-5 px-6 flex items-start gap-5 no-underline hover:shadow-lg hover:border-[#d1d5db] hover:-translate-y-0.5 transition-all group'
          >
            <div className='shrink-0 w-11 h-11 bg-[#eff6ff] rounded-xl flex items-center justify-center mt-0.5'>
              <Folder className='w-6 h-6 text-[#4a90d9]' strokeWidth={1.6} />
            </div>
            <div className='flex-1'>
              <div className='text-[15px] font-semibold text-[#111827] mb-1 group-hover:text-[#4a90d9] transition-colors'>
                {t(card.titleKey)}
              </div>
              <div className='text-sm text-[#6b7280] mb-2.5 leading-relaxed'>{t(card.descKey)}</div>
              <div className='flex items-center gap-2'>
                <div className='w-5 h-5 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center text-[9px] font-bold text-white uppercase'>
                  {card.initial}
                </div>
                <span className='text-xs text-[#6b7280]'>
                  {t('by')} {card.author} <span className='mx-0.5 text-[#9ca3af]'>•</span> {card.articles} {t('articles')}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </main>

      {/* FOOTER */}
      <footer className='text-center py-10 pb-8 bg-white'>
        <Link to='/' className='flex items-center justify-center gap-2.5 mb-3.5 no-underline'>
          <img src='/images/logo.png' alt='Venturekit' className='w-7 h-7 object-contain' />
          <span className='text-[17px] font-bold tracking-tight text-[#111827]'>Venturekit</span>
        </Link>
        <div className='flex items-center justify-center gap-1.5 text-xs text-[#9ca3af]'>
          <Layout size={14} className='opacity-50' />
          {t('footer_powered')}
        </div>
      </footer>
    </div>
  )
}
