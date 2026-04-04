import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { useUpgradeStore } from '@/stores/upgrade-store'
import { Crown } from 'lucide-react'

/* ═══════════════════ MARKET RESEARCH ILLUSTRATION ═══════════════════ */

function MarketResearchIllustration() {
  return (
    <div className='relative w-[260px] h-[200px]'>
      <svg viewBox='0 0 260 200' className='absolute inset-0 w-full h-full'>
        {/* Bar chart group (top-left) */}
        <rect x='20' y='30' width='80' height='75' rx='6' fill='white' stroke='#E5E7EB' strokeWidth='1' />
        {/* Dollar labels */}
        <text x='25' y='42' fontSize='6' fill='#9CA3AF'>$100k</text>
        <text x='25' y='55' fontSize='6' fill='#9CA3AF'>$10k</text>
        {/* Bars */}
        <rect x='42' y='45' width='8' height='30' rx='1' fill='#111827' />
        <rect x='53' y='50' width='8' height='25' rx='1' fill='#111827' />
        <rect x='64' y='42' width='8' height='33' rx='1' fill='#111827' />
        <rect x='75' y='55' width='8' height='20' rx='1' fill='#60A5FA' />
        <rect x='86' y='48' width='8' height='27' rx='1' fill='#111827' />
        {/* Bar labels */}
        <rect x='42' y='80' width='8' height='3' rx='1' fill='#E5E7EB' />
        <rect x='53' y='80' width='8' height='3' rx='1' fill='#E5E7EB' />
        <rect x='64' y='80' width='8' height='3' rx='1' fill='#E5E7EB' />
        <rect x='75' y='80' width='8' height='3' rx='1' fill='#E5E7EB' />
        <rect x='86' y='80' width='8' height='3' rx='1' fill='#E5E7EB' />
        {/* Bottom text lines */}
        <rect x='30' y='90' width='60' height='3' rx='1' fill='#E5E7EB' />
        <rect x='30' y='96' width='45' height='3' rx='1' fill='#E5E7EB' />

        {/* Donut chart (top-right) */}
        <rect x='110' y='30' width='75' height='75' rx='6' fill='white' stroke='#E5E7EB' strokeWidth='1' />
        <circle cx='140' cy='58' r='18' fill='none' stroke='#E5E7EB' strokeWidth='6' />
        <circle cx='140' cy='58' r='18' fill='none' stroke='#38BDF8' strokeWidth='6'
          strokeDasharray='50 63' strokeDashoffset='0' />
        <circle cx='140' cy='58' r='18' fill='none' stroke='#111827' strokeWidth='6'
          strokeDasharray='25 88' strokeDashoffset='-50' />
        {/* Legend dots */}
        <circle cx='168' cy='48' r='2.5' fill='#38BDF8' />
        <rect x='173' y='46' width='8' height='4' rx='1' fill='#E5E7EB' />
        <circle cx='168' cy='57' r='2.5' fill='#111827' />
        <rect x='173' y='55' width='8' height='4' rx='1' fill='#E5E7EB' />
        <circle cx='168' cy='66' r='2.5' fill='#E5E7EB' />
        <rect x='173' y='64' width='8' height='4' rx='1' fill='#E5E7EB' />
        {/* Bottom text */}
        <rect x='118' y='86' width='55' height='3' rx='1' fill='#E5E7EB' />
        <rect x='118' y='92' width='40' height='3' rx='1' fill='#E5E7EB' />

        {/* Line chart (bottom) */}
        <rect x='20' y='115' width='165' height='70' rx='6' fill='white' stroke='#E5E7EB' strokeWidth='1' />
        <polyline
          points='35,160 55,148 75,155 95,135 115,140 135,125 155,130 170,128'
          fill='none'
          stroke='#38BDF8'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <polyline
          points='35,155 55,150 75,145 95,148 115,138 135,142 155,135 170,132'
          fill='none'
          stroke='#111827'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeDasharray='4 3'
        />
        {/* Grid lines */}
        <line x1='35' y1='130' x2='170' y2='130' stroke='#F3F4F6' strokeWidth='0.5' />
        <line x1='35' y1='145' x2='170' y2='145' stroke='#F3F4F6' strokeWidth='0.5' />
        <line x1='35' y1='160' x2='170' y2='160' stroke='#F3F4F6' strokeWidth='0.5' />
        {/* Bottom label */}
        <text x='160' y='178' fontSize='6' fill='#9CA3AF'>$22k</text>

        {/* Small data card (right side) */}
        <rect x='195' y='115' width='50' height='70' rx='6' fill='white' stroke='#E5E7EB' strokeWidth='1' />
        <rect x='202' y='125' width='36' height='15' rx='3' fill='#F3F4F6' />
        <rect x='208' y='130' width='24' height='5' rx='1' fill='#E5E7EB' />
        <rect x='202' y='148' width='36' height='3' rx='1' fill='#E5E7EB' />
        <rect x='202' y='155' width='28' height='3' rx='1' fill='#E5E7EB' />
        <rect x='202' y='162' width='32' height='3' rx='1' fill='#E5E7EB' />
        <rect x='202' y='169' width='20' height='3' rx='1' fill='#E5E7EB' />
      </svg>
    </div>
  )
}

