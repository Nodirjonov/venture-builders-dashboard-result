import { useState } from 'react'

import { Main } from '@/components/layout/main'
import { Header } from '@/components/layout/header'
import { ChevronDown, Check } from 'lucide-react'
import { FormationContact } from './contact-form'

/* ═══════════════════ CERTIFICATE ILLUSTRATION ═══════════════════ */

function CertificateIllustration() {
  return (
    <div className='relative w-[200px] h-[180px] shrink-0'>
      <svg viewBox='0 0 200 180' className='w-full h-full'>
        {/* Shadow */}
        <rect x='28' y='18' width='120' height='130' rx='6' fill='#F1F5F9' />
        {/* Certificate paper */}
        <rect x='24' y='12' width='120' height='130' rx='6' fill='white' stroke='#E2E8F0' strokeWidth='1.2' />
        {/* Decorative top border */}
        <rect x='44' y='26' width='80' height='5' rx='2.5' fill='#E2E8F0' />
        {/* Text lines */}
        <path d='M 44 48 Q 60 42, 76 48 Q 92 54, 108 48' fill='none' stroke='#E2E8F0' strokeWidth='1.5' />
        <path d='M 44 60 Q 60 54, 76 60 Q 92 66, 108 60' fill='none' stroke='#E2E8F0' strokeWidth='1.5' />
        <path d='M 44 72 Q 60 66, 76 72 Q 92 78, 108 72' fill='none' stroke='#E2E8F0' strokeWidth='1.5' />
        {/* Signature line */}
        <rect x='44' y='90' width='50' height='2.5' rx='1' fill='#E2E8F0' />
        <path d='M 44 100 C 50 94, 60 106, 72 96 C 78 90, 84 98, 90 94' fill='none' stroke='#CBD5E1' strokeWidth='1' />
        {/* Stamp */}
        <rect x='74' y='112' width='42' height='22' rx='4' fill='#F8FAFC' stroke='#E2E8F0' strokeWidth='1' />
        <rect x='82' y='118' width='26' height='3' rx='1.5' fill='#CBD5E1' />
        <rect x='86' y='125' width='18' height='3' rx='1.5' fill='#CBD5E1' />
        {/* Blue ribbon badge */}
        <circle cx='160' cy='140' r='22' fill='#0284C7' opacity='0.15' />
        <circle cx='160' cy='140' r='18' fill='#0EA5E9' />
        <circle cx='160' cy='140' r='13' fill='#38BDF8' />
        <path d='M 152 140 L 158 146 L 169 134' fill='none' stroke='white' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
        {/* Ribbon tails */}
        <path d='M 148 154 L 145 172 L 154 164 L 160 174 L 160 154' fill='#0EA5E9' />
        <path d='M 160 154 L 160 174 L 166 164 L 175 172 L 172 154' fill='#38BDF8' />
      </svg>
    </div>
  )
}

/* ═══════════════════ TRUSTPILOT STARS ═══════════════════ */

function TrustpilotStars() {
  return (
    <div className='flex items-center gap-2.5 mt-6'>
      <span className='text-[14px] font-bold text-[#1E293B] tracking-tight'>Excellent</span>
      <div className='flex gap-[3px]'>
        {[...Array(5)].map((_, i) => (
          <div key={i} className='w-[24px] h-[24px] bg-[#00B67A] flex items-center justify-center rounded-[2px]'>
            <svg viewBox='0 0 24 24' className='w-3.5 h-3.5 text-white' fill='currentColor'>
              <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
            </svg>
          </div>
        ))}
      </div>
      <svg viewBox='0 0 24 24' className='w-[18px] h-[18px] text-[#00B67A]' fill='currentColor'>
        <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
      </svg>
      <span className='text-[14px] font-bold text-[#1E293B] tracking-tight'>Trustpilot</span>
    </div>
  )
}

