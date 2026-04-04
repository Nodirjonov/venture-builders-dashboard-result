import { useState } from 'react'
import { useUpgradeStore } from '@/stores/upgrade-store'
import { ChevronDown, ArrowLeft } from 'lucide-react'

// ─── Features list for promo view ────────────────────────────────────────────
const FEATURES = [
  'Unlock full business plan',
  'Financials & budgeting',
  'PDF export',
  'AI business plan editor',
  '3 full business plans a month',
  'Chat AI consultant',
  'Priority email support',
  'Cancel anytime',
]

const COUNTRIES = [
  'Uzbekistan', 'United States', 'United Kingdom', 'Germany', 'France',
  'Russia', 'Kazakhstan', 'Turkey', 'China', 'Japan', 'South Korea',
  'India', 'Canada', 'Australia', 'Brazil',
]

// ─── Promo View (Step 1) ─────────────────────────────────────────────────────
function PromoView({ onUpgrade, onClose }: { onUpgrade: () => void; onClose: () => void }) {
  const [billing, setBilling] = useState<'yearly' | 'monthly'>('yearly')
  const price = billing === 'yearly' ? 8 : 19
  const isYearly = billing === 'yearly'

  return (
    <div className='relative w-[720px] max-w-[95vw] max-h-[90vh] overflow-x-hidden overflow-y-auto custom-scrollbar rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-300 slide-in-from-bottom-[2%]'>
      {/* Close Button */}
      <button
        onClick={onClose}
        className='absolute right-4 top-4 z-10 rounded-full p-2 text-gray-400 hover:bg-gray-100 transition-colors'
      >
        <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2.5'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>

      {/* Title */}
      <div className='pt-6 pb-3 text-center'>
        <h2 className='text-[22px] font-bold text-[#111827]'>Upgrade to Pro</h2>
      </div>

      {/* Flash Sale Banner */}
      <div className='mx-6 rounded-xl bg-[#F4F1FF] px-4 py-2.5 mb-5 text-center text-[13px] flex items-center justify-center gap-2 text-[#111827]'>
        <svg
          className='h-[15px] w-[15px] text-[#111827]'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth='2'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M13 2L3 14h9l-1 8 10-12h-9l1-8z' />
        </svg>
        <span className='font-medium'>
          <strong className='font-bold'>Flash Sale</strong> &nbsp;Save 60% on a yearly subscription
        </span>
      </div>

      <div className='flex flex-col md:flex-row px-4 md:px-6 pb-6 md:pb-8'>
        {/* LEFT: Pricing */}
        <div className='flex-1 md:pr-6 border-b md:border-b-0 md:border-r border-[#F3F4F6] pb-6 md:pb-0 mb-6 md:mb-0'>
          {/* Billing Toggle */}
          <div className='inline-flex items-center rounded-lg border border-gray-200 p-1 mb-6 bg-gray-50/50 whitespace-nowrap'>
            <button
              onClick={() => setBilling('yearly')}
              className={`flex items-center gap-2 rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-all ${
                isYearly ? 'bg-white text-[#111827] shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className='rounded px-1.5 py-0.5 text-[9px] font-bold bg-[#EBE5FF] text-[#8B5CF6] tracking-wide uppercase'>
                SAVE 60%
              </span>
            </button>
            <button
              onClick={() => setBilling('monthly')}
              className={`rounded-md px-4 py-1.5 text-[13px] font-medium transition-all ${
                !isYearly ? 'bg-white text-[#111827] shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
          </div>

          {/* Price */}
          <div className='mb-0.5 flex items-baseline'>
            <span className='text-[38px] font-bold text-[#111827] leading-none tracking-tight'>${price}</span>
            <span className='text-[14px] text-gray-500 ml-1 font-medium'>/mo</span>
          </div>
          
          <p className={`text-[12px] font-medium mb-6 ${isYearly ? 'text-[#8B5CF6]' : 'text-gray-500'}`}>
            {isYearly ? 'Billed yearly. Saving 60%' : 'Billed monthly'}
          </p>

          {/* CTA */}
          <button
            onClick={onUpgrade}
            className='w-full rounded-lg bg-[#00B067] py-2.5 text-[14px] font-semibold text-white hover:bg-[#009E5C] transition-colors mb-6 shadow-sm shadow-green-600/20'
          >
            Upgrade to Pro
          </button>

          {/* Features */}
          <ul className='space-y-3 mb-6'>
            {FEATURES.map((f) => (
              <li key={f} className='flex items-start gap-2.5 text-[13px] font-medium text-[#374151]'>
                <svg
                  className='h-[16px] w-[16px] shrink-0 text-[#00B067] mt-[1.5px]'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M20 6L9 17l-5-5' />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          {/* Agency link */}
          <p className='text-[12px] text-gray-500 text-center font-medium'>
            Get more with the <a href='#' className='text-[#00B067] font-semibold hover:underline'>Agency plan</a>
          </p>
        </div>

        {/* RIGHT: Social Proof */}
        <div className='flex-1 md:pl-6'>
          {/* Header: Rating & People */}
          <div className='flex items-center justify-center gap-6 mb-8 mt-1'>
            <div className='text-center'>
              <div className='flex items-center justify-center gap-[2px] mb-1.5'>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className='h-[15px] w-[15px] text-[#F59E0B]' viewBox='0 0 20 20' fill='currentColor'>
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
              <p className='text-[12px] text-gray-500 font-medium'>Rated 4.9/5</p>
            </div>

            <div className='w-px h-8 bg-[#E5E7EB]' />

            <div className='text-center'>
              <div className='flex items-center justify-center gap-1.5 mb-1.5'>
                <span className='h-1.5 w-1.5 rounded-full bg-[#00B067]' />
                <span className='text-[14px] font-bold text-[#111827] leading-none'>402 people</span>
              </div>
              <p className='text-[12px] text-gray-500 leading-none mt-1.5 font-medium'>signed up last week</p>
            </div>
          </div>

          {/* Testimonial */}
          <div className='mt-2'>
            <p className='text-[13px] text-[#4B5563] leading-relaxed mb-4 font-medium'>
              "Venturekit has been a game changer. I was feeling a little overwhelmed with starting my business but now I have everything laid out in front of me.
            </p>
            <p className='text-[13px] text-[#4B5563] leading-relaxed mb-6 font-medium'>
              I probably launched three months quicker and the business plan still gives me direction to this day."
            </p>
            <div className='flex items-center gap-3'>
              <img 
                src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150' 
                alt='Jason Malowaski' 
                className='h-10 w-10 rounded-full object-cover shadow-sm'
              />
              <div>
                <p className='text-[14px] font-bold text-[#111827] leading-tight'>Jason Malowaski</p>
                <p className='text-[12px] text-gray-500 mt-0.5 font-medium'>Mallow's Landscaping</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Checkout View (Step 2) ──────────────────────────────────────────────────
function CheckoutView({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [cardholderName, setCardholderName] = useState('')
  const [country, setCountry] = useState('Uzbekistan')
  const [isBusiness, setIsBusiness] = useState(false)
  const [saveInfo, setSaveInfo] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'gpay'>('card')

  const handleCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ')
    setCardNumber(formatted)
  }

  const handleExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) {
      setExpiry(digits.slice(0, 2) + ' / ' + digits.slice(2))
    } else {
      setExpiry(digits)
    }
  }

  const handleCvc = (val: string) => {
    setCvc(val.replace(/\D/g, '').slice(0, 3))
  }

  return (
    <div className='relative w-[960px] max-w-[98vw] max-h-[96vh] overflow-y-auto rounded-xl bg-white shadow-2xl animate-in fade-in slide-in-from-right-[5%] duration-300'>
      <div className='flex flex-col md:flex-row min-h-[600px]'>

        {/* ─── LEFT PANEL: Order Summary ─── */}
        <div className='md:w-[420px] flex-shrink-0 bg-[#FAFAFA] p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-200'>
          {/* Back arrow + Logo */}
          <div className='flex items-center gap-3 mb-8'>
            <button
              onClick={onBack}
              className='text-gray-400 hover:text-gray-600 transition-colors'
            >
              <ArrowLeft className='h-4 w-4' />
            </button>
            <div className='flex items-center gap-1.5'>
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
                <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' stroke='#10B981' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
              </svg>
              <span className='text-[15px] font-semibold text-gray-900'>Venturekit</span>
            </div>
          </div>

          {/* Title & Price */}
          <p className='text-[14px] text-gray-500 mb-1'>Subscribe to Venturekit Pro</p>
          <div className='flex items-baseline gap-1 mb-8'>
            <span className='text-[36px] font-bold text-gray-900 tracking-tight leading-none'>$96.00</span>
            <span className='text-[14px] text-gray-500 font-normal'>per</span>
            <span className='text-[14px] text-gray-500 font-normal'>year</span>
          </div>

          {/* Line items */}
          <div className='border-t border-gray-200 pt-5 space-y-4'>
            <div className='flex justify-between'>
              <div>
                <p className='text-[14px] font-medium text-gray-900'>Venturekit Pro</p>
                <p className='text-[12px] text-gray-400'>Unlock Pro features.</p>
                <p className='text-[12px] text-gray-400'>Billed annually</p>
              </div>
              <span className='text-[14px] text-gray-900 font-medium'>$228.00</span>
            </div>

            <div className='border-t border-gray-200 pt-4 flex justify-between'>
              <span className='text-[14px] text-gray-500'>Subtotal</span>
              <span className='text-[14px] text-gray-900 font-medium'>$228.00</span>
            </div>

            <div className='flex justify-between items-center'>
              <span className='inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#2E7D32] text-[12px] font-semibold px-3 py-1 rounded-full'>
                <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                  <path d='M13 2L3 14h9l-1 8 10-12h-9l1-8z' strokeLinecap='round' strokeLinejoin='round'/>
                </svg>
                Flash Sale Lifetime Discount
              </span>
              <span className='text-[14px] text-gray-900 font-medium'>-$132.00</span>
            </div>
            <p className='text-[12px] text-gray-400 -mt-2'>$132.00 off</p>

            <div className='border-t border-gray-200 pt-4 flex justify-between'>
              <span className='text-[14px] font-semibold text-gray-900'>Total due today</span>
              <span className='text-[14px] font-bold text-gray-900'>$96.00</span>
            </div>
          </div>
        </div>

        {/* ─── RIGHT PANEL: Payment Form ─── */}
        <div className='flex-1 p-8 md:p-10 overflow-y-auto'>
          {/* Link Pay */}
          <button className='w-full bg-[#00D66F] hover:bg-[#00C062] text-white font-semibold py-3 rounded-lg mb-3 text-[15px] flex items-center justify-center gap-2 transition-colors shadow-sm'>
            Оплата с
            <svg width='40' height='16' viewBox='0 0 40 16' fill='none'>
              <circle cx='8' cy='8' r='7' fill='white' fillOpacity='0.3'/>
              <circle cx='8' cy='8' r='4' fill='white'/>
              <text x='18' y='12' fill='white' fontSize='11' fontWeight='700' fontFamily='system-ui'>link</text>
            </svg>
          </button>

          <div className='flex items-center gap-3 my-5'>
            <div className='flex-1 h-px bg-gray-200' />
            <span className='text-[12px] text-gray-400 font-medium'>OR</span>
            <div className='flex-1 h-px bg-gray-200' />
          </div>

          <h3 className='text-[15px] font-semibold text-gray-900 mb-3'>Contact information</h3>
          <div className='mb-5'>
            <label className='block text-[12px] text-gray-500 mb-1.5'>Email</label>
            <input
              type='email'
              placeholder='email@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2.5 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00D66F]/30 focus:border-[#00D66F] transition-all'
            />
          </div>

          <h3 className='text-[15px] font-semibold text-gray-900 mb-3'>Payment method</h3>

          <div className='border border-gray-300 rounded-lg overflow-hidden mb-4'>
            <div className='flex border-b border-gray-200'>
              <button
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-[13px] font-medium transition-colors ${
                  paymentMethod === 'card'
                    ? 'bg-white text-gray-900 border-b-2 border-[#00D66F]'
                    : 'bg-gray-50 text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'card' ? 'border-[#00D66F]' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'card' && <div className='w-2 h-2 rounded-full bg-[#00D66F]' />}
                </div>
                <svg width='16' height='12' viewBox='0 0 24 18' fill='none' stroke='currentColor' strokeWidth='1.5'>
                  <rect x='1' y='1' width='22' height='16' rx='2' />
                  <line x1='1' y1='7' x2='23' y2='7' />
                </svg>
                Card
              </button>
              <button
                onClick={() => setPaymentMethod('gpay')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-[13px] font-medium transition-colors ${
                  paymentMethod === 'gpay'
                    ? 'bg-white text-gray-900 border-b-2 border-[#00D66F]'
                    : 'bg-gray-50 text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'gpay' ? 'border-[#00D66F]' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'gpay' && <div className='w-2 h-2 rounded-full bg-[#00D66F]' />}
                </div>
                Google Pay
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className='p-4 space-y-3'>
                <label className='block text-[12px] text-gray-500 mb-1'>Card information</label>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='1234 1234 1234 1234'
                    value={cardNumber}
                    onChange={(e) => handleCardNumber(e.target.value)}
                    maxLength={19}
                    inputMode='numeric'
                    className='w-full border border-gray-300 rounded-md px-3 py-2.5 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00D66F]/30 focus:border-[#00D66F] transition-all pr-24'
                  />
                  <div className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1'>
                    <div className='w-6 h-4 rounded-sm bg-[#1A1F71] flex items-center justify-center'>
                      <span className='text-white text-[6px] font-bold'>VISA</span>
                    </div>
                    <div className='w-6 h-4 rounded-sm bg-gradient-to-r from-[#EB001B] to-[#F79E1B] flex items-center justify-center'>
                      <div className='flex'><div className='w-2 h-2 rounded-full bg-[#EB001B] opacity-80' /><div className='w-2 h-2 rounded-full bg-[#F79E1B] opacity-80 -ml-1' /></div>
                    </div>
                    <div className='w-6 h-4 rounded-sm bg-[#006FCF] flex items-center justify-center'>
                      <span className='text-white text-[5px] font-bold'>AMEX</span>
                    </div>
                    <div className='w-6 h-4 rounded-sm bg-[#0079BE] flex items-center justify-center'>
                      <span className='text-white text-[5px] font-bold'>DC</span>
                    </div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <input type='text' placeholder='MM / YY' value={expiry} onChange={(e) => handleExpiry(e.target.value)}
                    maxLength={7} inputMode='numeric'
                    className='flex-1 border border-gray-300 rounded-md px-3 py-2.5 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00D66F]/30 focus:border-[#00D66F] transition-all' />
                  <div className='relative flex-1'>
                    <input type='text' placeholder='CVC' value={cvc} onChange={(e) => handleCvc(e.target.value)}
                      maxLength={3} inputMode='numeric'
                      className='w-full border border-gray-300 rounded-md px-3 py-2.5 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00D66F]/30 focus:border-[#00D66F] transition-all pr-10' />
                    <svg className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400' width='18' height='14' viewBox='0 0 24 18' fill='none' stroke='currentColor' strokeWidth='1.5'>
                      <rect x='1' y='1' width='22' height='16' rx='2' /><rect x='14' y='5' width='6' height='4' rx='1' fill='currentColor' fillOpacity='0.2' stroke='none' /><line x1='14' y1='12' x2='20' y2='12' strokeWidth='1' />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'gpay' && (
              <div className='p-6 text-center text-[13px] text-gray-500'>
                Click "Subscribe" to complete payment with Google Pay.
              </div>
            )}
          </div>

          <div className='mb-4'>
            <label className='block text-[12px] text-gray-500 mb-1.5'>Cardholder name</label>
            <input type='text' placeholder='Full name on card' value={cardholderName} onChange={(e) => setCardholderName(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2.5 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00D66F]/30 focus:border-[#00D66F] transition-all' />
          </div>

          <div className='mb-4'>
            <label className='block text-[12px] text-gray-500 mb-1.5'>Country or region</label>
            <div className='relative'>
              <select value={country} onChange={(e) => setCountry(e.target.value)}
                className='w-full border border-gray-300 rounded-md px-3 py-2.5 text-[14px] text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#00D66F]/30 focus:border-[#00D66F] transition-all bg-white'>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none' />
            </div>
          </div>

          <label className='flex items-center gap-2.5 mb-5 cursor-pointer'>
            <input type='checkbox' checked={isBusiness} onChange={(e) => setIsBusiness(e.target.checked)}
              className='w-4 h-4 rounded border-gray-300 text-[#00D66F] focus:ring-[#00D66F]/30' />
            <span className='text-[13px] text-gray-600'>I'm purchasing as a business</span>
          </label>

          <div className='border-t border-gray-200 pt-4 mb-5'>
            <label className='flex items-start gap-2.5 cursor-pointer'>
              <input type='checkbox' checked={saveInfo} onChange={(e) => setSaveInfo(e.target.checked)}
                className='w-4 h-4 rounded border-gray-300 text-[#00D66F] focus:ring-[#00D66F]/30 mt-0.5' />
              <div>
                <p className='text-[13px] font-semibold text-gray-900'>Save my information for faster checkout</p>
                <p className='text-[12px] text-gray-400 mt-0.5'>
                  Pay securely at Venturekit and everywhere <a href='#' className='text-[#635BFF] underline'>Link</a> is accepted.
                </p>
              </div>
            </label>
          </div>

          <button className='w-full bg-[#00D66F] hover:bg-[#00C062] text-white font-semibold py-3.5 rounded-lg text-[15px] transition-colors shadow-sm mb-3'>
            Subscribe
          </button>

          <p className='text-[11px] text-gray-400 text-center mb-6 leading-relaxed'>
            By subscribing, you authorize Venturekit to charge you according<br />
            to the terms until you cancel.
          </p>

          <div className='border-t border-gray-200 pt-5'>
            <div className='flex items-center gap-2.5 mb-4'>
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                <circle cx='12' cy='12' r='10' fill='#10B981'/>
                <path d='M8 12l3 3 5-5' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
              </svg>
              <p className='text-[12px] text-gray-500 leading-relaxed'>
                Venturekit will contribute <strong className='text-gray-700'>1% of your subscription</strong> to removing CO₂ from the atmosphere.
              </p>
            </div>
            <div className='flex items-center justify-center gap-3 text-[11px] text-gray-400'>
              <span>Powered by <strong className='text-gray-600 font-bold tracking-tight'>stripe</strong></span>
              <span className='text-gray-300'>|</span>
              <a href='#' className='text-gray-400 hover:text-gray-600 underline'>Terms</a>
              <a href='#' className='text-gray-400 hover:text-gray-600 underline'>Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Modal ──────────────────────────────────────────────────────────────
export function UpgradeModal() {
  const { isOpen, closeModal } = useUpgradeStore()
  const [view, setView] = useState<'promo' | 'checkout'>('promo')

  if (!isOpen) return null

  const handleClose = () => {
    closeModal()
    setView('promo') // reset to promo for next open
  }

  return (
    <div className='fixed inset-0 z-[200] flex items-center justify-center font-sans'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300'
        onClick={handleClose}
      />

      {/* Content */}
      {view === 'promo' ? (
        <PromoView onUpgrade={() => setView('checkout')} onClose={handleClose} />
      ) : (
        <CheckoutView onBack={() => setView('promo')} />
      )}
    </div>
  )
}
