import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Settings, Crown } from 'lucide-react'
import { useUpgradeStore } from '@/stores/upgrade-store'

/* ═══════════════════ TYPES ═══════════════════ */

type RadarTab = 'overview' | 'news' | 'events' | 'social-media' | 'competitor-monitoring'

interface RadarPageProps {
  defaultTab?: RadarTab
}

/* ═══════════════════ RADAR ILLUSTRATION ═══════════════════ */

function RadarIllustration() {
  return (
    <div className='relative w-[260px] h-[200px]'>
      <svg viewBox='0 0 260 200' className='absolute inset-0 w-full h-full'>
        <circle cx='160' cy='110' r='80' fill='none' stroke='#E0F2FE' strokeWidth='1.5' />
        <circle cx='160' cy='110' r='55' fill='none' stroke='#E0F2FE' strokeWidth='1' />
        <circle cx='160' cy='110' r='30' fill='none' stroke='#E0F2FE' strokeWidth='1' />
        <line x1='160' y1='30' x2='160' y2='190' stroke='#E0F2FE' strokeWidth='1' />
        <line x1='80' y1='110' x2='240' y2='110' stroke='#E0F2FE' strokeWidth='1' />
        <polyline points='90,100 120,85 140,95 160,60 180,75 200,55 220,70' fill='none' stroke='#38BDF8' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        <circle cx='160' cy='60' r='5' fill='#38BDF8' />
        <circle cx='160' cy='60' r='3' fill='white' />
        <rect x='130' y='55' width='30' height='20' rx='3' fill='white' stroke='#E5E7EB' strokeWidth='1' opacity='0.9' />
        <line x1='135' y1='62' x2='155' y2='62' stroke='#38BDF8' strokeWidth='2' />
        <line x1='135' y1='67' x2='148' y2='67' stroke='#E5E7EB' strokeWidth='1.5' />
        <line x1='135' y1='71' x2='151' y2='71' stroke='#E5E7EB' strokeWidth='1.5' />
        <rect x='200' y='60' width='28' height='22' rx='3' fill='white' stroke='#E5E7EB' strokeWidth='1' opacity='0.9' />
        <rect x='206' y='66' width='16' height='10' rx='2' fill='#F3F4F6' />
        <rect x='145' y='130' width='18' height='4' rx='2' fill='#EF4444' opacity='0.6' />
      </svg>
      <div className='absolute bottom-4 left-[110px] text-[13px] font-medium text-[#0EA5E9]'>31</div>
    </div>
  )
}

/* ═══════════════════ AI IDEA GENERATOR ═══════════════════ */

const IDEA_POOLS: Record<string, string[][]> = {
  business: [
    ['SaaS business models', 'Subscription economy trends', 'B2B marketplace innovations'],
    ['Digital transformation strategies', 'Enterprise automation solutions', 'Business process optimization'],
    ['Revenue diversification models', 'Startup monetization strategies', 'Freemium conversion tactics'],
  ],
  tech: [
    ['Edge computing applications', 'AI-powered dev tools', 'Low-code platform adoption'],
    ['Quantum computing use cases', 'Blockchain enterprise solutions', 'IoT smart infrastructure'],
    ['Machine learning in healthcare', 'Computer vision retail analytics', 'NLP customer service bots'],
  ],
  finance: [
    ['Embedded finance trends', 'DeFi institutional adoption', 'ESG investment strategies'],
    ['Cross-border payment innovations', 'Neobank expansion strategies', 'Open banking APIs'],
    ['Wealth management automation', 'Insurtech disruption', 'Real-time fraud detection'],
  ],
  health: [
    ['Telemedicine 2.0 platforms', 'Digital therapeutics market', 'Wearable health monitoring'],
    ['Personalized medicine trends', 'Mental health tech solutions', 'Remote patient monitoring'],
    ['Health data interoperability', 'AI diagnostic tools', 'Genomics consumer products'],
  ],
  default: [
    ['Market trend analysis tools', 'Consumer behavior shifts', 'Industry disruption patterns'],
    ['Competitive intelligence platforms', 'Emerging market opportunities', 'Digital innovation benchmarks'],
    ['Growth hacking strategies', 'Customer acquisition channels', 'Brand positioning frameworks'],
  ],
}

