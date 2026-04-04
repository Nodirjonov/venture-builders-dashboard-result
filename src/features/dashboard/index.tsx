import { Crown, MoreVertical, AlignCenter, RefreshCw, Type, Maximize2 } from 'lucide-react'
import { useUpgradeStore } from '@/stores/upgrade-store'
import { Main } from '@/components/layout/main'
import { Header } from '@/components/layout/header'
import { Link } from '@tanstack/react-router'

// Hardcoded static data - change these values to update the page
const HARDCODED_USER_NAME = 'MUXAMMAD'

// ─── Thumbnails ───────────────────────────────────────────────────────────────

function BusinessPlanThumb() {
  return (
    <div className='w-full h-full flex items-center justify-center bg-white px-8 py-4'>
      <div className='relative w-full max-w-[185px] h-full max-h-[185px]'>
        <div
          className='absolute rounded-sm bg-white top-1 left-1.5 right-[-1.5px] bottom-[-1px] sm:top-[5px] sm:left-[7px] sm:right-[-7px] sm:bottom-[-5px]'
          style={{ border: '0.5px solid #DDE1E8', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        />
        <div
          className='absolute inset-0 rounded-sm flex flex-col overflow-hidden bg-white'
          style={{ border: '0.5px solid #D4D8E0', boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}
        >
          <div className='flex justify-end px-3 pt-3'>
            <div className='px-2 py-0.5 rounded-[3px]' style={{ background: '#E2E6EC' }}>
              <span style={{ fontSize: 5, color: '#6B7280', fontWeight: 700, letterSpacing: '0.1em' }}>LOGO</span>
            </div>
          </div>
          <div className='px-2 sm:px-3 mt-1.5 sm:mt-2'>
            <span className='block text-[4.5px] sm:text-[5.5px] text-[#1E293B] font-extrabold tracking-[0.07em]'>
              INNOVATECH ACADEMY
            </span>
            <span className='block text-[3.5px] sm:text-[4.5px] text-[#64748B] tracking-[0.06em] mt-0.5 sm:mt-[2.5px]'>
              BUSINESS PLAN
            </span>
          </div>
          <div className='px-2 sm:px-3 mt-2 sm:mt-3 flex-1 space-y-1 sm:space-y-1.5'>
            {[80, 65, 75, 55, 70].map((w, i) => (
              <div key={i} style={{ width: `${w}%`, height: 1.5, background: '#EDF0F5', borderRadius: 1 }} />
            ))}
          </div>
          <div className='relative overflow-hidden' style={{ height: 26 }}>
            <div className='absolute inset-0' style={{ background: '#1E293B' }} />
            <div
              className='absolute'
              style={{
                top: 0, right: 0, width: 50, height: 26,
                background: '#2D3F54',
                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
              }}
            />
            <div
              className='absolute'
              style={{
                top: 0, right: 20, width: 30, height: 26,
                background: '#354A60',
                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function FinancialsThumb() {
  return (
    <div className='w-full h-full bg-white flex flex-col px-5 pt-4 pb-3'>
      <div className='flex items-center gap-4 mb-3'>
        <span className='text-[13px] font-semibold' style={{ color: '#0EA5E9' }}>$280k</span>
        <span className='text-[13px] font-medium text-gray-400'>$220k</span>
        <span className='text-[13px] font-medium text-gray-300'>$80k</span>
      </div>
      <div className='flex-1 relative min-h-0'>
        <svg width='100%' height='100%' viewBox='0 0 200 80' preserveAspectRatio='none'>
          <defs>
            <linearGradient id='fin-grad' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#0EA5E9' stopOpacity='0.2' />
              <stop offset='100%' stopColor='#0EA5E9' stopOpacity='0.01' />
            </linearGradient>
          </defs>
          {[20, 40, 60].map((y) => (
            <line key={y} x1='0' y1={y} x2='200' y2={y} stroke='#F3F4F6' strokeWidth='1' />
          ))}
          <path
            d='M0 65 C30 55,50 40,70 45 C90 50,110 20,130 25 C150 30,170 45,200 35 L200 80 L0 80 Z'
            fill='url(#fin-grad)'
          />
          <path
            d='M0 65 C30 55,50 40,70 45 C90 50,110 20,130 25 C150 30,170 45,200 35'
            fill='none' stroke='#0EA5E9' strokeWidth='2' strokeLinecap='round'
          />
          <circle cx='130' cy='25' r='3.5' fill='#0EA5E9' />
        </svg>
      </div>
      <div className='flex items-end gap-px h-7 mt-1'>
        {[45, 60, 35, 70, 50, 75, 55, 65, 40, 72, 52, 68].map((h, i) => (
          <div
            key={i}
            className='flex-1 rounded-[1px]'
            style={{
              height: `${h}%`,
              background: i % 3 === 0 ? '#0EA5E9' : i % 3 === 1 ? '#BAE6FD' : '#E0F2FE',
            }}
          />
        ))}
      </div>
      <div className='flex justify-between mt-1'>
        <span className='text-[9px] text-gray-300'>$80k</span>
        <span className='text-[9px] text-gray-300'>$80k</span>
      </div>
    </div>
  )
}

function PitchDeckThumb() {
  return (
    <div className='w-full h-full bg-white flex flex-col px-3 py-3 sm:px-5 sm:py-4'>
      <div className='flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-100'>
        <AlignCenter className='h-3 w-3 sm:h-4 sm:w-4 text-gray-300' />
        <RefreshCw className='h-3 w-3 sm:h-4 sm:w-4 text-gray-300' />
        <Type className='h-3 w-3 sm:h-4 sm:w-4 text-gray-300' />
        <Maximize2 className='h-3 w-3 sm:h-4 sm:w-4 text-gray-300 hidden sm:block' />
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='text-gray-300 hidden sm:block'>
          <rect x='3' y='3' width='7' height='7' rx='1' />
          <rect x='14' y='3' width='7' height='7' rx='1' />
          <rect x='3' y='14' width='7' height='7' rx='1' />
          <rect x='14' y='14' width='7' height='7' rx='1' />
        </svg>
      </div>
      <div className='flex-1 flex flex-col gap-2.5 justify-center'>
        <div className='h-2.5 bg-gray-200 rounded-sm' style={{ width: '80%' }} />
        <div className='h-2.5 bg-gray-100 rounded-sm' style={{ width: '95%' }} />
        <div className='h-2.5 bg-gray-100 rounded-sm' style={{ width: '65%' }} />
      </div>
      <svg width='100%' height='40' viewBox='0 0 180 32' preserveAspectRatio='none'>
        <defs>
          <linearGradient id='pitch-grad' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#D1D5DB' stopOpacity='0.3' />
            <stop offset='100%' stopColor='#D1D5DB' stopOpacity='0' />
          </linearGradient>
        </defs>
        <path
          d='M0 24 L25 20 L50 22 L75 12 L100 16 L125 8 L150 13 L180 10 L180 32 L0 32 Z'
          fill='url(#pitch-grad)'
        />
        <path
          d='M0 24 L25 20 L50 22 L75 12 L100 16 L125 8 L150 13 L180 10'
          fill='none' stroke='#9CA3AF' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'
        />
      </svg>
    </div>
  )
}

function RadarThumb() {
  return (
    <div className='w-full h-full bg-white flex items-center px-3 py-2 gap-1'>
      <div className='flex-1 flex flex-col justify-center min-w-0'>
        <svg width='100%' height='55' viewBox='0 0 90 55' preserveAspectRatio='none'>
          <defs>
            <linearGradient id='radar-fill' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#D1D5DB' stopOpacity='0.25' />
              <stop offset='100%' stopColor='#D1D5DB' stopOpacity='0' />
            </linearGradient>
          </defs>
          <path
            d='M0 10 L15 18 L30 15 L45 28 L60 36 L75 42 L90 48 L90 55 L0 55 Z'
            fill='url(#radar-fill)'
          />
          <polyline
            points='0,10 15,18 30,15 45,28 60,36 75,42 90,48'
            fill='none' stroke='#9CA3AF' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'
          />
        </svg>
      </div>
      <div className='flex items-center gap-1.5 flex-shrink-0'>
        <svg className='w-16 h-16 sm:w-24 sm:h-24' viewBox='0 0 104 104'>
          <circle cx='52' cy='52' r='38' fill='none' stroke='#F3F4F6' strokeWidth='10' />
          <path
            d='M 33 85 A 38 38 0 1 1 85 33'
            fill='none'
            stroke='#3B82F6'
            strokeWidth='10'
            strokeLinecap='round'
          />
          <circle cx='85' cy='33' r='6' fill='#3B82F6' />
        </svg>
        <div className='flex flex-col gap-2.5'>
          <div className='flex flex-col items-center rounded overflow-hidden w-6 sm:w-8'>
            <div className='w-full py-0.5 sm:py-1' style={{ background: '#EF4444' }}>
              <span className='block text-center text-white text-[7px] sm:text-[9px] font-bold'>JAN</span>
            </div>
            <div className='w-full bg-white border border-gray-200 flex items-center justify-center h-5 sm:h-[26px]'>
              <span className='text-gray-800 text-[10px] sm:text-[13px] font-bold leading-none'>31</span>
            </div>
          </div>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='#D1D5DB' strokeWidth='2' strokeLinecap='round'>
            <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z' />
          </svg>
        </div>
      </div>
    </div>
  )
}

function GuidesThumb() {
  return (
    <div className='w-full h-full bg-white flex items-center justify-center px-4 py-4 sm:px-10 sm:py-6'>
      <div className='w-full max-w-[220px] bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100'>
        <div className='w-full' style={{ height: 56, background: '#3B82F6' }} />
        <div className='px-3 py-3 space-y-2'>
          {[100, 85, 95, 70, 80].map((w, i) => (
            <div
              key={i}
              className='rounded-full'
              style={{ width: `${w}%`, height: i === 0 ? 5 : 4, background: i === 0 ? '#E5E7EB' : '#F3F4F6' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function MarketResearchThumb() {
  return (
    <div className='w-full h-full bg-white flex flex-col px-3 pt-3 pb-2 sm:px-5 sm:pt-4 sm:pb-3'>
      <div className='flex items-start justify-between flex-1 min-h-0'>
        <div className='flex flex-col justify-end gap-1.5'>
          <div className='flex items-end gap-2 h-24'>
            <div className='w-6 rounded-t-sm' style={{ height: 60, background: '#3B82F6' }} />
            <div className='w-6 rounded-t-sm' style={{ height: 90, background: '#60A5FA' }} />
            <div className='w-6 rounded-t-sm' style={{ height: 45, background: '#93C5FD' }} />
          </div>
          <div className='flex items-center gap-1.5'>
            <span className='text-[11px] text-gray-400'>$220k</span>
          </div>
          <div>
            <span className='text-[11px] text-gray-400'>$310k</span>
          </div>
        </div>
        <div className='flex flex-col items-end gap-1.5'>
          <MoreVertical className='h-3 w-3 sm:h-4 sm:w-4 text-gray-300' />
          <svg className='w-12 h-12 sm:w-20 sm:h-20' viewBox='0 0 64 64'>
            <circle cx='32' cy='32' r='24' fill='none' stroke='#E5E7EB' strokeWidth='11' />
            <circle
              cx='32' cy='32' r='24'
              fill='none'
              stroke='#3B82F6'
              strokeWidth='11'
              strokeDasharray='98 53'
              strokeLinecap='round'
              transform='rotate(-90 32 32)'
            />
          </svg>
        </div>
      </div>
      <svg width='100%' height='22' viewBox='0 0 160 22' preserveAspectRatio='none'>
        <defs>
          <linearGradient id='mr-grad' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#D1D5DB' stopOpacity='0.3' />
            <stop offset='100%' stopColor='#D1D5DB' stopOpacity='0' />
          </linearGradient>
        </defs>
        <path
          d='M0 18 L25 12 L50 15 L75 6 L100 9 L125 16 L160 7 L160 22 L0 22 Z'
          fill='url(#mr-grad)'
        />
        <polyline
          points='0,18 25,12 50,15 75,6 100,9 125,16 160,7'
          fill='none' stroke='#9CA3AF' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'
        />
      </svg>
      <div className='text-right mt-0.5'>
        <span className='text-[9px] text-gray-400'>$220k</span>
      </div>
    </div>
  )
}

type ToolCardProps = {
  title: string
  subtitle: string
  thumbnail: React.ReactNode
  url: string
}

function ToolCard({ title, subtitle, thumbnail, url }: ToolCardProps) {
  return (
    <Link to={url} className='flex flex-col cursor-pointer group no-underline'>
      <div className='bg-white rounded-2xl border border-gray-200 overflow-hidden aspect-[16/10.5] w-full flex flex-col transition-all duration-200 ease-in-out hover:border-blue-200 hover:ring-2 hover:ring-blue-100 hover:ring-offset-0 hover:shadow-[0_0_0_3px_rgba(147,197,253,0.35)] relative'>
        <div className='flex-1 min-h-0 overflow-hidden'>
          {thumbnail}
        </div>
      </div>
      <div className='pt-3.5 px-0.5'>
        <p className='text-[17px] font-medium text-gray-900 leading-tight truncate'>{title}</p>
        <p className='text-[14px] text-gray-400 mt-1 leading-snug line-clamp-2'>{subtitle}</p>
      </div>
    </Link>
  )
}

function FormationCertificate() {
  return (
    <svg width='130' height='150' viewBox='0 0 130 150' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='15' y='12' width='100' height='126' rx='9' fill='#E5E7EB' />
      <rect x='10' y='6' width='100' height='126' rx='9' fill='white' stroke='#E5E7EB' strokeWidth='1.5' />
      <rect x='22' y='24' width='76' height='5' rx='2.5' fill='#E5E7EB' />
      <rect x='22' y='38' width='64' height='4' rx='2' fill='#F3F4F6' />
      <rect x='22' y='48' width='72' height='4' rx='2' fill='#F3F4F6' />
      <rect x='22' y='58' width='58' height='4' rx='2' fill='#F3F4F6' />
      <rect x='22' y='68' width='68' height='4' rx='2' fill='#F3F4F6' />
      <rect x='22' y='78' width='50' height='4' rx='2' fill='#F3F4F6' />
      <circle cx='100' cy='90' r='13' fill='#FEF3C7' />
      <circle cx='100' cy='90' r='9' fill='#F59E0B' opacity='0.7' />
      <path d='M94 115 L100 107 L106 115 L106 132 L100 128 L94 132 Z' fill='#F59E0B' opacity='0.55' />
      <circle cx='60' cy='108' r='22' fill='#3B82F6' />
      <path d='M50 108 L57 115 L71 100' stroke='white' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export function Dashboard() {
  const { openModal } = useUpgradeStore()

  return (
    <>
      <Header className='md:hidden border-b border-gray-100 bg-white' />
      <Main fluid className='bg-white min-h-full pt-6 md:pt-11'>
        <div className='max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-0 pb-8 sm:pb-12'>
        {/* Welcome — hardcoded user name from HARDCODED_USER_NAME constant */}
        <h1 className='text-[20px] sm:text-[26px] font-normal text-gray-900 mb-4'>
          Welcome {HARDCODED_USER_NAME}
        </h1>

        {/* Upgrade Banner */}
        <div className='w-full mb-6'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0' style={{
            background: '#FFF4C2',
            borderRadius: 22,
            padding: '10px 12px 10px 16px',
          }}>
            <span className='text-[13px] sm:text-[14px]' style={{ color: '#111827', fontWeight: 500 }}>
              Unlock the power of our tools - Start your free trial today!
            </span>
            <button
              onClick={openModal}
              className='flex items-center gap-2 bg-[#111827] text-white px-[18px] py-[8px] rounded-full text-[13px] font-medium hover:bg-[#1e293b] transition-colors shrink-0'
              style={{ height: '36px' }}
            >
              <Crown strokeWidth={1.5} className='w-[16px] h-[16px]' />
              <span style={{ transform: 'translateY(1px)' }}>Upgrade</span>
            </button>
          </div>
        </div>

        {/* Tool Cards */}
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-5 mb-10'>
          <ToolCard title='Business Plan' subtitle='Create a comprehensive business plan in minutes' thumbnail={<BusinessPlanThumb />} url='/plans' />
          <ToolCard title='Financials' subtitle='Forecast your revenue, expenses, and cash flow' thumbnail={<FinancialsThumb />} url='/financials' />
          <ToolCard title='Pitch Deck' subtitle='Build a compelling pitch deck for investors' thumbnail={<PitchDeckThumb />} url='/pitch' />
          <ToolCard title='Radar' subtitle='Monitor competitors, news, and market events' thumbnail={<RadarThumb />} url='/radar' />
          <ToolCard title='Guides' subtitle='Access expert advice and startup blueprints' thumbnail={<GuidesThumb />} url='/guides' />
          <ToolCard title='Market Research' subtitle='Analyze audience, personas, and industry benchmarks' thumbnail={<MarketResearchThumb />} url='/market-research' />
        </div>

        {/* Formation Section */}
        <h2 className='text-xl font-medium text-gray-900 mb-5'>Fastest Path to Launch</h2>
        <div
          className='flex flex-col md:flex-row items-center gap-6 md:gap-10 rounded-2xl px-6 py-8 md:px-10 md:py-10'
          style={{ background: '#FFF5EE' }}
        >
          <div className='hidden md:block flex-shrink-0 transform scale-110 ml-2'>
            <FormationCertificate />
          </div>
          <div className='text-center md:text-left'>
              <h3 className='text-[18px] sm:text-[22px] font-semibold text-gray-800 leading-tight'>
              Form Your Delaware C-Corp Now!
            </h3>
            <p className='text-[14px] sm:text-[15px] text-gray-500 mt-2.5 max-w-[500px] leading-relaxed'>
              Seamlessly incorporate, get your EIN, and open a bank account online—all without leaving your desk. 
            </p>
            <button className='mt-5 bg-gray-900 hover:bg-gray-800 text-white text-[14px] sm:text-[15px] font-medium px-6 py-3 rounded-xl transition-colors'>
              Get Started
            </button>
          </div>
        </div>
      </div>
      </Main>
    </>
  )
}
