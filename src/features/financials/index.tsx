import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { useUpgradeStore } from '@/stores/upgrade-store'
import { Crown } from 'lucide-react'

/* ═══════════════════ FINANCIALS ILLUSTRATION ═══════════════════ */

function FinancialsIllustration() {
  return (
    <div className='relative w-[280px] h-[190px]'>
      <svg viewBox='0 0 280 190' className='absolute inset-0 w-full h-full'>
        {/* Top card (Area chart) */}
        <rect x='10' y='20' width='260' height='80' rx='6' fill='white' stroke='#E5E7EB' strokeWidth='1' />
        {/* Labels */}
        <text x='25' y='45' fontSize='8' fill='#111827' fontWeight='bold'>$280k</text>
        <rect x='25' y='52' width='30' height='3' rx='1' fill='#E5E7EB' />
        
        <text x='110' y='45' fontSize='8' fill='#111827' fontWeight='bold'>$220k</text>
        <rect x='110' y='52' width='25' height='3' rx='1' fill='#E5E7EB' />
        
        <text x='195' y='45' fontSize='8' fill='#111827' fontWeight='bold'>$80k</text>
        <rect x='195' y='52' width='35' height='3' rx='1' fill='#E5E7EB' />

        {/* Area Graph */}
        <path 
          d='M 25 85 L 60 85 L 100 70 L 140 85 L 180 65 L 220 75 L 250 55 L 250 95 L 25 95 Z' 
          fill='#E0F2FE' 
          opacity='0.5' 
        />
        <polyline
          points='25,85 60,85 100,70 140,85 180,65 220,75 250,55'
          fill='none'
          stroke='#38BDF8'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        {/* Bottom Left card (Mini stat) */}
        <rect x='10' y='110' width='125' height='60' rx='6' fill='white' stroke='#E5E7EB' strokeWidth='1' />
        <rect x='25' y='125' width='25' height='4' rx='2' fill='#E5E7EB' />
        {/* Circle stat */}
        <circle cx='35' cy='145' r='10' fill='none' stroke='#E5E7EB' strokeWidth='3.5' />
        <circle cx='35' cy='145' r='10' fill='none' stroke='#0284C7' strokeWidth='3.5' strokeDasharray='40 63' />
        {/* Lines matching screenshot */}
        <rect x='55' y='138' width='6' height='4' rx='2' fill='#CBD5E1' />
        <rect x='65' y='138' width='45' height='4' rx='2' fill='#E5E7EB' />
        <rect x='55' y='148' width='6' height='4' rx='2' fill='#CBD5E1' />
        <rect x='65' y='148' width='35' height='4' rx='2' fill='#E5E7EB' />

        {/* Bottom Right card (Bar chart) */}
        <rect x='145' y='110' width='125' height='60' rx='6' fill='white' stroke='#E5E7EB' strokeWidth='1' />
        {/* Mini labels */}
        <rect x='160' y='125' width='6' height='4' rx='2' fill='#38BDF8' />
        <text x='170' y='129' fontSize='5' fill='#9CA3AF'>$80k</text>
        <rect x='195' y='125' width='6' height='4' rx='2' fill='#9CA3AF' />
        <text x='205' y='129' fontSize='5' fill='#9CA3AF'>$50k</text>
        {/* Bars */}
        <rect x='160' y='150' width='5' height='10' rx='1' fill='#38BDF8' />
        <rect x='167' y='140' width='5' height='20' rx='1' fill='#9CA3AF' opacity='0.5' />
        
        <rect x='178' y='145' width='5' height='15' rx='1' fill='#38BDF8' />
        <rect x='185' y='135' width='5' height='25' rx='1' fill='#9CA3AF' opacity='0.5' />
        
        <rect x='196' y='140' width='5' height='20' rx='1' fill='#38BDF8' />
        <rect x='203' y='145' width='5' height='15' rx='1' fill='#9CA3AF' opacity='0.5' />
        
        <rect x='214' y='135' width='5' height='25' rx='1' fill='#38BDF8' />
        <rect x='221' y='145' width='5' height='15' rx='1' fill='#9CA3AF' opacity='0.5' />

        <rect x='232' y='150' width='5' height='10' rx='1' fill='#38BDF8' />
        <rect x='239' y='140' width='5' height='20' rx='1' fill='#9CA3AF' opacity='0.5' />
      </svg>
    </div>
  )
}

/* ═══════════════════ SHARED CONTENT LAYOUT ═══════════════════ */

function FinancialsContentLayout() {
  const { openModal } = useUpgradeStore()
  return (
    <div className='max-w-[1200px]'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-[22px] font-semibold text-[#111827]'>Financials</h1>
      </div>

      <div className='space-y-4'>
        {/* Upgrade banner (Top for Financials) */}
        <div className="flex justify-center mt-4 sticky top-4 z-10 pointer-events-none">
          <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-3 pointer-events-auto' style={{
            background: "#FFF4C2",
            borderRadius: 22,
            padding: "10px 12px 10px 16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.1)",
          }}>
            <span style={{ fontSize: 14, color: "#111827", fontWeight: 500 }}>
              Upgrade to get the full business plan
            </span>
            <button
              onClick={openModal}
              className="flex items-center gap-2 bg-[#111827] text-white px-[18px] py-[8px] rounded-[22px] text-[13px] font-medium hover:bg-[#1e293b] transition-colors"
              style={{ height: '36px' }}
            >
              <Crown strokeWidth={1.5} className="w-[16px] h-[16px]" />
              <span style={{ transform: 'translateY(1px)' }}>Upgrade</span>
            </button>
          </div>
        </div>

        {/* Main content card */}
        <div className='bg-[#FAFAF8] rounded-2xl border border-[#F0F0EC] p-4 sm:p-6 md:p-8'>
          <div className='flex flex-col md:flex-row items-start justify-between gap-4'>
            {/* Left side - text */}
            <div className='max-w-full md:max-w-[500px]'>
              <h2 className='text-[20px] font-bold text-[#111827] mb-3'>
                AI generated financial forecasts
              </h2>
              <p className='text-[14px] text-[#6B7280] leading-relaxed'>
                Get a complete overview of your business finances. From revenue and expenses to cash flow and balance sheet, all tailored specifically to your business, using AI.
              </p>
            </div>
            {/* Right side - illustration */}
            <div className='hidden md:block'>
              <FinancialsIllustration />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════ PAGE EXPORTS ═══════════════════ */

export function FinancialsOverview() {
  return (
    <>
      <Header fixed>
        <div className='flex-1' />
      </Header>
      <Main>
        <FinancialsContentLayout />
      </Main>
    </>
  )
}

export function FinancialsRevenue() {
  return <FinancialsOverview />
}

export function FinancialsExpenses() {
  return <FinancialsOverview />
}

export function FinancialsFinancing() {
  return <FinancialsOverview />
}

export function FinancialsDividends() {
  return <FinancialsOverview />
}

export function FinancialsTaxes() {
  return <FinancialsOverview />
}

export function FinancialsProfitLoss() {
  return <FinancialsOverview />
}

export function FinancialsBalanceSheet() {
  return <FinancialsOverview />
}

export function FinancialsCashFlow() {
  return <FinancialsOverview />
}
