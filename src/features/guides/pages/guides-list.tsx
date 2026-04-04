import { guides } from '@/features/guides/data/guides'
import { GuideCard } from '@/features/guides/components/guide-card'
import { Header } from '@/components/layout/header'

export function GuidesList() {
  return (
    <>
      <Header className='md:hidden border-b border-gray-100 bg-white' />
      <div className='w-full bg-white overflow-y-auto min-h-full py-8 px-4 sm:px-8 lg:px-12'>
        <div className='max-w-7xl mx-auto'>
      {/* Page title */}
      <h1 className='text-[20px] font-medium text-[#111827] mb-8 mt-0'>
        Guides
      </h1>

      {/* Hero banner */}
      <div className='bg-[#F9FAFB] rounded-2xl p-6 sm:p-10 md:px-[60px] md:py-[48px] flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-12 gap-8'>
        <div className='relative z-10 flex-1 min-w-0'>
          <h2 className='text-[24px] md:text-[28px] font-bold text-[#111827] leading-tight tracking-tight max-w-[510px] mt-0 mb-4'>
            Expert how-to guides generated just for your company
          </h2>
          <p className='text-[15px] md:text-[16px] font-normal text-[#6B7280] m-0'>
            Marketing ideas, financial tips, and more
          </p>
        </div>

        {/* Document illustration - flex item to prevent overlap on small screens */}
        <div className='hidden md:block w-[170px] h-[152px] shrink-0 z-[1]'>
          <svg
            width='100%'
            height='100%'
            viewBox='0 0 140 125'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g>
              {/* Back paper */}
              <path
                d='M 30 6 L 104 6 Q 112 6 112 14 L 112 101 L 107 96 L 102 101 L 97 96 L 92 101 L 87 96 L 82 101 L 77 96 L 72 101 L 67 96 L 62 101 L 57 96 L 52 101 L 47 96 L 42 101 L 37 96 L 32 101 L 27 96 L 22 101 L 22 14 Q 22 6 30 6 Z'
                fill='#ffffff'
                stroke='#d1d5db'
                strokeWidth='1.5'
              />
              {/* Middle paper */}
              <path
                d='M 24 13 L 98 13 Q 106 13 106 21 L 106 108 L 101 103 L 96 108 L 91 103 L 86 108 L 81 103 L 76 108 L 71 103 L 66 108 L 61 103 L 56 108 L 51 103 L 46 108 L 41 103 L 36 108 L 31 103 L 26 108 L 21 103 L 16 108 L 16 21 Q 16 13 24 13 Z'
                fill='#ffffff'
                stroke='#d1d5db'
                strokeWidth='1.5'
              />
              {/* Front paper */}
              <path
                d='M 18 20 L 92 20 Q 100 20 100 28 L 100 115 L 95 110 L 90 115 L 85 110 L 80 115 L 75 110 L 70 115 L 65 110 L 60 115 L 55 110 L 50 115 L 45 110 L 40 115 L 35 110 L 30 115 L 25 110 L 20 115 L 15 110 L 10 115 L 10 28 Q 10 20 18 20 Z'
                fill='#ffffff'
                stroke='#d1d5db'
                strokeWidth='1.5'
              />

              {/* Front paper content */}
              <rect x='20' y='32' width='70' height='22' rx='4' fill='#38bdf8' />
              <rect x='20' y='64' width='36' height='4' rx='2' fill='#d1d5db' />
              <rect x='20' y='74' width='70' height='3' rx='1.5' fill='#e5e7eb' />
              <rect x='20' y='82' width='70' height='3' rx='1.5' fill='#e5e7eb' />
              <rect x='20' y='90' width='50' height='3' rx='1.5' fill='#e5e7eb' />
            </g>
          </svg>
        </div>
      </div>

      {/* Made for you */}
      <h2 className='text-[22px] font-normal text-[#111827] mb-7 mt-0'>
        Made for you
      </h2>

      {/* Grid wrapper */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
        {guides.map((guide) => (
          <GuideCard
            key={guide.id}
            title={guide.title}
            description={guide.description}
            status={guide.status}
            imageUrl={guide.imageUrl}
            imageGradient={guide.imageGradient}
            route={guide.route}
          />
        ))}
      </div>
        </div>
      </div>
    </>
  )
}