function generateIdeas(input: string): string[] {
  const lower = input.toLowerCase()
  let pool: string[][] = IDEA_POOLS.default
  if (/business|startup|enterprise|company|saas|b2b/i.test(lower)) pool = IDEA_POOLS.business
  else if (/tech|ai|software|app|code|dev|digital/i.test(lower)) pool = IDEA_POOLS.tech
  else if (/financ|bank|money|payment|invest|crypto|fintech/i.test(lower)) pool = IDEA_POOLS.finance
  else if (/health|medical|pharma|wellness|care|rehab/i.test(lower)) pool = IDEA_POOLS.health
  const setIdx = Math.floor(Math.random() * pool.length)
  return pool[setIdx].map(idea => Math.random() > 0.5 ? `${idea} for ${input}` : idea)
}

/* ═══════════════════ MANAGE KEYWORDS SIDEBAR ═══════════════════ */

function ManageKeywordsSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [keywords, setKeywords] = useState<string[]>([])
  const [generating, setGenerating] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  if (!open) return null

  function handleAdd() {
    const trimmed = searchTerm.trim()
    if (!trimmed || keywords.includes(trimmed)) return
    setKeywords(prev => [...prev, trimmed])
    setSearchTerm('')
    setSuggestions([])
  }

  function handleGenerate() {
    const base = searchTerm.trim() || (keywords.length > 0 ? keywords[keywords.length - 1] : '')
    if (!base) return
    setGenerating(true)
    setSuggestions([])
    setTimeout(() => {
      setSuggestions(generateIdeas(base))
      setGenerating(false)
    }, 1200)
  }

  function handleAccept(s: string) {
    if (!keywords.includes(s)) setKeywords(prev => [...prev, s])
    setSuggestions(prev => prev.filter(x => x !== s))
  }

  return (
    <div className='fixed inset-0 z-50 flex justify-end'>
      <div className='absolute inset-0 bg-black/20' onClick={onClose} />
      <div className='relative w-[340px] bg-white shadow-2xl border-l border-gray-200 flex flex-col animate-in slide-in-from-right duration-200'>
        {/* Header */}
        <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
          <h2 className='text-[16px] font-semibold text-[#111827]'>Manage keywords</h2>
          <button onClick={onClose} className='rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors'>
            <svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M18 6L6 18M6 6l12 12' /></svg>
          </button>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto px-5 py-4'>
          <label className='text-[13px] font-medium text-[#374151] mb-1.5 block'>Search Term</label>
          <input
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value.replace(/[a-zA-Zа-яА-ЯёЁ]/g, ''))}
            onKeyDown={e => { if (e.key === 'Enter') handleAdd() }}
            placeholder='e.g. AI startups, fintech trends...'
            className='w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all'
          />

          {/* + Add */}
          <button onClick={handleAdd} disabled={!searchTerm.trim()} className='mt-3 w-full rounded-lg bg-emerald-500 py-2.5 text-[13px] font-semibold text-white hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1.5'>
            <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'><path d='M12 5v14M5 12h14' /></svg>
            Add
          </button>

          {/* Generate Ideas */}
          <button onClick={handleGenerate} disabled={generating || (!searchTerm.trim() && keywords.length === 0)} className='mt-2 w-full rounded-lg border border-gray-200 bg-white py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1.5'>
            {generating ? (
              <svg className='h-4 w-4 animate-spin' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M21 12a9 9 0 11-6.219-8.56' /></svg>
            ) : (
              <span className='text-[15px]'>✨</span>
            )}
            {generating ? 'Generating...' : 'Generate ideas'}
          </button>

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <div className='mt-4 space-y-2'>
              <p className='text-[11px] font-semibold uppercase text-gray-400 tracking-wide'>AI Suggestions</p>
              {suggestions.map((s, i) => (
                <div key={i} className='flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5'>
                  <span className='text-[13px] text-gray-800 flex-1'>{s}</span>
                  <div className='flex items-center gap-1 ml-2'>
                    <button onClick={() => handleAccept(s)} className='rounded p-1 text-emerald-600 hover:bg-emerald-100 transition-colors' title='Add'>
                      <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'><path d='M12 5v14M5 12h14' /></svg>
                    </button>
                    <button onClick={() => setSuggestions(prev => prev.filter((_, idx) => idx !== i))} className='rounded p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors' title='Dismiss'>
                      <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'><path d='M18 6L6 18M6 6l12 12' /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {keywords.length > 0 && <div className='my-4 h-px bg-gray-100' />}

          {/* Keyword List */}
          {keywords.map(kw => (
            <div key={kw} className='flex items-center justify-between rounded-lg border border-gray-100 bg-white px-3 py-2.5 mb-2 group hover:border-gray-200 transition-colors'>
              <span className='text-[14px] text-[#111827]'>{kw}</span>
              <button onClick={() => setKeywords(prev => prev.filter(k => k !== kw))} className='rounded p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors' title='Delete'>
                <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
                  <path d='M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2' />
                </svg>
              </button>
            </div>
          ))}

          {keywords.length === 0 && !suggestions.length && (
            <div className='mt-6 text-center'>
              <p className='text-[13px] text-gray-400'>No keywords yet. Add one or let AI generate ideas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════ TAB CONTENT ═══════════════════ */

function OverviewContent() {
  return (
    <>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-[22px] font-semibold text-[#111827]'>Radar Overview</h1>
      </div>
      <RadarContentCard />
    </>
  )
}

function NewsContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-[22px] font-semibold text-[#111827]'>News</h1>
        <button onClick={() => setSidebarOpen(true)} className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111827] text-white text-[13px] font-medium hover:bg-[#1F2937] transition-colors'>
          <Settings className='h-4 w-4' />
          Manage topics
        </button>
      </div>
      <RadarContentCard />
      <ManageKeywordsSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}

function EventsContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-[22px] font-semibold text-[#111827]'>Events</h1>
        <button onClick={() => setSidebarOpen(true)} className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111827] text-white text-[13px] font-medium hover:bg-[#1F2937] transition-colors'>
          <Settings className='h-4 w-4' />
          Manage topics
        </button>
      </div>
      <RadarContentCard />
      <ManageKeywordsSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}

/* ═══════════════════ SOCIAL MEDIA TYPES & DATA ═══════════════════ */

interface SocialAlert {
  id: string
  name: string
  keywords: string[]
  sources: string[]
  languages: string[]
}

const SOCIAL_SOURCES = [
  { id: 'youtube', label: 'Youtube', color: '#DC2626', icon: '▶' },
  { id: 'facebook', label: 'Facebook', color: '#1877F2', icon: 'f' },
  { id: 'instagram', label: 'Instagram', color: '#E4405F', icon: '📷' },
  { id: 'linkedin', label: 'LinkedIn', color: '#0A66C2', icon: 'in' },
  { id: 'twitter', label: 'Twitter', color: '#1DA1F2', icon: '𝕏' },
  { id: 'tiktok', label: 'TikTok', color: '#000000', icon: '♪' },
  { id: 'reddit', label: 'Reddit', color: '#FF5700', icon: '⊕' },
  { id: 'pinterest', label: 'Pinterest', color: '#E60023', icon: '⊙' },
]

const ALL_LANGUAGES = ['English', 'French', 'German', 'Spanish', 'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Arabic', 'Hindi', 'Korean']

function SocialMediaContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [alerts, setAlerts] = useState<SocialAlert[]>([])

  // Sidebar form state
  const [formName, setFormName] = useState('')
  const [formKeywordInput, setFormKeywordInput] = useState('')
  const [formKeywords, setFormKeywords] = useState<string[]>([])
  const [formSources, setFormSources] = useState<string[]>([])
  const [formLanguages, setFormLanguages] = useState<string[]>(['English'])
  const [langDropdown, setLangDropdown] = useState(false)

  function resetForm() {
    setFormName(''); setFormKeywordInput(''); setFormKeywords([]); setFormSources([]); setFormLanguages(['English']); setLangDropdown(false)
  }

  function handleAddKeyword() {
    const parts = formKeywordInput.split(',').map(s => s.trim()).filter(Boolean)
    const newKws = parts.filter(p => !formKeywords.includes(p))
    if (newKws.length > 0 && formKeywords.length < 3) {
      setFormKeywords(prev => [...prev, ...newKws].slice(0, 3))
    }
    setFormKeywordInput('')
  }

  function toggleSource(id: string) {
    setFormSources(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  function toggleLanguage(lang: string) {
    setFormLanguages(prev => {
      if (prev.includes(lang)) return prev.filter(l => l !== lang)
      if (prev.length >= 2) return prev
      return [...prev, lang]
    })
  }

  function handleSubmitAlert() {
    if (!formName.trim()) return
    const newAlert: SocialAlert = {
      id: Date.now().toString(),
      name: formName.trim(),
      keywords: formKeywords,
      sources: formSources,
      languages: formLanguages,
    }
    setAlerts(prev => [...prev, newAlert])
    resetForm()
    setSidebarOpen(false)
  }

  return (
    <>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-[22px] font-semibold text-[#111827]'>Social Media</h1>
        <button onClick={() => { resetForm(); setSidebarOpen(true) }} className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111827] text-white text-[13px] font-medium hover:bg-[#1F2937] transition-colors'>
          <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M12 5v14M5 12h14' /></svg>
          Add alert
        </button>
      </div>
      <RadarContentCard />

      {/* Saved Alerts */}
      {alerts.length > 0 && (
        <div className='mt-6 space-y-3'>
          <p className='text-[13px] font-semibold uppercase text-gray-400 tracking-wide'>Active Alerts</p>
          {alerts.map(a => (
            <div key={a.id} className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
              <div className='flex items-center justify-between mb-2'>
                <h3 className='text-[15px] font-semibold text-[#111827]'>{a.name}</h3>
                <button onClick={() => setAlerts(prev => prev.filter(x => x.id !== a.id))} className='text-gray-300 hover:text-red-500 transition-colors'>
                  <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'><path d='M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2' /></svg>
                </button>
              </div>
              <div className='flex flex-wrap gap-1.5'>
                {a.keywords.map(kw => <span key={kw} className='rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700'>{kw}</span>)}
                {a.sources.map(s => {
                  const src = SOCIAL_SOURCES.find(x => x.id === s)
                  return src ? <span key={s} className='rounded-full px-2.5 py-0.5 text-[11px] font-medium text-white' style={{ backgroundColor: src.color }}>{src.label}</span> : null
                })}
                {a.languages.map(l => <span key={l} className='rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700'>{l}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Alert Sidebar */}
      {sidebarOpen && (
        <div className='fixed inset-0 z-50 flex justify-end'>
          <div className='absolute inset-0 bg-black/20' onClick={() => setSidebarOpen(false)} />
          <div className='relative w-[340px] bg-white shadow-2xl border-l border-gray-200 flex flex-col animate-in slide-in-from-right duration-200'>
            {/* Header */}
            <div className='flex items-center justify-end px-4 pt-3'>
              <button onClick={() => setSidebarOpen(false)} className='rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors'>
                <svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M18 6L6 18M6 6l12 12' /></svg>
              </button>
            </div>

            {/* Content */}
            <div className='flex-1 overflow-y-auto px-5 pb-20'>
              {/* Name */}
              <div className='mb-4'>
                <label className='text-[13px] font-bold text-[#111827] block'>Name</label>
                <p className='text-[12px] text-gray-400 mb-1.5'>Provide a name to identify this alert</p>
                <input type='text' value={formName} onChange={e => setFormName(e.target.value.replace(/[0-9]/g, ''))} className='w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all' />
              </div>

              {/* Keywords */}
              <div className='mb-4'>
                <label className='text-[13px] font-bold text-[#111827] block'>Keywords</label>
                <p className='text-[12px] text-gray-400 mb-1.5'>Provide keywords to track in social media (separate with commas)</p>
                {formKeywords.length > 0 && (
                  <div className='flex flex-wrap gap-1.5 mb-2'>
                    {formKeywords.map(kw => (
                      <span key={kw} className='inline-flex items-center gap-1 rounded-md bg-emerald-500 px-2.5 py-1 text-[12px] font-medium text-white'>
                        {kw}
                        <button onClick={() => setFormKeywords(prev => prev.filter(k => k !== kw))} className='hover:bg-emerald-600 rounded-sm'>×</button>
                      </span>
                    ))}
                  </div>
                )}
                <div className='flex items-center gap-0'>
                  <input type='text' value={formKeywordInput} onChange={e => setFormKeywordInput(e.target.value.replace(/[a-zA-Zа-яА-ЯёЁ]/g, ''))} onKeyDown={e => { if (e.key === 'Enter') handleAddKeyword() }} placeholder='Enter keyword...' className='flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all' />
                </div>
                <p className='text-right text-[11px] text-gray-400 mt-1'>{formKeywords.length}/3</p>
              </div>

              {/* Sources */}
              <div className='mb-4'>
                <label className='text-[13px] font-bold text-[#111827] block'>Sources</label>
                <p className='text-[12px] text-gray-400 mb-2'>Select which social media platforms you want to track</p>
                <div className='grid grid-cols-2 gap-2'>
                  {SOCIAL_SOURCES.map(src => {
                    const active = formSources.includes(src.id)
                    return (
                      <button key={src.id} onClick={() => toggleSource(src.id)} className={'flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-[13px] font-medium transition-all ' + (active ? 'border-emerald-500 bg-emerald-50 text-[#111827]' : 'border-gray-200 text-gray-600 hover:border-gray-300')}>
                        <span className='flex h-5 w-5 items-center justify-center rounded text-[10px] text-white font-bold' style={{ backgroundColor: src.color }}>{src.icon}</span>
                        {src.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Languages */}
              <div className='mb-4'>
                <label className='text-[13px] font-bold text-[#111827] block'>Languages</label>
                <p className='text-[12px] text-gray-400 mb-1.5'>Select the languages you want to get notifications for</p>
                <div className='relative'>
                  <div onClick={() => setLangDropdown(!langDropdown)} className='flex flex-wrap items-center gap-1.5 min-h-[40px] rounded-lg border border-gray-200 bg-white px-3 py-2 cursor-pointer focus:outline-none hover:border-gray-300 transition-colors'>
                    {formLanguages.map(l => (
                      <span key={l} className='inline-flex items-center gap-1 rounded-md bg-emerald-500 px-2.5 py-1 text-[12px] font-medium text-white'>
                        {l}
                        <button onClick={e => { e.stopPropagation(); toggleLanguage(l) }} className='hover:bg-emerald-600 rounded-sm'>×</button>
                      </span>
                    ))}
                    {formLanguages.length === 0 && <span className='text-[13px] text-gray-400'>Select languages...</span>}
                  </div>
                  <p className='text-right text-[11px] text-gray-400 mt-0.5'>{formLanguages.length}/2</p>
                  {langDropdown && (
                    <div className='absolute left-0 right-0 top-full mt-1 z-10 max-h-[180px] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg'>
                      {ALL_LANGUAGES.filter(l => !formLanguages.includes(l)).map(l => (
                        <button key={l} onClick={() => { toggleLanguage(l); if (formLanguages.length >= 1) setLangDropdown(false) }} className='w-full px-3 py-2 text-left text-[13px] text-gray-700 hover:bg-gray-50 transition-colors'>
                          {l}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Add Button Fixed Bottom */}
            <div className='absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100'>
              <button onClick={handleSubmitAlert} disabled={!formName.trim()} className='w-full rounded-lg bg-[#111827] py-3 text-[14px] font-semibold text-white hover:bg-[#1F2937] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1.5'>
                <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'><path d='M12 5v14M5 12h14' /></svg>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const COMPETITOR_PLATFORMS = [
  { id: 'facebook', icon: 'f', color: '#1877F2' },
  { id: 'twitter', icon: '𝕏', color: '#1DA1F2' },
  { id: 'linkedin', icon: 'in', color: '#0A66C2' },
  { id: 'instagram', icon: '📷', color: '#E4405F' },
]

interface Competitor {
  id: string
  name: string
  urls: string[]
  languages: string[]
}

function CompetitorMonitoringContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [competitors, setCompetitors] = useState<Competitor[]>([])

  const [cName, setCName] = useState('')
  const [cUrls, setCUrls] = useState<string[]>([])
  const [cUrlInput, setCUrlInput] = useState('')
  const [cUrlError, setCUrlError] = useState('')
  const [cLanguages, setCLanguages] = useState<string[]>(['English'])
  const [cLangDropdown, setCLangDropdown] = useState(false)

  function resetForm() {
    setCName(''); setCUrls([]); setCUrlInput(''); setCUrlError(''); setCLanguages(['English']); setCLangDropdown(false)
  }

  function isValidUrl(str: string): boolean {
    try { const u = new URL(str); return u.protocol === 'http:' || u.protocol === 'https:' } catch { return false }
  }

  function addUrl() {
    const trimmed = cUrlInput.trim()
    if (!trimmed || cUrls.includes(trimmed)) return
    if (!isValidUrl(trimmed)) { setCUrlError('Please enter a valid URL (e.g. https://facebook.com/page)'); return }
    setCUrlError('')
    setCUrls(prev => [...prev, trimmed])
    setCUrlInput('')
  }

  function toggleCLang(lang: string) {
    setCLanguages(prev => {
      if (prev.includes(lang)) return prev.filter(l => l !== lang)
      if (prev.length >= 2) return prev
      return [...prev, lang]
    })
  }

  function handleSubmit() {
    if (!cName.trim()) return
    setCompetitors(prev => [...prev, { id: Date.now().toString(), name: cName.trim(), urls: cUrls, languages: cLanguages }])
    resetForm()
    setSidebarOpen(false)
  }

  return (
    <>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-[22px] font-semibold text-[#111827]'>Competitor Monitoring</h1>
        <button onClick={() => { resetForm(); setSidebarOpen(true) }} className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111827] text-white text-[13px] font-medium hover:bg-[#1F2937] transition-colors'>
          <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
            <circle cx='8.5' cy='7' r='4' />
            <line x1='20' y1='8' x2='20' y2='14' />
            <line x1='23' y1='11' x2='17' y2='11' />
          </svg>
          Add competitor
        </button>
      </div>
      <RadarContentCard />

      {/* Saved Competitors */}
      {competitors.length > 0 && (
        <div className='mt-6 space-y-3'>
          <p className='text-[13px] font-semibold uppercase text-gray-400 tracking-wide'>Competitors</p>
          {competitors.map(c => (
            <div key={c.id} className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
              <div className='flex items-center justify-between mb-2'>
                <h3 className='text-[15px] font-semibold text-[#111827]'>{c.name}</h3>
                <button onClick={() => setCompetitors(prev => prev.filter(x => x.id !== c.id))} className='text-gray-300 hover:text-red-500 transition-colors'>
                  <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'><path d='M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2' /></svg>
                </button>
              </div>
              <div className='flex flex-wrap gap-1.5'>
                {c.urls.map(u => <span key={u} className='rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600 truncate max-w-[200px]'>{u}</span>)}
                {c.languages.map(l => <span key={l} className='rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700'>{l}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Competitor Sidebar */}
      {sidebarOpen && (
        <div className='fixed inset-0 z-50 flex justify-end'>
          <div className='absolute inset-0 bg-black/20' onClick={() => setSidebarOpen(false)} />
          <div className='relative w-[340px] bg-white shadow-2xl border-l border-gray-200 flex flex-col animate-in slide-in-from-right duration-200'>
            {/* Header */}
            <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
              <h2 className='text-[16px] font-semibold text-[#111827]'>Competitor Monitoring</h2>
              <button onClick={() => setSidebarOpen(false)} className='rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors'>
                <svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M18 6L6 18M6 6l12 12' /></svg>
              </button>
            </div>

            {/* Content */}
            <div className='flex-1 overflow-y-auto px-5 py-4 pb-20'>
              {/* Name */}
              <div className='mb-5'>
                <label className='text-[13px] font-bold text-[#111827] block'>Name</label>
                <p className='text-[12px] text-gray-400 mb-1.5'>Provide a name to identify this competitor</p>
                <input type='text' value={cName} onChange={e => setCName(e.target.value.replace(/[0-9]/g, ''))} className='w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 transition-all' />
              </div>

              {/* URL */}
              <div className='mb-5'>
                <div className='flex items-center gap-2 mb-0.5'>
                  <label className='text-[13px] font-bold text-[#111827]'>URL</label>
                  <div className='flex items-center gap-1'>
                    {COMPETITOR_PLATFORMS.map(p => (
                      <span key={p.id} className='flex h-5 w-5 items-center justify-center rounded-full text-[9px] text-white font-bold' style={{ backgroundColor: p.color }}>{p.icon}</span>
                    ))}
                  </div>
                </div>
                <p className='text-[12px] text-gray-400 mb-2'>Provide the social media profile URL (Only business profiles are supported)</p>

                {/* Saved URLs */}
                {cUrls.map((url, i) => (
                  <div key={i} className='flex items-center gap-1 mb-2'>
                    <div className='flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-[13px] text-gray-600 truncate'>{url}</div>
                    <button onClick={() => setCUrls(prev => prev.filter((_, idx) => idx !== i))} className='rounded p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors'>
                      <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'><path d='M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2' /></svg>
                    </button>
                  </div>
                ))}

                {/* Add URL input */}
                <div className='flex items-center gap-1'>
                  <input type='text' value={cUrlInput} onChange={e => { setCUrlInput(e.target.value); setCUrlError('') }} onKeyDown={e => { if (e.key === 'Enter') addUrl() }} placeholder='Enter Social Page URL' className={'flex-1 rounded-lg border bg-white px-3 py-2 text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ' + (cUrlError ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : 'border-gray-200 focus:ring-emerald-200 focus:border-emerald-300')} />
                  <button onClick={() => setCUrls(prev => prev.filter((_, idx) => idx !== prev.length - 1))} className='rounded p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 pointer-events-none'>
                    <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'><path d='M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2' /></svg>
                  </button>
                </div>
                {cUrlError && <p className='text-[11px] text-red-500 mt-1'>{cUrlError}</p>}
                <button onClick={addUrl} disabled={!cUrlInput.trim()} className='mt-2 w-full rounded-lg border border-gray-200 bg-white py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1'>
                  <svg className='h-3.5 w-3.5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'><path d='M12 5v14M5 12h14' /></svg>
                  Add a social page
                </button>
              </div>

              {/* Languages */}
              <div className='mb-4'>
                <label className='text-[13px] font-bold text-[#111827] block'>Languages</label>
                <p className='text-[12px] text-gray-400 mb-1.5'>Select the languages you want to get notifications for</p>
                <div className='relative'>
                  <div onClick={() => setCLangDropdown(!cLangDropdown)} className='flex flex-wrap items-center gap-1.5 min-h-[40px] rounded-lg border border-gray-200 bg-white px-3 py-2 cursor-pointer hover:border-gray-300 transition-colors'>
                    {cLanguages.map(l => (
                      <span key={l} className='inline-flex items-center gap-1 rounded-md bg-emerald-500 px-2.5 py-1 text-[12px] font-medium text-white'>
                        {l}
                        <button onClick={e => { e.stopPropagation(); toggleCLang(l) }} className='hover:bg-emerald-600 rounded-sm'>×</button>
                      </span>
                    ))}
                    {cLanguages.length === 0 && <span className='text-[13px] text-gray-400'>Select languages...</span>}
                  </div>
                  <p className='text-right text-[11px] text-gray-400 mt-0.5'>{cLanguages.length}/2</p>
                  {cLangDropdown && (
                    <div className='absolute left-0 right-0 top-full mt-1 z-10 max-h-[180px] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg'>
                      {ALL_LANGUAGES.filter(l => !cLanguages.includes(l)).map(l => (
                        <button key={l} onClick={() => { toggleCLang(l); if (cLanguages.length >= 1) setCLangDropdown(false) }} className='w-full px-3 py-2 text-left text-[13px] text-gray-700 hover:bg-gray-50 transition-colors'>
                          {l}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className='absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100'>
              <button onClick={handleSubmit} disabled={!cName.trim()} className='w-full rounded-lg bg-[#111827] py-3 text-[14px] font-semibold text-white hover:bg-[#1F2937] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1.5'>
                <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'><path d='M12 5v14M5 12h14' /></svg>
                Add competitor
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ═══════════════════ SHARED CARD ═══════════════════ */

function RadarContentCard() {
  const { openModal } = useUpgradeStore()
  return (
    <div className='space-y-0'>
      <div className='bg-[#FAFAF8] rounded-2xl border border-[#F0F0EC] p-4 sm:p-6 md:p-8'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-4'>
          <div className='max-w-full md:max-w-[520px]'>
            <h2 className='text-[20px] font-bold text-[#111827] mb-3'>Keep a birds eye view of your industry</h2>
            <p className='text-[14px] text-[#6B7280] leading-relaxed'>Get the latest news, events and social media mentions related to your business. Stay informed and ahead of the competition.</p>
          </div>
          <div className='hidden md:block'>
            <RadarIllustration />
          </div>
        </div>
      </div>
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

/* ═══════════════════ MAIN RADAR COMPONENT ═══════════════════ */

export function Radar({ defaultTab = 'overview' }: RadarPageProps) {
  const [_activeTab] = useState<RadarTab>(defaultTab)

  const renderContent = () => {
    switch (_activeTab) {
      case 'overview': return <OverviewContent />
      case 'news': return <NewsContent />
      case 'events': return <EventsContent />
      case 'social-media': return <SocialMediaContent />
      case 'competitor-monitoring': return <CompetitorMonitoringContent />
      default: return <OverviewContent />
    }
  }

  return (
    <>
      <Header fixed>
        <div className='flex-1' />
      </Header>
      <Main>
        {renderContent()}
      </Main>
    </>
  )
}

/* ═══════════════════ INDIVIDUAL PAGE EXPORTS ═══════════════════ */

export function RadarOverview() { return <Radar defaultTab='overview' /> }
export function RadarNews() { return <Radar defaultTab='news' /> }
export function RadarEvents() { return <Radar defaultTab='events' /> }
export function RadarSocialMedia() { return <Radar defaultTab='social-media' /> }
export function RadarCompetitorMonitoring() { return <Radar defaultTab='competitor-monitoring' /> }