/* ═══════════════════ SHARED CONTENT CARD ═══════════════════ */

function MarketResearchContentCard() {
  const { openModal } = useUpgradeStore()
  return (
    <div className='space-y-0'>
      {/* Main content card */}
      <div className='bg-[#FAFAF8] rounded-2xl border border-[#F0F0EC] p-4 sm:p-6 md:p-8'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-4'>
          {/* Left side - text */}
          <div className='max-w-full md:max-w-[520px]'>
            <h2 className='text-[20px] font-bold text-[#111827] mb-3'>
              Understand your market better than anyone else
            </h2>
            <p className='text-[14px] text-[#6B7280] leading-relaxed'>
              Audience demographics, personas, and industry benchmarks
            </p>
          </div>
          {/* Right side - illustration */}
          <div className='hidden md:block'>
            <MarketResearchIllustration />
          </div>
        </div>
      </div>

      {/* Upgrade banner */}
        <div className="flex justify-center mt-4 sticky top-4 z-10 pointer-events-none">
          <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-3 pointer-events-auto' style={{
            background: "#FFF4C2",
            borderRadius: 22,
            padding: "10px 12px 10px 16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.1)",
          }}>
            <span className='text-[13px] sm:text-[14px]' style={{ color: "#111827", fontWeight: 500 }}>
              Upgrade to get the full business plan
            </span>
            <button
              onClick={openModal}
              className="flex items-center gap-2 bg-[#111827] text-white px-[18px] py-[8px] rounded-[22px] text-[13px] font-medium hover:bg-[#1e293b] transition-colors shrink-0"
              style={{ height: '36px' }}
            >
              <Crown strokeWidth={1.5} className="w-[16px] h-[16px]" />
              <span style={{ transform: 'translateY(1px)' }}>Upgrade</span>
            </button>
          </div>
        </div>
    </div>
  )
}

/* ═══════════════════ PAGE EXPORTS ═══════════════════ */

export function MarketResearchAudience() {
  return (
    <>
      <Header fixed>
        <div className='flex-1' />
      </Header>
      <Main>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-[22px] font-semibold text-[#111827]'>Market Research</h1>
        </div>
        <MarketResearchContentCard />
      </Main>
    </>
  )
}

export function MarketResearchPersonas() {
  return (
    <>
      <Header fixed>
        <div className='flex-1' />
      </Header>
      <Main>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-[22px] font-semibold text-[#111827]'>Market Research</h1>
        </div>
        <MarketResearchContentCard />
      </Main>
    </>
  )
}

export function MarketResearchBenchmarks() {
  return (
    <>
      <Header fixed>
        <div className='flex-1' />
      </Header>
      <Main>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-[22px] font-semibold text-[#111827]'>Market Research</h1>
        </div>
        <MarketResearchContentCard />
      </Main>
    </>
  )
}

export function MarketResearchCompetitors() {
  return (
    <>
      <Header fixed>
        <div className='flex-1' />
      </Header>
      <Main>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-[22px] font-semibold text-[#111827]'>Market Research</h1>
        </div>
        <MarketResearchContentCard />
      </Main>
    </>
  )
}
