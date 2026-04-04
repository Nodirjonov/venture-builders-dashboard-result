import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, ChevronDown, ShieldCheck, Search } from 'lucide-react'

/* ═══════════════════ COUNTRIES LIST ═══════════════════ */
const COUNTRIES = [
  { name: 'Australia', code: '+61', iso: 'AU' },
  { name: 'Brazil', code: '+55', iso: 'BR' },
  { name: 'Canada', code: '+1', iso: 'CA' },
  { name: 'China', code: '+86', iso: 'CN' },
  { name: 'France', code: '+33', iso: 'FR' },
  { name: 'Germany', code: '+49', iso: 'DE' },
  { name: 'India', code: '+91', iso: 'IN' },
  { name: 'Italy', code: '+39', iso: 'IT' },
  { name: 'Japan', code: '+81', iso: 'JP' },
  { name: 'Kazakhstan', code: '+7', iso: 'KZ' },
  { name: 'Mexico', code: '+52', iso: 'MX' },
  { name: 'Russia', code: '+7', iso: 'RU' },
  { name: 'South Korea', code: '+82', iso: 'KR' },
  { name: 'Spain', code: '+34', iso: 'ES' },
  { name: 'Turkey', code: '+90', iso: 'TR' },
  { name: 'Ukraine', code: '+380', iso: 'UA' },
  { name: 'United Arab Emirates', code: '+971', iso: 'AE' },
  { name: 'United Kingdom', code: '+44', iso: 'GB' },
  { name: 'United States', code: '+1', iso: 'US' },
  { name: 'Uzbekistan', code: '+998', iso: 'UZ' },
  { name: 'Vietnam', code: '+84', iso: 'VN' },
].sort((a, b) => a.name.localeCompare(b.name))

