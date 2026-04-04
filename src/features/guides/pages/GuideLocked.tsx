import { BackButton } from '@/features/guides/components/BackButton'
import { UpgradeGate } from '@/features/guides/components/UpgradeGate'
import { Header } from '@/components/layout/header'

export function GuideLocked() {
  return (
    <>
      <Header className='md:hidden border-b border-gray-100 bg-white' />
      <div className='min-h-full bg-white px-4 sm:px-8 lg:px-12 xl:px-[160px] pb-16 pt-6 md:pt-10'>
      {/* Header row */}
      <div className='mb-6 md:mb-2 flex flex-col md:flex-row max-w-[860px] items-start justify-between gap-6 md:gap-0'>
        <div className='max-w-[580px]'>
          <h1 className='mb-3 text-[22px] font-semibold text-gray-900'>
            Unlocking Small Grants for STEM Advancement
          </h1>
          <p className='text-[13px] leading-relaxed text-gray-500'>
            Discover practical strategies and valuable insights into small-scale funding
            opportunities tailored for STEM-focused educational institutions like Innovatech
            Academy.
          </p>
        </div>
        <img
          src='https://flagcdn.com/w1280/kz.png' 
          alt='Guide Cover'
          className='min-h-[160px] min-w-[240px] max-h-[160px] max-w-[240px] shrink-0 rounded-xl object-cover'
        />
      </div>

      <BackButton />

      <UpgradeGate />
      </div>
    </>
  )
}