/* ═══════════════════ FAQ ITEM (with smooth animation) ═══════════════════ */

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className='border-b border-slate-200'>
      <button
        onClick={() => setOpen(!open)}
        className='w-full flex items-center justify-between py-5 text-left cursor-pointer group'
      >
        <span className='text-[15px] font-medium text-slate-800 pr-6 tracking-[-0.01em]'>{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:text-slate-600 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className='grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]'
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className='overflow-hidden'>
          <p className='text-[14px] text-slate-500 leading-[1.7] pb-5 pr-10'>
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════ FEATURE CARD ═══════════════════ */

function FeatureCard({
  icon,
  iconColor = 'text-[#00A676]',
  title,
  description,
  variant = 'top',
  className = ''
}: {
  icon: React.ReactNode
  iconBg?: string
  iconColor?: string
  title: string
  description: string
  variant?: 'top' | 'service'
  className?: string
}) {
  if (variant === 'top') {
    return (
      <div className={`bg-[#F9FAFB] rounded-[24px] p-8 transition-all duration-200 ${className}`}>
        <div className={`mb-4 w-6 h-6 flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
        <h3 className='text-[16px] font-semibold text-slate-800 mb-2 tracking-[-0.01em]'>{title}</h3>
        <p className='text-[14px] text-slate-500 leading-relaxed pr-2'>{description}</p>
      </div>
    )
  }

  return (
    <div className={`bg-white transition-all duration-200 ${className}`}>
      <div className={`mb-4 w-6 h-6 flex items-center justify-center ${iconColor}`}>
        {icon}
      </div>
      <h3 className='text-[15px] font-semibold text-slate-900 mb-1.5 tracking-[-0.01em]'>{title}</h3>
      <p className='text-[13.5px] text-slate-500 leading-relaxed pr-2'>{description}</p>
    </div>
  )
}

/* ═══════════════════ MAIN FORMATION COMPONENT ═══════════════════ */

export function Formation() {
  const [step, setStep] = useState<'overview' | 'loading' | 'contact'>('overview')

  const handleStart = () => {
    setStep('loading')
    setTimeout(() => setStep('contact'), 1500)
  }

  return (
    <>
      <Header className='border-b border-gray-100'>
        <h1 className='text-[16px] font-semibold text-slate-800 tracking-tight'>Formation</h1>
      </Header>
      
      {step === 'loading' ? (
        <Main>
          <div className='flex items-center justify-center min-h-[50vh] animate-in fade-in duration-300'>
            <div className='w-10 h-10 border-4 border-[#00A676]/20 border-t-[#00A676] rounded-full animate-spin' />
          </div>
        </Main>
      ) : step === 'contact' ? (
        <Main>
          <div className='pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500'>
            <FormationContact onBack={() => setStep('overview')} />
          </div>
        </Main>
      ) : (
        <div className='animate-in fade-in duration-300'>
          <FormationOverview onStart={handleStart} />
        </div>
      )}
    </>
  )
}

function FormationOverview({ onStart }: { onStart: () => void }) {
  return (
    <>
      <Main>
        <div className='max-w-[960px] mx-auto px-2'>
          {/* Page Title */}
          <h1 className='text-[24px] font-semibold text-slate-900 mb-8 tracking-[-0.02em]'>
            Formation
          </h1>

          {/* ══════════════ SECTION 1: Hero Card ══════════════ */}
          <div className='bg-[#F9FAFB] rounded-[24px] p-6 sm:p-8 md:p-10 mb-12'>
            <div className='flex flex-col md:flex-row items-center md:items-start justify-between gap-8'>
              <div className='max-w-[480px]'>
                <h2 className='text-[24px] font-bold text-slate-900 mb-4 tracking-[-0.02em] leading-tight'>
                  Start your LLC with confidence.
                </h2>
                <p className='text-[15px] text-slate-500 leading-relaxed mb-6'>
                  Form your LLC to make your business official and protect your personal assets.
                  Choose worry-free compliance and rest easy. We'll make sure you're always in
                  good standing with your state.
                </p>
                <TrustpilotStars />
              </div>
              <CertificateIllustration />
            </div>
          </div>

          {/* ══════════════ SECTION 2: Formation Pro ══════════════ */}
          <h2 className='text-[22px] font-semibold text-slate-900 mb-6 tracking-[-0.02em]'>
            Get started with Formation Pro
          </h2>

          <div className='rounded-[16px] border border-slate-200 p-6 sm:p-8 mb-4'>
            <div className='flex flex-col md:flex-row gap-8 md:gap-10'>
              {/* Left column — pricing & action */}
              <div className='w-full md:w-[280px] shrink-0 flex flex-col justify-between md:min-h-[220px]'>
                <div>
                  <h3 className='text-[16px] font-bold text-slate-900 mb-2 tracking-[-0.01em]'>
                    Formation Pro
                  </h3>
                  <p className='text-[14px] text-slate-500 leading-relaxed'>
                    Everything to start and protect your LLC and keep it compliant year-round.
                  </p>
                </div>
                
                <div className='mt-8'>
                  <div className='mb-0.5'>
                    <span className='text-[16px] font-bold text-slate-900'>$149</span>
                    <span className='text-[16px] text-slate-600'>/per year</span>
                  </div>
                  <p className='text-[13px] text-slate-400 mb-4'>+ state filing fees</p>
                  <button 
                    onClick={onStart}
                    className='w-full py-2.5 rounded-[8px] bg-[#00A676] text-white text-[15px] font-semibold hover:bg-[#009568] active:bg-[#00875C] transition-colors shadow-sm'
                  >
                    Start your LLC
                  </button>
                </div>
              </div>

              {/* Separator */}
              <div className='w-full h-px md:w-px md:h-auto bg-slate-100 self-stretch' />

              {/* Right column — includes checklist */}
              <div className='flex-1 lg:pl-2'>
                <div className='flex items-center justify-between mb-5'>
                  <span className='text-[13px] text-slate-600 font-medium'>Includes:</span>
                  <button className='text-[13px] text-slate-400 flex items-center gap-1.5 hover:text-slate-600 transition-colors'>
                    Show details
                    <ChevronDown className='h-3.5 w-3.5' strokeWidth={2} />
                  </button>
                </div>
                <div className='space-y-3.5'>
                  {[
                    'Processes in 1 business day',
                    '100% accuracy guarantee',
                    'Total compliance',
                    'Operating agreement',
                    'EIN',
                  ].map((item, i) => (
                    <div key={i} className='flex items-center gap-3'>
                      <Check className='h-[16px] w-[16px] text-[#00A676] shrink-0' strokeWidth={3} />
                      <span className='text-[14px] font-medium text-slate-800'>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Processing note */}
          <p className='text-[12px] text-slate-400 mb-12 text-center'>
            * Venturekit processing times do not include Secretary of State processing times, which can vary.
          </p>

          {/* ══════════════ SECTION 3: Top Feature Row ══════════════ */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            <FeatureCard
              icon={
                <svg viewBox='0 0 24 24' className='w-full h-full' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' />
                </svg>
              }
              title='Kickstart in minutes'
              description='Start your LLC in 3 easy steps with our service trusted by entrepreneurs around the world.'
            />
            <FeatureCard
              icon={
                <svg viewBox='0 0 24 24' className='w-full h-full' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
                  <polyline points='14 2 14 8 20 8' />
                  <line x1='16' y1='13' x2='8' y2='13' />
                  <line x1='16' y1='17' x2='8' y2='17' />
                </svg>
              }
              title='Set it up right'
              description='Our tools offer step-by-step guidance to help you launch and protect your new business.'
            />
            <FeatureCard
              icon={
                <svg viewBox='0 0 24 24' className='w-full h-full' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
                </svg>
              }
              title='Get the help you need'
              description='Get a dedicated account manager to help answer your questions.'
            />
          </div>

          {/* ══════════════ SECTION 3b: 6 Service Cards ══════════════ */}
          <div className='grid grid-cols-1 md:grid-cols-3 mb-14 pt-2'>
            <FeatureCard
              variant='service'
              className='border-b border-slate-100 md:border-r pb-8 md:pb-10 pt-4 md:pt-0 md:pr-6'
              icon={
                <svg viewBox='0 0 24 24' className='w-full h-full' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                  <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                </svg>
              }
              title='Naming'
              description="We'll check to make sure your business name is available and will work with you to pick an alternative if it's not."
            />
            <FeatureCard
              variant='service'
              className='border-b border-slate-100 md:border-r py-8 md:pb-10 md:pt-0 md:px-6'
              icon={
                <svg viewBox='0 0 24 24' className='w-full h-full' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                  <circle cx='12' cy='7' r='4' />
                </svg>
              }
              title='Registered agent'
              description="Required in most states to receive your LLC's legal notices and legal documents."
            />
            <FeatureCard
              variant='service'
              className='border-b border-slate-100 py-8 md:pb-10 md:pt-0 md:pl-6'
              icon={
                <svg viewBox='0 0 24 24' className='w-full h-full' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                  <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
                  <line x1='3' y1='9' x2='21' y2='9' />
                  <line x1='9' y1='21' x2='9' y2='9' />
                </svg>
              }
              title='Articles of organization'
              description='Required to officially form your LLC and give it a legal identity.'
            />
            <FeatureCard
              variant='service'
              className='border-b md:border-b-0 border-slate-100 md:border-r py-8 md:pt-10 md:pb-0 md:pr-6'
              icon={
                <svg viewBox='0 0 24 24' className='w-full h-full' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
                  <circle cx='9' cy='7' r='4' />
                  <path d='M23 21v-2a4 4 0 0 0-3-3.87' />
                  <path d='M16 3.13a4 4 0 0 1 0 7.75' />
                </svg>
              }
              title='Operating agreement'
              description='Our templates make it easy for LLC owners to define their rights and limit disagreements.'
            />
            <FeatureCard
              variant='service'
              className='border-b md:border-b-0 border-slate-100 md:border-r py-8 md:pt-10 md:pb-0 md:px-6'
              icon={
                <svg viewBox='0 0 24 24' className='w-full h-full' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                  <rect x='2' y='5' width='20' height='14' rx='2' />
                  <line x1='2' y1='10' x2='22' y2='10' />
                </svg>
              }
              title='EIN'
              description='Required to set up a business bank account, file taxes, and start hiring.'
            />
            <FeatureCard
              variant='service'
              className='py-8 md:pt-10 md:pb-0 md:pl-6'
              icon={
                <svg viewBox='0 0 24 24' className='w-full h-full' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
                  <polyline points='22 4 12 14.01 9 11.01' />
                </svg>
              }
              title='Compliance filings'
              description='Each state has specific required filings like BOI, annual reports, and more.'
            />
          </div>

          {/* ══════════════ SECTION 4: What is an LLC ══════════════ */}
          <div className='flex flex-col md:flex-row gap-6 lg:gap-8 mb-16'>
            <div className='flex-1 border border-[#ECEEE8] bg-white rounded-[20px] p-8 lg:p-10'>
              <h2 className='text-[18px] lg:text-[20px] font-bold text-slate-900 mb-3 tracking-[-0.01em]'>
                What is an LLC?
              </h2>
              <p className='text-[14.5px] text-slate-500 leading-relaxed mb-8'>
                A limited liability company (LLC) is a type of business entity you can register in your state. The main purpose of an LLC
                company is to limit the personal liability of its owners—like a C or S corporation—but it also allows the business to
                operate with simpler rules and more flexible tax requirements.
              </p>
              <h2 className='text-[18px] lg:text-[20px] font-bold text-slate-900 mb-3 tracking-[-0.01em]'>
                Do I need an LLC?
              </h2>
              <p className='text-[14.5px] text-slate-500 leading-relaxed'>
                An LLC isn't always required, but many small business owners choose to form an LLC for personal liability protection.
                Having an LLC can also help you open bank accounts, enter into contracts, hire employees, and get necessary
                business licenses and permits.
              </p>
            </div>
            <div className='w-full md:w-[300px] lg:w-[340px] h-[360px] md:h-auto shrink-0'>
              <img 
                src='https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=800&auto=format&fit=crop'
                alt='Small business owner in flower shop'
                className='w-full h-full object-cover rounded-[20px] shadow-sm'
              />
            </div>
          </div>

          {/* ══════════════ SECTION 5: Three Easy Steps ══════════════ */}
          <h2 className='text-[22px] font-semibold text-slate-900 mb-6 tracking-[-0.02em]'>
            Use Venturekit to start your business in three easy steps
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-14'>
            {[
              {
                step: '1',
                title: 'Tell us about your business',
                desc: 'Let us know basic details about your business.',
              },
              {
                step: '2',
                title: 'Choose the services you need',
                desc: "Take your business to the next level with Venturekit's services.",
              },
              {
                step: '3',
                title: 'Let us make it official',
                desc: 'Let us take care of the rest while you get back to business!',
              },
            ].map((item) => (
              <div key={item.step} className='bg-[#F9FAFB] rounded-[24px] p-8 transition-colors duration-200'>
                <div className='mb-14'>
                  {/* Shop/Store Outline Icon */}
                  <svg viewBox='0 0 24 24' className='w-6 h-6 text-slate-800' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
                    <polyline points='9 22 9 12 15 12 15 22' />
                    <path d='M3 9h18' />
                  </svg>
                </div>
                <div className='text-[34px] font-medium text-slate-900 mb-3 leading-none'>{item.step}</div>
                <h3 className='text-[16px] font-bold text-slate-900 mb-2 tracking-[-0.01em]'>{item.title}</h3>
                <p className='text-[14px] text-slate-500 leading-[1.65] pr-2'>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* ══════════════ SECTION 6: Benefits ══════════════ */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-14'>
            <FeatureCard
              variant='service'
              className='border border-[#ECEEE8] rounded-[20px] px-8 pt-8 pb-10'
              iconColor='text-rose-500'
              icon={
                <svg viewBox='0 0 24 24' className='w-full h-full' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
                  <path d='M9 12l2 2 4-4' />
                </svg>
              }
              title='Protect your assets'
              description='By forming an LLC and keeping your personal finances separate, you can protect your personal assets from business liabilities.'
            />
            <FeatureCard
              variant='service'
              className='border border-[#ECEEE8] rounded-[20px] px-8 pt-8 pb-10'
              iconColor='text-amber-500'
              icon={
                <svg viewBox='0 0 24 24' className='w-full h-full' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                  {/* Custom Tree/Palm icon matching photo */}
                  <path d='M12 22V10' />
                  <path d='M12 10C8 10 5 13 5 13' />
                  <path d='M12 10C16 10 19 13 19 13' />
                  <path d='M12 10C10 5 15 3 15 3' />
                </svg>
              }
              title='Make things easier'
              description="It's typically easier to form an LLC than a corporation, and there are simpler rules for things like record-keeping."
            />
            <FeatureCard
              variant='service'
              className='border border-[#ECEEE8] rounded-[20px] px-8 pt-8 pb-10'
              iconColor='text-sky-500'
              icon={
                <svg viewBox='0 0 24 24' className='w-full h-full' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                  {/* Custom Finance/Tax icon matching photo */}
                  <rect x='4' y='6' width='16' height='12' rx='2' ry='2' />
                  <circle cx='12' cy='12' r='2' />
                  <path d='M2 12h2' />
                  <path d='M20 12h2' />
                </svg>
              }
              title='Get tax flexibility'
              description="You get to decide how you're taxed — as an LLC or a corporation — to maximize your ability to save money and minimize tax liability."
            />
          </div>

          {/* ══════════════ SECTION 7: FAQ ══════════════ */}
          <div className='mb-20'>
            <h2 className='text-[28px] font-bold text-slate-900 mb-10 tracking-[-0.02em] leading-tight'>
              Frequently asked<br />questions
            </h2>

            <div className='border-t border-slate-200'>
              <FaqItem
                question='What is the difference between an LLC and a corporation?'
                answer='An LLC (Limited Liability Company) and a corporation are different business structures. LLCs offer more flexibility in management and taxation while providing liability protection. Corporations have a more rigid structure with shareholders, directors, and officers, but may be better for raising capital and going public.'
              />
              <FaqItem
                question="What's the main difference between a C corporation and an S corporation?"
                answer="The main difference is in how they're taxed. C corporations face double taxation – the company pays corporate tax on profits, and shareholders pay tax on dividends. S corporations are pass-through entities where profits pass directly to shareholders' personal returns, avoiding double taxation."
              />
              <FaqItem
                question="What's the main difference between a sole proprietorship and an LLC?"
                answer="The key difference is liability protection. In a sole proprietorship, there's no legal separation between the owner and the business - your personal assets are at risk. An LLC creates a legal barrier protecting your personal assets from business debts and liabilities."
              />
              <FaqItem
                question='How are different business types taxed?'
                answer="Sole proprietorships and partnerships report business income on personal returns. LLCs can choose their tax treatment. S corporations pass income to shareholders' personal returns. C corporations pay corporate tax on profits and shareholders pay tax on dividends."
              />
              <FaqItem
                question='Which business types give me personal liability protection?'
                answer='LLCs, corporations (both C and S), and limited partnerships provide personal liability protection. Sole proprietorships and general partnerships do not offer liability protection – owners are personally responsible for business debts and liabilities.'
              />
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}