/* ═══════════════════ CUSTOM PHONE INPUT ═══════════════════ */
function CustomPhoneInput() {
  const [phoneNumber, setPhoneNumber] = useState('+998 ')
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES.find(c => c.iso === 'UZ')!)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle typing: only + and numbers, auto-detect flag
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    // Restrict to digits, spaces, and the plus sign
    val = val.replace(/[^\d+ \-()]/g, '')

    setPhoneNumber(val)

    // Auto-detect country based on the entered code
    const cleanVal = val.replace(/\s|-|\(|\)/g, '')
    if (cleanVal.startsWith('+')) {
      const matchingCountry = [...COUNTRIES]
        .sort((a, b) => b.code.length - a.code.length)
        .find(c => cleanVal.startsWith(c.code))
      
      if (matchingCountry) {
        setSelectedCountry(matchingCountry)
      }
    }
  }

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.code.includes(searchQuery)
  )

  const isFilled = phoneNumber.length > 5

  return (
    <div className='relative' ref={dropdownRef}>
      <div className={`relative flex items-center h-[46px] border rounded-[8px] transition-all focus-within:ring-2 focus-within:ring-[#00A676] focus-within:border-[#00A676] overflow-hidden ${isFilled ? 'bg-[#EEF2FC]/50 border-[#E2E8F0]' : 'bg-white border-gray-300'}`}>
        
        {/* Country Selector Trigger */}
        <button
          type='button'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className='absolute left-1.5 flex items-center justify-center gap-1.5 z-10 w-[60px] h-[34px] hover:bg-slate-200/50 rounded-md transition-colors'
        >
          <img 
            src={`https://flagcdn.com/w20/${selectedCountry.iso.toLowerCase()}.png`} 
            alt={selectedCountry.name}
            className='w-[22px] h-auto rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.05)]' 
          />
          <ChevronDown className='h-3.5 w-3.5 text-slate-500' />
        </button>

        {/* Vertical divider */}
        <div className='absolute left-[72px] w-[1px] h-5 bg-slate-200' />

        <input
          type='tel'
          value={phoneNumber}
          onChange={handlePhoneChange}
          className='w-full h-full bg-transparent pl-[86px] pr-4 text-[15px] text-slate-900 focus:outline-none'
          placeholder='+1 555-0123'
        />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className='absolute left-0 top-full mt-2 w-full sm:w-[320px] bg-white border border-slate-200 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200'>
          <div className='p-2.5 border-b border-slate-100 bg-slate-50/50'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
              <input 
                type='text'
                placeholder='Search by country or code...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-[14px] text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-300 shadow-sm'
                autoFocus
              />
            </div>
          </div>
          <div className='max-h-[260px] overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar'>
            {filteredCountries.length > 0 ? filteredCountries.map(country => (
              <button
                key={country.iso}
                onClick={() => {
                  setSelectedCountry(country)
                  if (!phoneNumber.startsWith(country.code)) {
                    setPhoneNumber(country.code + ' ')
                  }
                  setIsDropdownOpen(false)
                  setSearchQuery('')
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-left rounded-lg text-[14.5px] transition-colors ${
                  selectedCountry.iso === country.iso 
                    ? 'bg-slate-100/80 font-medium text-slate-900' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className='flex items-center gap-3.5'>
                  <img 
                    src={`https://flagcdn.com/w20/${country.iso.toLowerCase()}.png`} 
                    alt={country.name}
                    className='w-[22px] h-auto rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.05)]' 
                  />
                  <span>{country.name}</span>
                </div>
                <span className='text-slate-400 font-medium'>{country.code}</span>
              </button>
            )) : (
              <div className='px-4 py-6 text-center text-sm text-slate-500'>
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ContactFaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='border-b border-gray-200 py-5'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between w-full text-left group'
      >
        <span className='text-[15px] font-medium text-gray-700 group-hover:text-gray-900 transition-colors'>
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className='grid transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]'
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className='overflow-hidden'>
          <p className='pt-4 text-[14px] text-gray-500 leading-relaxed pr-8'>
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FormationContact({ onBack }: { onBack: () => void }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div className='max-w-[720px] mx-auto px-4 py-8 pb-32'>
      {/* Back Button */}
      <button
        onClick={onBack}
        className='flex items-center gap-2 text-[14px] font-medium text-slate-500 hover:text-slate-900 transition-colors mb-8'
      >
        <ArrowLeft className='h-4 w-4' />
        Back
      </button>

      {/* Header */}
      <h1 className='text-[26px] font-semibold text-slate-900 mb-3 tracking-[-0.01em]'>
        Who is the main contact for this new business?
      </h1>
      <p className='text-[15px] text-slate-500 mb-10'>
        This is who we'll contact if more info is needed during the filing process.
      </p>

      {/* Form Fields */}
      <div className='space-y-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          <div className='flex flex-col gap-2'>
            <label className='text-[14px] font-medium text-slate-700'>First Name</label>
            <input
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full border rounded-[8px] px-3.5 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#00A676] focus:border-[#00A676] transition-all ${
                firstName.length > 0 ? 'bg-[#EEF2FC]/50 border-[#E2E8F0]' : 'bg-white border-gray-300'
              }`}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-[14px] font-medium text-slate-700'>Last Name</label>
            <input
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full border rounded-[8px] px-3.5 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#00A676] focus:border-[#00A676] transition-all ${
                lastName.length > 0 ? 'bg-[#EEF2FC]/50 border-[#E2E8F0]' : 'bg-white border-gray-300'
              }`}
            />
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-[14px] font-medium text-slate-700'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border rounded-[8px] px-3.5 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#00A676] focus:border-[#00A676] transition-all ${
              email.length > 0 ? 'bg-[#EEF2FC]/50 border-[#E2E8F0]' : 'bg-white border-gray-300'
            }`}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-[14px] font-medium text-slate-700'>Phone Number</label>
          <CustomPhoneInput />
        </div>
      </div>

      {/* Submit Button */}
      <button className={`w-full mt-10 py-3.5 rounded-[8px] font-semibold text-[15px] transition-all ${
        firstName && lastName && email ? 'bg-[#222222] text-white hover:bg-black shadow-sm' : 'bg-slate-300 text-white cursor-not-allowed'
      }`}>
        Next
      </button>

      {/* Security Info Box */}
      <div className='mt-6 bg-[#F8FAFC] rounded-[10px] p-5 flex gap-4 items-start border border-[#F1F5F9]'>
        <div className='mt-0.5 shrink-0'>
          <ShieldCheck className='h-6 w-6 text-slate-400' strokeWidth={1.5} />
        </div>
        <div>
          <h4 className='text-[14px] font-semibold text-slate-900 mb-0.5 tracking-tight'>
            Your information is secure
          </h4>
          <p className='text-[13px] text-slate-500 leading-relaxed'>
            We never give these details to other organizations except for filing purposes.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className='mt-12'>
        <ContactFaqItem
          question='What will this contact information be used for?'
          answer='This information will be used to generate the necessary documents for your business formation.'
        />
        <ContactFaqItem
          question='Can I change this contact information later?'
          answer='Yes, you can change this contact information later. Please, contact our support team to make the changes. Also, take into account that once the documents are filed, you will not be able to change the contact information in the state.'
        />
        <ContactFaqItem
          question='Will my contact information be shared with other organizations?'
          answer='No, your contact information will not be shared with other organizations except for filing purposes.'
        />
      </div>
    </div>
  )
}

