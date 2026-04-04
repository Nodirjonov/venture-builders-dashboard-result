import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import { ExportBusinessPlanModal, EditOutlineModal, DEFAULT_PALETTES, FONT_OPTIONS, type ExportConfig } from './components/export-business-plan'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import {
  ChevronDown,
  ChevronLeft,
  Copy,
  Crown,
  Download,
  Eye,
  LayoutGrid,
  Settings2,
  Trash2,
  Upload,
  X,
  Zap
} from 'lucide-react'
import { useState } from 'react'

// ─── Sidebar Data ────────────────────────────────────────────────────────────

const sidebarSections = [
  {
    id: 'overview',
    title: 'Overview',
    items: [
      { id: 'executive-summary', label: 'Executive Summary' },
      { id: 'swot-analysis', label: 'SWOT Analysis' },
      { id: 'business-models', label: 'Business Models' },
      { id: 'viability-analysis', label: 'Viability Analysis' },
    ],
  },
  {
    id: 'market-research',
    title: 'Market Research',
    items: [
      { id: 'industry-overview', label: 'Industry Overview' },
      { id: 'target-audience', label: 'Target Audience' },
      { id: 'market-size', label: 'Market Size & Trends' },
      { id: 'competitor-analysis', label: 'Competitor Analysis' },
    ],
  },
  {
    id: 'products-services',
    title: 'Products & Services',
    items: [
      { id: 'core-offerings', label: 'Core Offerings' },
      { id: 'expansion', label: 'Expansion Opportunities' },
      { id: 'secondary', label: 'Secondary Offerings' },
      { id: 'customer-service', label: 'Customer Service' },
    ],
  },
  {
    id: 'sales-marketing',
    title: 'Sales & Marketing',
    items: [
      { id: 'marketing-overview', label: 'Marketing Overview' },
      { id: 'branding', label: 'Branding & Identity' },
      { id: 'customer-retention', label: 'Customer Retention' },
      { id: 'online-presence', label: 'Online Presence' },
      { id: 'social-media', label: 'Social Media' },
      { id: 'seo', label: 'SEO & Content' },
      { id: 'digital-marketing', label: 'Digital Marketing' },
      { id: 'community', label: 'Community Engagement' },
    ],
  },
  {
    id: 'financials',
    title: 'Financials',
    items: [
      { id: 'revenue', label: 'Revenue' },
      { id: 'expenses', label: 'Expenses' },
      { id: 'financing', label: 'Financing' },
      { id: 'dividends', label: 'Dividends' },
      { id: 'taxes', label: 'Taxes' },
      { id: 'profit-loss', label: 'Profit & Loss' },
      { id: 'balance-sheet', label: 'Balance Sheet' },
      { id: 'cash-flow', label: 'Cash Flow' },
      { id: 'funding-plan', label: 'Funding Plan' },
    ],
  },
  {
    id: 'operations',
    title: 'Operations',
    items: [
      { id: 'team-roles', label: 'Team & Roles' },
      { id: 'operations-plan', label: 'Operations Plan' },
      { id: 'risk-analysis', label: 'Risk Analysis' },
      { id: 'regulatory', label: 'Regulatory Compliance' },
    ],
  },
  {
    id: 'implementation',
    title: 'Implementation Plan',
    items: [
      { id: 'pre-launch', label: 'Pre-Launch' },
      { id: 'post-launch', label: 'Post-Launch' },
      { id: 'five-year', label: '5 Year Plan' },
    ],
  },
]

// ─── Plan Sidebar ────────────────────────────────────────────────────────────

function PlanSidebar({
  active,
  onSelect,
}: {
  active: string
  onSelect: (id: string) => void
}) {
  const [sectionCollapsed, setSectionCollapsed] = useState<Record<string, boolean>>({})

  const toggleSection = (id: string) =>
    setSectionCollapsed((p) => ({ ...p, [id]: !p[id] }))

  return (
    <div
      style={{
        flexShrink: 0,
        width: '280px',
        height: '100%',
        overflow: 'hidden',
        background: '#F9FAFB',
        borderRight: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px 20px 14px',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <span style={{ fontSize: 21, fontWeight: 700, color: '#000000', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            Business Plan
          </span>
        </div>

        {/* All Pages button */}
        <button
          onClick={() => onSelect('all')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 16px',
            borderRadius: 12,
            border: 'none',
            background: active === 'all' ? '#EAECF0' : 'transparent',
            cursor: 'pointer',
            fontSize: 15,
            fontWeight: active === 'all' ? 600 : 500,
            color: '#111827',
            transition: 'background 0.2s ease',
          }}
        >
          <LayoutGrid style={{ width: 18, height: 18, color: active === 'all' ? '#374151' : '#6B7280' }} />
          All Pages
        </button>
      </div>

      {/* Nav sections */}
      <nav
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 20px 48px',
        }}
      >
        {sidebarSections.map((section) => {
          const isSectionOpen = sectionCollapsed[section.id] !== true
          return (
            <div key={section.id} style={{ marginTop: 28 }}>
              <button
                onClick={() => toggleSection(section.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                  {section.title}
                </span>
                <ChevronDown
                  style={{
                    width: 14,
                    height: 14,
                    color: '#9CA3AF',
                    transform: isSectionOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>
              {isSectionOpen && (
                <div style={{ position: 'relative', marginLeft: 4, borderLeft: '1px solid #E5E7EB', paddingLeft: 12 }}>
                  {section.items.map((item) => {
                    const isActive = active === item.id
                    return (
                      <div key={item.id} style={{ position: 'relative', marginBottom: 2 }}>
                        {isActive && (
                          <span
                            aria-hidden
                            style={{
                              position: 'absolute',
                              left: -13, // Precise alignment with left border
                              top: 2,
                              bottom: 2,
                              width: 3.5,
                              background: '#4B5563', // Dark gray/charcoal bar
                              borderRadius: '0 2px 2px 0',
                              pointerEvents: 'none',
                              zIndex: 10,
                            }}
                          />
                        )}
                        <button
                          onClick={() => onSelect(item.id)}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '6px 12px',
                            borderRadius: 8,
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 14,
                            fontWeight: isActive ? 600 : 400,
                            background: isActive ? '#EAECF0' : 'transparent',
                            color: '#111827',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {item.label}
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}

// ─── Shared Card Components ──────────────────────────────────────────────────

function CardActions({
  onView,
  onCopy,
  onDelete,
}: {
  onView?: () => void
  onCopy?: () => void
  onDelete?: () => void
}) {
  return (
    <div className='absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 bg-white border border-[#EAECF0] rounded-lg px-1.5 py-1 shadow-sm'>
      <button
        onClick={onView}
        className='p-1.5 rounded-md hover:bg-gray-50 transition-colors'
      >
        <Eye className='h-4 w-4 text-[#9CA3AF]' />
      </button>
      <button
        onClick={onCopy}
        className='p-1.5 rounded-md hover:bg-gray-50 transition-colors'
      >
        <Copy className='h-4 w-4 text-[#9CA3AF]' />
      </button>
      <button
        onClick={onDelete}
        className='p-1.5 rounded-md hover:bg-gray-50 transition-colors'
      >
        <Trash2 className='h-4 w-4 text-[#9CA3AF]' />
      </button>
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  background: 'white',
  borderRadius: 16,
  border: '1px solid #E5E7EB',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  padding: 24,
  minHeight: 400,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
}

function Card({
  title,
  children,
  className,
  showActions = false,
  onViewAction,
  onCopyAction,
  onDeleteAction,
}: {
  title: string
  children: React.ReactNode
  className?: string
  showActions?: boolean
  onViewAction?: () => void
  onCopyAction?: () => void
  onDeleteAction?: () => void
}) {
  return (
    <div className={cn('group', className)} style={cardStyle}>
      {showActions && (
        <CardActions
          onView={onViewAction}
          onCopy={onCopyAction}
          onDelete={onDeleteAction}
        />
      )}
      <div className='mb-4'>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>{title}</h3>
      </div>
      {children}
    </div>
  )
}

function LockedCard({ title, onViewAction, onCopyAction, onDeleteAction }: { title: string; onViewAction?: () => void; onCopyAction?: () => void; onDeleteAction?: () => void }) {
  return (
    <Card
      title={title}
      showActions
      onViewAction={onViewAction}
      onCopyAction={onCopyAction}
      onDeleteAction={onDeleteAction}
    >
      <div className='flex-1 flex flex-col items-center justify-center gap-3'>
        <Crown className='h-7 w-7 text-gray-300' />
        <span style={{ fontSize: 14, color: '#9CA3AF', fontWeight: 400 }}>Unlock plan to view</span>
      </div>
    </Card>
  )
}

function FadeCard({
  title,
  showActions = false,
  items,
  onViewAction,
  onCopyAction,
  onDeleteAction,
}: {
  title: string
  showActions?: boolean
  items: string[]
  onViewAction?: () => void
  onCopyAction?: () => void
  onDeleteAction?: () => void
}) {
  return (
    <div className='group relative overflow-hidden' style={cardStyle}>
      <div className='flex items-start justify-between mb-4'>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>{title}</h3>
        {showActions && (
          <CardActions
            onView={onViewAction}
            onCopy={onCopyAction}
            onDelete={onDeleteAction}
          />
        )}
      </div>
      <div className='flex flex-col divide-y divide-gray-100'>
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              'transition-all py-2.5 first:pt-0',
              i >= items.length - 1 && 'opacity-30'
            )}
          >
            <p style={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>{item}</p>
            {i < items.length - 1 && (
              <p className='text-[12px] text-gray-400 mt-0.5 truncate'>
                {getSubtitle(item)}
              </p>
            )}
          </div>
        ))}
      </div>
      {/* Fade overlay */}
      <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none' />
    </div>
  )
}

function getSubtitle(title: string): string {
  const map: Record<string, string> = {
    'Foundational STEM Curriculum': 'A comprehensive curriculum coveri...',
    'Advanced Specialization Programs': 'Specialized courses focusing on ar...',
    'STEM Extracurricular Clubs': 'After-school clubs providing stude...',
    'Summer STEM Intensive Camps': 'Short-term intensive camps during ...',
    'STEM-Themed Escape Room': 'Create immersive escape rooms ba...',
    'Augmented Reality STEM Field Trips': 'Develop AR-enhanced field trips w...',
    'STEM Culinary Workshops': 'Offer workshops where students le...',
    'Robotics Pet Companions': 'Design and sell small, affordable ro...',
    Principal: 'The Principal leads the overall man...',
    'STEM Curriculum Coordinator': 'Responsible for designing, updatin...',
    'Lead Science Teacher': 'The Lead Science Teacher delivers ...',
    'Technology Integration Specialist': 'This role focuses on integrating tec...',
    'Personalized Learning Plans': 'Develop customized learning path...',
    'STEM Clubs and Extracurricular': 'Introduce STEM-focused clubs and...',
    'Parent Engagement Programs': 'Create programs to involve parents...',
    'Alumni Network and Mentorship': 'Establish an alumni network that en...',
  }
  return map[title] || 'Details available...'
}

// ─── Document Preview ────────────────────────────────────────────────────────

const TOC_DATA: [string, string, boolean][] = [
  ['Overview', '1', true],
  ['Financials', '21', true],
  ['Executive Summary', '1', false],
  ['Revenue', '21', false],
  ['SWOT Analysis', '2', false],
  ['Expenses', '22', false],
  ['Business Models', '3', false],
  ['Financing', '23', false],
  ['Viability Analysis', '4', false],
  ['Dividends', '24', false],
  ['', '', false],
  ['Taxes', '25', false],
  ['Market Research', '5', true],
  ['Profit & Loss', '26', false],
  ['Industry Overview', '6', false],
  ['Balance Sheet', '27', false],
  ['Target Audience', '7', false],
  ['Cash Flow', '28', false],
  ['Market Size & Trends', '8', false],
  ['Funding Plan', '29', false],
  ['Competitor Analysis', '9', false],
  ['', '', false],
  ['', '', false],
  ['Operations', '30', true],
  ['Products & Services', '10', true],
  ['Team & Roles', '30', false],
  ['Core Offerings', '10', false],
  ['Operations Plan', '31', false],
  ['Expansion Opportunities', '11', false],
  ['Risk Analysis', '32', false],
  ['Secondary Offerings', '12', false],
  ['Regulatory Compliance', '33', false],
  ['Customer Service', '13', false],
  ['', '', false],
  ['', '', false],
  ['Implementation Plan', '34', true],
  ['Sales & Marketing', '14', true],
  ['Pre-Launch', '34', false],
  ['Marketing Overview', '14', false],
  ['Post-Launch', '35', false],
  ['Branding & Identity', '15', false],
  ['5 Year Plan', '36', false],
  ['Customer Retention', '16', false],
  ['', '', false],
  ['Online Presence', '17', false],
  ['', '', false],
  ['Social Media', '17', false],
  ['', '', false],
  ['SEO & Content', '18', false],
  ['', '', false],
  ['Digital Marketing', '19', false],
  ['', '', false],
  ['Community Engagement', '20', false],
  ['', '', false],
]

function DocumentSection({
  onOpenExport,
  onOpenOutline,
  onAddPage,
  exportConfig,
  scheme,
}: {
  onOpenExport: () => void
  onOpenOutline: () => void
  onAddPage: () => void
  exportConfig: ExportConfig
  scheme: { bg: string; primary: string; a1: string; a2: string; a3: string }
}) {
  return (
    <div id='document' className='w-full px-6 mt-6 mb-10'>
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold text-gray-900'>Document</h2>
        <button
          onClick={onAddPage}
          className='flex items-center gap-1.5 text-[13px] font-medium text-gray-500 hover:bg-gray-100 rounded-md px-2.5 py-1.5 transition-colors'
        >
          <span className='text-lg leading-none'>+</span> Add Page
        </button>
      </div>

      {/* Cards row */}
      <div className='flex gap-6 items-start'>
        {/* LEFT — Cover Page Card */}
        <div
          onClick={onOpenExport}
          className='w-[300px] h-[440px] flex-shrink-0 rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow relative flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white'
        >
          <div className='w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600'>
             <Eye className='w-8 h-8' />
          </div>
          <h3 className='font-bold text-gray-800 text-lg'>Cover Page</h3>
          <p className='text-gray-500 text-sm mt-2 max-w-[200px] text-center'>Click to preview and export your business plan</p>
        </div>

        {/* RIGHT — Table of Contents Card */}
        <div
          onClick={onOpenOutline}
          className='w-[300px] h-[440px] flex-shrink-0 rounded-xl border border-gray-200 shadow-sm bg-white cursor-pointer hover:shadow-md transition-shadow overflow-hidden p-4'
        >
          <div className='h-full overflow-hidden'>
            <p className='text-center mb-3 text-[10px] font-bold text-gray-700 tracking-wide'>
              Table Of Contents
            </p>
            <div className='grid grid-cols-2 gap-x-4'>
              {TOC_DATA.map(([label, page, isBold], i) => (
                <div key={i} className='flex justify-between py-[1.5px]'>
                  <span
                    className='truncate'
                    style={{
                      fontWeight: isBold ? 700 : 400,
                      color: isBold ? '#1F2937' : '#6B7280',
                      fontSize: isBold ? 8 : 7.5,
                    }}
                  >
                    {label}
                  </span>
                  {page && (
                    <span className='text-gray-400 ml-1 flex-shrink-0' style={{ fontSize: 7.5 }}>
                      {page}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Overview Cards ──────────────────────────────────────────────────────────

function ExecutiveSummaryCard({
  onViewAction,
  onCopyAction,
  onDeleteAction,
}: {
  onViewAction?: () => void
  onCopyAction?: () => void
  onDeleteAction?: () => void
}) {
  return (
    <Card
      title='Executive Summary'
      showActions
      onViewAction={onViewAction}
      onCopyAction={onCopyAction}
      onDeleteAction={onDeleteAction}
    >
      <div className='rounded-xl p-5 mb-5 flex-shrink-0' style={{ background: '#FDF7F0', border: '1px solid #F3E8D9' }}>
        <p className='text-[15px] font-bold text-gray-900 leading-snug'>
          Innovatech Academy: Empowering the Next Generation to Innovate, Learn, and Lead in STEM Excellence
        </p>
      </div>
      <p className='text-[14px] text-gray-400 leading-relaxed line-clamp-8'>
        Innovatech Academy is a forward-thinking educational institution located in Tashkent, Uzbekistan, specializing in
        STEM (Science, Technology, Engineering, and Mathematics) education. Our school is committed to equipping students
        with the necessary skills and knowledge to thrive in rapidly evolving scientific and technological fields. By
        focusing on an innovative curriculum...
      </p>
    </Card>
  )
}

function SwotCard({
  onViewAction,
  onCopyAction,
  onDeleteAction,
}: {
  onViewAction?: () => void
  onCopyAction?: () => void
  onDeleteAction?: () => void
}) {
  return (
    <Card
      title='SWOT Analysis'
      showActions
      onViewAction={onViewAction}
      onCopyAction={onCopyAction}
      onDeleteAction={onDeleteAction}
    >
      <div className='grid grid-cols-2 gap-3 flex-1'>
        {[
          { l: 'S', bg: '#F0F5FA', tc: '#94A3B8' },
          { l: 'W', bg: '#FEFCE8', tc: '#94A3B8' },
          { l: 'O', bg: '#F0FDF4', tc: '#94A3B8' },
          { l: 'T', bg: '#FEF2F2', tc: '#94A3B8' },
        ].map((item, i) => (
          <div
            key={i}
            className='rounded-xl flex items-center justify-center'
            style={{ background: item.bg, minHeight: 110 }}
          >
            <span className='text-3xl font-bold' style={{ color: item.tc }}>{item.l}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

function BusinessModelsCard({
  onViewAction,
  onCopyAction,
  onDeleteAction,
}: {
  onViewAction?: () => void
  onCopyAction?: () => void
  onDeleteAction?: () => void
}) {
  const models = [
    { title: 'Tuition-Based Model', sub: 'The school charges students tuition...' },
    { title: 'Government-Funded Model', sub: 'The Academy partners with govern...' },
    { title: 'Corporate Sponsorship and Part...', sub: 'The Academy forms partnerships w...' },
    { title: 'Online and Hybrid Learning Model', sub: 'The Academy offers courses online...' },
    { title: 'Subscription-Based Learning Pla...', sub: 'Students and parents pay a monthly...' },
  ]
  return (
    <Card
      title='Business Models'
      showActions
      onViewAction={onViewAction}
      onCopyAction={onCopyAction}
      onDeleteAction={onDeleteAction}
    >
      <div className='flex flex-col divide-y divide-gray-100'>
        {models.map((m, i) => (
          <div key={i} className={cn('py-2.5 first:pt-0', i === models.length - 1 ? 'opacity-30' : '')}>
            <p className='text-[13px] font-semibold text-gray-800 truncate'>{m.title}</p>
            {i < models.length - 1 && <p className='text-[12px] text-gray-400'>{m.sub}</p>}
          </div>
        ))}
      </div>
      <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none' />
    </Card>
  )
}

function ViabilityCard({
  onViewAction,
  onCopyAction,
  onDeleteAction,
}: {
  onViewAction?: () => void
  onCopyAction?: () => void
  onDeleteAction?: () => void
}) {
  return (
    <Card
      title='Viability Analysis'
      showActions
      onViewAction={onViewAction}
      onCopyAction={onCopyAction}
      onDeleteAction={onDeleteAction}
    >
      <div
        className='rounded-xl border border-gray-100 flex items-center justify-between p-4 mb-4 mt-2'
        style={{ background: '#FAFAFA' }}
      >
        <svg width='130' height='78' viewBox='0 0 160 100' style={{ flexShrink: 0 }}>
          <defs>
            <linearGradient id='vg' x1='0' y1='0' x2='1' y2='0'>
              <stop offset='0%' stopColor='#16A34A' />
              <stop offset='100%' stopColor='#4ADE80' />
            </linearGradient>
          </defs>
          {/* Gray track — full semicircle */}
          <path d='M 15 90 A 65 65 0 0 1 145 90' fill='none' stroke='#E5E7EB' strokeWidth='13' strokeLinecap='round' />
          {/* Green arc — 85% of semicircle, endpoint at ~27° from horizontal right */}
          <path d='M 15 90 A 65 65 0 0 1 138 62' fill='none' stroke='url(#vg)' strokeWidth='13' strokeLinecap='round' />
          {/* Needle from center to 85% position */}
          <line x1='80' y1='90' x2='132' y2='65' stroke='#111827' strokeWidth='2.5' strokeLinecap='round' />
          <circle cx='80' cy='90' r='5' fill='#111827' />
        </svg>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <span style={{ fontSize: 42, fontWeight: 800, color: '#111827', lineHeight: 1 }}>85</span>
          <span style={{ fontSize: 20, fontWeight: 600, color: '#9CA3AF' }}>/100</span>
        </div>
      </div>
      <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.65 }}>
        Innovatech Academy demonstrates strong viability as a specialized educational institution focused on STEM
        disciplines in Tashkent, Uzbekistan. The growing global and regional emphasis on science, technology, engineering,
        and mathematics education creates a favorable environment for the academy's growth.
      </p>
    </Card>
  )
}

// ─── Market Research Cards ───────────────────────────────────────────────────

function IndustryOverviewCard({
  onViewAction,
  onCopyAction,
  onDeleteAction,
}: {
  onViewAction?: () => void
  onCopyAction?: () => void
  onDeleteAction?: () => void
}) {
  const stats = [
    { value: '7%', label: 'Education Sector Growth Rate' },
    { value: '46%', label: 'Higher Education Expenditure Share' },
    { value: '51%', label: 'International Student Increase' },
  ]
  return (
    <Card
      title='Industry Overview'
      showActions
      onViewAction={onViewAction}
      onCopyAction={onCopyAction}
      onDeleteAction={onDeleteAction}
    >
      <div className='flex flex-col gap-3 mt-1'>
        {stats.map((s, i) => (
          <div key={i} className='bg-[#FCF7EE] rounded-xl p-4 border border-[#F3E8D9]'>
            <p className='text-2xl font-bold text-stone-900 mb-1'>{s.value}</p>
            <p className='text-[12px] font-medium text-stone-500 leading-tight'>{s.label}</p>
          </div>
        ))}
      </div>
      <p className='text-[12px] text-gray-400 leading-relaxed mt-4 line-clamp-2'>
        The education sector in Uzbekistan has experienced significant growth and transformation...
      </p>
    </Card>
  )
}

function TargetAudienceCard({
  onViewAction,
  onCopyAction,
  onDeleteAction,
}: {
  onViewAction?: () => void
  onCopyAction?: () => void
  onDeleteAction?: () => void
}) {
  const segments = [
    { label: 'Affluent Families', color: '#0284C7' },
    { label: 'Middle-Income Families', color: '#BAE6FD' },
    { label: 'Government-Supported Fam...', color: '#94A3B8' },
  ]
  return (
    <Card
      title='Target Audience'
      showActions
      onViewAction={onViewAction}
      onCopyAction={onCopyAction}
      onDeleteAction={onDeleteAction}
    >
      <div className='flex-1 flex flex-col items-center py-2'>
        {/* Donut Chart */}
        <div className='relative mb-8' style={{ width: 140, height: 140 }}>
          <svg viewBox='0 0 36 36' className='w-full h-full transform -rotate-90'>
            <circle cx='18' cy='18' r='16' fill='none' stroke='#F3F4F6' strokeWidth='4' />
            <circle
              cx='18' cy='18' r='16'
              fill='none'
              stroke='#0284C7'
              strokeWidth='4'
              strokeDasharray='70 100'
              strokeLinecap='round'
            />
            <circle
              cx='18' cy='18' r='16'
              fill='none'
              stroke='#BAE6FD'
              strokeWidth='4'
              strokeDasharray='20 100'
              strokeDashoffset='-70'
            />
            <circle
              cx='18' cy='18' r='16'
              fill='none'
              stroke='#94A3B8'
              strokeWidth='4'
              strokeDasharray='10 100'
              strokeDashoffset='-90'
            />
          </svg>
        </div>

        {/* Divider */}
        <div className='w-full h-px bg-gray-100 mb-6' />

        {/* Legend */}
        <div className='w-full space-y-3 px-2'>
          {segments.map((s) => (
            <div key={s.label} className='flex items-center gap-3'>
              <div className='w-2.5 h-2.5 rounded flex-shrink-0' style={{ background: s.color }} />
              <span className='text-[13px] font-medium text-gray-600 truncate'>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <p className='text-[12px] text-gray-400 mt-4 leading-relaxed line-clamp-3'>
        Innovatech Academy aims to serve a diverse range of students and their families, each with unique needs and
        aspirations. Understanding these target...
      </p>
    </Card>
  )
}

function MarketSizeCard({
  onViewAction,
  onCopyAction,
  onDeleteAction,
}: {
  onViewAction?: () => void
  onCopyAction?: () => void
  onDeleteAction?: () => void
}) {
  return (
    <Card
      title='Market Size & Trends'
      showActions
      onViewAction={onViewAction}
      onCopyAction={onCopyAction}
      onDeleteAction={onDeleteAction}
    >
      <div className='flex-1 flex flex-col justify-center gap-4'>
        {/* Bubble diagram with connector lines */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12, marginBottom: 12 }}>
          <svg width='240' height='140' viewBox='0 0 240 140'>
            {/* TAM — large light gray circle */}
            <circle cx='68' cy='65' r='62' fill='#F3F4F6' />
            <text x='68' y='36' textAnchor='middle' fontSize='11' fontWeight='700' fill='#9CA3AF'>$34B</text>
            {/* SAM — medium darker gray, overlapping bottom-right of TAM */}
            <circle cx='100' cy='96' r='42' fill='#E2E4E7' />
            <text x='100' y='91' textAnchor='middle' fontSize='10' fontWeight='700' fill='#6B7280'>$17B</text>
            {/* SOM — small blue, inside SAM */}
            <circle cx='113' cy='113' r='25' fill='#3B82F6' />
            <text x='113' y='117' textAnchor='middle' fontSize='8.5' fontWeight='700' fill='white'>$100M</text>
            {/* Connector lines */}
            <line x1='130' y1='65' x2='150' y2='65' stroke='#D1D5DB' strokeWidth='1' />
            <line x1='142' y1='96' x2='150' y2='96' stroke='#D1D5DB' strokeWidth='1' />
            <line x1='138' y1='113' x2='150' y2='113' stroke='#D1D5DB' strokeWidth='1' />
            {/* Labels */}
            <text x='158' y='69' fontSize='12' fontWeight='600' fill='#262626'>TAM</text>
            <text x='158' y='100' fontSize='12' fontWeight='600' fill='#262626'>SAM</text>
            <text x='158' y='117' fontSize='12' fontWeight='600' fill='#262626'>SOM</text>
          </svg>
        </div>
        <p className='text-[13px] text-gray-400 mt-2 leading-relaxed line-clamp-3'>
          The educational landscape in Uzbekistan is undergoing significant transformations driven by rapid technological
          advancements and a growing emphasis on STEM education.
        </p>
      </div>
    </Card>
  )
}

// ─── Sales & Marketing Cards ─────────────────────────────────────────────────

function MarketingOverviewCard({
  onViewAction,
  onCopyAction,
  onDeleteAction,
}: {
  onViewAction?: () => void
  onCopyAction?: () => void
  onDeleteAction?: () => void
}) {
  const steps = ['Awareness', 'Interest', 'Consideration', 'Intent']
  return (
    <Card
      title='Marketing Plan'
      showActions
      onViewAction={onViewAction}
      onCopyAction={onCopyAction}
      onDeleteAction={onDeleteAction}
    >
      <div className='flex flex-col gap-2 flex-1'>
        {steps.map((step) => (
          <div
            key={step}
            className='rounded-lg py-2.5 px-3 border border-gray-100 text-center'
          >
            <p className='text-[13px] font-semibold text-gray-700'>{step}</p>
            <p className='text-[11px] text-gray-400 truncate'>{getStepSubtitle(step)}</p>
          </div>
        ))}
        <div className='rounded-lg py-2.5 px-3 border border-gray-100 text-center opacity-30'>
          <p className='text-[13px] font-semibold text-gray-700'>Enrollment</p>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none' />
    </Card>
  )
}

function getStepSubtitle(step: string) {
  const m: Record<string, string> = {
    Awareness: 'Introduce Innovatech Academy ...',
    Interest: 'Engage prospects with detaile...',
    Consideration: 'Encourage prospects to eval...',
    Intent: 'Motivate prospects to take ...',
  }
  return m[step] || ''
}

function BrandingCard({
  onViewAction,
  onCopyAction,
  onDeleteAction,
}: {
  onViewAction?: () => void
  onCopyAction?: () => void
  onDeleteAction?: () => void
}) {
  const colors = [
    { bg: '#0266D6', border: 'transparent' }, // Blue
    { bg: '#00C853', border: 'transparent' }, // Green
    { bg: '#F8FAFC', border: '#E2E8F0' }, // Light Grey
    { bg: '#333333', border: 'transparent' }, // Dark Grey
    { bg: '#FF9100', border: 'transparent' }, // Orange
  ]
  return (
    <Card
      title='Branding & Identity'
      showActions
      onViewAction={onViewAction}
      onCopyAction={onCopyAction}
      onDeleteAction={onDeleteAction}
    >
      {/* 5 Vertical color bars */}
      <div className='flex gap-1.5 mb-5 h-[96px]'>
        {colors.map((c, i) => (
          <div
            key={i}
            className='flex-1 rounded-xl shadow-sm'
            style={{ background: c.bg, border: `1px solid ${c.border}` }}
          />
        ))}
      </div>
      <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, marginBottom: 20 }}>
        A vibrant and balanced palette combining technology-inspired blues with energetic greens and sophisticated neutrals.
      </p>
      <div>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', marginBottom: 8 }}>Logo Idea</p>
        <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6 }} className='line-clamp-4'>
          The logo for Innovatech Academy features a stylized, modern emblem combining elements of a circuit board and an open book, symbolizing the fusion of technology and education.
        </p>
      </div>
      {/* Gradient fade at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: 'linear-gradient(to top, white 10%, transparent)',
          pointerEvents: 'none',
          borderRadius: '0 0 16px 16px'
        }}
      />
    </Card>
  )
}

// ─── Financials Cards ────────────────────────────────────────────────────────

function RevenueCard({
  onViewAction,
  onCopyAction,
  onDeleteAction,
}: {
  onViewAction?: () => void
  onCopyAction?: () => void
  onDeleteAction?: () => void
}) {
  const tableRows = [
    { label: 'Tuition Fees', y1: '$3,325,800', y2: '$12,601,061', y3: '$24,764,776' },
    { label: 'STEM Workshop Fees', y1: '$203,504', y2: '$826,015', y3: '$31,570' },
    { label: 'After-School Program', y1: '$249,016', y2: '$602,377', y3: '$1,283,468' },
    { label: 'Private Tutoring Hours', y1: '$10,849', y2: '$49,046', y3: '$60,204' },
    { label: 'Examination Fees', y1: '$31,507', y2: '$49,026', y3: '$47,034' },
    { label: 'Summer Camp Fees', y1: '$61,420', y2: '$223,970', y3: '$403,216' },
    { label: 'Sponsorship Revenue', y1: '$50,000', y2: '$65,000', y3: '$60,000' },
    { label: 'Educational Materials...', y1: '$5,416', y2: '$10,056', y3: '$14,007', blur: true },
  ]
  return (
    <Card
      title='Revenue Stream'
      showActions
      onViewAction={onViewAction}
      onCopyAction={onCopyAction}
      onDeleteAction={onDeleteAction}
    >
      {/* Charts row */}
      <div className='flex items-start gap-4 mb-3'>
        {/* Bar chart */}
        <div className='flex-1'>
          <p className='text-[10px] text-gray-400 mb-1'>Yearly Revenue</p>
          <svg width='100%' height='60' viewBox='0 0 90 60'>
            {[
              { x: 5, h: 20, label: '2026' },
              { x: 35, h: 38, label: '2027' },
              { x: 65, h: 55, label: '2028' },
            ].map((b) => (
              <g key={b.label}>
                <rect x={b.x} y={60 - b.h} width='20' height={b.h} rx='2' fill='#3B82F6' opacity='0.85' />
                <text x={b.x + 10} y='58' textAnchor='middle' fill='#9CA3AF' fontSize='6'>{b.label}</text>
              </g>
            ))}
            {['$7M', '$3M'].map((l, i) => (
              <text key={i} x='0' y={i === 0 ? 8 : 30} fill='#D1D5DB' fontSize='5.5'>{l}</text>
            ))}
          </svg>
        </div>
        {/* Donut */}
        <div>
          <p className='text-[10px] text-gray-400 mb-1'>Revenue Streams</p>
          <svg width='50' height='50' viewBox='0 0 50 50'>
            <circle cx='25' cy='25' r='18' fill='none' stroke='#E5E7EB' strokeWidth='8' />
            <circle
              cx='25' cy='25' r='18'
              fill='none'
              stroke='#3B82F6'
              strokeWidth='8'
              strokeDasharray='75 38'
              transform='rotate(-90 25 25)'
            />
            <circle
              cx='25' cy='25' r='18'
              fill='none'
              stroke='#93C5FD'
              strokeWidth='8'
              strokeDasharray='25 88'
              strokeDashoffset='-75'
              transform='rotate(-90 25 25)'
            />
          </svg>
        </div>
      </div>
      {/* Table */}
      <div className='text-[10px] relative overflow-hidden'>
        <div className='grid grid-cols-4 gap-1 font-semibold text-gray-400 mb-1 border-b pb-1'>
          <span>Revenue Stream</span>
          <span className='text-right'>2026</span>
          <span className='text-right'>2027</span>
          <span className='text-right'>2028</span>
        </div>
        {tableRows.map((row, i) => (
          <div
            key={i}
            className={cn(
              'grid grid-cols-4 gap-1 py-0.5 border-b border-gray-50',
              row.blur && 'opacity-30'
            )}
          >
            <span className='text-gray-600 truncate'>{row.label}</span>
            <span className='text-right text-gray-500'>{row.y1}</span>
            <span className='text-right text-gray-500'>{row.y2}</span>
            <span className='text-right text-gray-500'>{row.y3}</span>
          </div>
        ))}
        <div className='absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none' />
      </div>
    </Card>
  )
}

// ─── Sections ────────────────────────────────────────────────────────────────

function Section({ id, title, children, onAddPage }: { id: string; title: string; children: React.ReactNode; onAddPage?: () => void }) {
  return (
    <div id={id} style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', margin: 0 }}>{title}</h2>
        <button
          onClick={onAddPage}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            fontWeight: 500,
            color: '#6B7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px 10px',
            borderRadius: 6,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#F3F4F6')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add Page
        </button>
      </div>
      {children}
    </div>
  )
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 20,
      }}
    >
      {children}
    </div>
  )
}

// ─── Export Business Plan Panel ──────────────────────────────────────────────

const COLOR_SCHEMES: Array<{ bg: string; primary: string; a1: string; a2: string; a3: string }> = [
  { bg: '#003629', primary: '#465d21', a1: '#b6e972', a2: '#dcf8b6', a3: '#2bc085' },
  { bg: '#1a2332', primary: '#2563eb', a1: '#3b82f6', a2: '#93c5fd', a3: '#1e40af' },
  { bg: '#0f172a', primary: '#0ea5e9', a1: '#38bdf8', a2: '#7dd3fc', a3: '#0284c7' },
  { bg: '#1c1917', primary: '#d97706', a1: '#fbbf24', a2: '#fde68a', a3: '#b45309' },
  { bg: '#1e1b4b', primary: '#7c3aed', a1: '#a78bfa', a2: '#c4b5fd', a3: '#5b21b6' },
  { bg: '#14532d', primary: '#16a34a', a1: '#4ade80', a2: '#bbf7d0', a3: '#15803d' },
  { bg: '#7f1d1d', primary: '#ef4444', a1: '#f87171', a2: '#fecaca', a3: '#dc2626' },
  { bg: '#431407', primary: '#ea580c', a1: '#fb923c', a2: '#fed7aa', a3: '#c2410c' },
  { bg: '#fefce8', primary: '#d97706', a1: '#f59e0b', a2: '#fde68a', a3: '#b45309' },
  { bg: '#ecfdf5', primary: '#059669', a1: '#34d399', a2: '#a7f3d0', a3: '#047857' },
  { bg: '#fdf2f8', primary: '#db2777', a1: '#f472b6', a2: '#fbcfe8', a3: '#be185d' },
  { bg: '#f0fdf4', primary: '#465d21', a1: '#b6e972', a2: '#dcf8b6', a3: '#2bc085' },
  { bg: '#1e293b', primary: '#64748b', a1: '#94a3b8', a2: '#cbd5e1', a3: '#475569' },
  { bg: '#292524', primary: '#78716c', a1: '#a8a29e', a2: '#d6d3d1', a3: '#57534e' },
  { bg: '#faf5ff', primary: '#9333ea', a1: '#c084fc', a2: '#e9d5ff', a3: '#7e22ce' },
]

// ─── Main Dashboard ──────────────────────────────────────────────────────────

const ITEM_CONTENT: Record<string, { free: boolean; highlight?: string; body?: string; subs?: { t: string; x: string }[] }> = {
  'executive-summary': { free: true, highlight: 'Innovatech Academy: Empowering the Next Generation to Innovate, Learn, and Lead in STEM Excellence', body: 'Innovatech Academy is a forward-thinking educational institution located in Tashkent, Uzbekistan, specializing in STEM education. Our school is committed to equipping students with the necessary skills and knowledge to thrive in rapidly evolving scientific and technological fields.', subs: [{ t: 'Mission', x: 'Our mission is to provide high-quality, accessible STEM education that empowers students in Uzbekistan to become innovative leaders and problem solvers of tomorrow.' }, { t: 'Problem', x: 'Uzbekistan faces a significant gap in quality STEM education. Many students lack access to modern laboratories, experienced instructors, and curricula that reflect current technological advancements.' }, { t: 'Solution', x: 'Innovatech Academy addresses this gap by offering a cutting-edge STEM curriculum that integrates hands-on learning, project-based assessments, and real-world applications.' }] },
  'swot-analysis': { free: true, body: 'A comprehensive analysis of strengths, weaknesses, opportunities, and threats.', subs: [{ t: 'Strengths', x: 'Innovative STEM curriculum, experienced faculty, modern facilities, strategic location in Tashkent.' }, { t: 'Weaknesses', x: 'New brand with limited recognition, high initial investment costs.' }, { t: 'Opportunities', x: 'Growing demand for STEM education in Uzbekistan, government initiatives supporting education reform.' }, { t: 'Threats', x: 'Competition from established schools, economic fluctuations affecting enrollment.' }] },
  'business-models': { free: true, body: 'Innovatech Academy operates on a hybrid revenue model combining tuition fees, corporate partnerships, and government grants.', subs: [{ t: 'Revenue Streams', x: 'Primary revenue from student tuition, supplemented by corporate training programs and workshop fees.' }, { t: 'Cost Structure', x: 'Faculty salaries, facility maintenance, technology infrastructure, and marketing.' }] },
  'viability-analysis': { free: true, body: 'Financial projections indicate break-even within 18 months and profitability by year two.', subs: [{ t: 'Market Viability', x: 'Over 34 million people in Uzbekistan with a median age of 28 — substantial demand for quality education.' }, { t: 'Financial Viability', x: 'Conservative estimates project 200 students in year one, growing to 500 by year three.' }] },
}

const ALL_SIDEBAR_ITEMS = sidebarSections.flatMap(s => s.items)

export function BusinessPlanDashboard() {
  const [activeItem, setActiveItem] = useState('executive-summary')
  const [planView, setPlanView] = useState<'all' | 'item'>('all')
  const [aiBarVisible, setAiBarVisible] = useState(true)
  const { open: appSidebarOpen } = useSidebar()

  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isOutlineModalOpen, setIsOutlineModalOpen] = useState(false)
  const [showLockedModal, setShowLockedModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedScheme] = useState(0)
  const [exportConfig, setExportConfig] = useState<ExportConfig>({
    palette: DEFAULT_PALETTES[0],
    layout: 'classic',
    font: FONT_OPTIONS[0],
    logoUrl: undefined,
    formData: { companyName: 'Innovatech Academy', website: '', contactName: '', contactEmail: '', contactPhone: '', contactAddress: '' },
  })

  const curItemContent = ITEM_CONTENT[activeItem]
  const curItemLabel = ALL_SIDEBAR_ITEMS.find(i => i.id === activeItem)?.label ?? activeItem
  const curSection = sidebarSections.find(s => s.items.some(i => i.id === activeItem))
  const curIdx = ALL_SIDEBAR_ITEMS.findIndex(i => i.id === activeItem)

  const handleSelect = (id: string) => {
    if (id === 'all') {
      setPlanView('all')
    } else {
      setActiveItem(id)
      setPlanView('item')
    }
  }
  const openModal = () => {}
  const handleLockedAction = (e?: React.MouseEvent) => {
    if (e?.stopPropagation) e.stopPropagation()
    setShowLockedModal(true)
  }
  const handleDeleteAction = () => setShowDeleteModal(true)

  return (
    <div
      data-layout='fixed'
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 16,
      }}
    >
      {/* Locked Feature Modal */}
      {showLockedModal && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl p-10 max-w-md w-full shadow-2xl relative text-center flex flex-col items-center'>
            <button
              onClick={() => setShowLockedModal(false)}
              className='absolute top-6 right-6 text-gray-400 hover:text-gray-600'
            >
              <X className='h-5 w-5' />
            </button>
            <h2 className='text-xl font-bold text-gray-900 mb-4'>Locked Feature</h2>
            <p className='text-gray-500 mb-8 max-w-[280px] leading-relaxed'>
              This feature is locked in free plans, please upgrade to pro to access it.
            </p>
            <button
              className='bg-[#10B981] text-white font-bold px-8 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#059669] transition-all active:scale-95 shadow-lg shadow-emerald-50'
              onClick={() => { setShowLockedModal(false); openModal(); }}
            >
              <Crown className='h-4 w-4' />
              Upgrade
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm'>
          <div className='bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl'>
            <h2 className='text-xl font-bold text-gray-900 mb-2'>Are you absolutely sure?</h2>
            <p className='text-gray-600 mb-8'>
              This action cannot be undone. This will permanently remove your page from the section.
            </p>
            <div className='flex gap-3'>
              <button
                className='flex-1 border border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors'
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className='flex-1 border border-red-100 text-red-500 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors'
                onClick={() => setShowDeleteModal(false)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* PlanSidebar — hides when AppSidebar hover-opens & also on mobile */}
      <div
        className='hidden md:flex'
        style={{
          maxWidth: appSidebarOpen ? 0 : 280,
          overflow: 'hidden',
          flexShrink: 0,
          transition: 'max-width 0.22s ease',
        }}
      >
        <PlanSidebar
          active={planView === 'all' ? 'all' : activeItem}
          onSelect={handleSelect}
        />
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col min-w-0 overflow-hidden relative'>
        {/* Header */}
        <div
          className='flex items-center justify-between px-3 sm:px-6'
          style={{
            height: 56,
            background: 'white',
            borderBottom: '1px solid #E5E7EB',
            flexShrink: 0,
            zIndex: 20,
          }}
        >
          <div className='flex items-center gap-4'>
            <SidebarTrigger className='md:hidden -ml-2' />
            <Link
              to='/plans'
              className='flex items-center gap-2 text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors'
            >
              <ChevronLeft className='h-4 w-4' />
              View all plans
            </Link>
          </div>

          <div className='flex items-center gap-2'>
            <button className='p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-gray-500'>
              <Upload className='h-4 w-4' />
            </button>
            <button className='p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-gray-500'>
              <Settings2 className='h-4 w-4' />
            </button>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className='inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-all active:scale-95'
            >
              <Download className='h-4 w-4' />
              Export
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className='flex-1 overflow-y-auto' style={{ background: planView === 'item' ? '#f7f7f5' : '#F9FAFB' }}>

          {/* ═══ ITEM VIEW ═══ */}
          {planView === 'item' && (
            <div>
              <div style={{ position: 'sticky', top: 12, zIndex: 10, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
                <div style={{ background: '#fefce8', borderRadius: 100, padding: '8px 8px 8px 20px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', pointerEvents: 'auto' }}>
                  <span style={{ fontSize: 13, color: '#666' }}>Upgrade to get the full business plan</span>
                  <button onClick={openModal} style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 22, padding: '6px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Crown style={{ width: 13, height: 13 }} /> Upgrade
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 24px 0', marginTop: -42 }}>
                <span style={{ fontSize: 13, color: '#888' }}>{curSection?.title}</span>
                <div style={{ flex: 1 }} />
                <div style={{ flex: 1 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 16px 0', gap: 4 }}>
                <button onClick={() => curIdx > 0 && handleSelect(ALL_SIDEBAR_ITEMS[curIdx - 1].id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, fontSize: 16, opacity: curIdx > 0 ? 0.5 : 0.2 }}>▲</button>
                <button onClick={() => curIdx < ALL_SIDEBAR_ITEMS.length - 1 && handleSelect(ALL_SIDEBAR_ITEMS[curIdx + 1].id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, fontSize: 16, opacity: curIdx < ALL_SIDEBAR_ITEMS.length - 1 ? 0.5 : 0.2 }}>▼</button>
              </div>
              <div className='max-w-[760px] mx-auto px-3 sm:px-6 mt-2 mb-15'>
                <div className='bg-white rounded-xl p-5 sm:p-8 md:p-12 border border-[#eee] min-h-[400px]'>
                  {curItemContent?.free ? (
                    <>
                      <h1 className='text-xl sm:text-2xl md:text-[28px] font-bold text-[#111] mb-5'>{curItemLabel}</h1>
                      {aiBarVisible && (
                        <div style={{ background: '#fefbeb', border: '1px solid #f0e8c0', borderRadius: 10, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                          <span style={{ fontSize: 16 }}>✨</span>
                          <span style={{ fontWeight: 600, fontSize: 13, color: '#333' }}>AI Edit</span>
                          <span style={{ fontSize: 13, color: '#888' }}>Select text or click anywhere to edit with AI.</span>
                          <div style={{ flex: 1 }} />
                          <button onClick={() => setAiBarVisible(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#999' }}>×</button>
                        </div>
                      )}
                      {curItemContent.highlight && (
                        <div style={{ background: '#fefbeb', borderRadius: 10, padding: '18px 22px', marginBottom: 24, borderLeft: '4px solid #e8d44d' }}>
                          <p style={{ fontSize: 16, fontWeight: 600, color: '#333', margin: 0, lineHeight: 1.5 }}>{curItemContent.highlight}</p>
                        </div>
                      )}
                      {curItemContent.body && (
                        <p style={{ fontSize: 15, lineHeight: 1.75, color: '#444', margin: '0 0 28px' }}>{curItemContent.body}</p>
                      )}
                      {curItemContent.subs?.map(s => (
                        <div key={s.t} style={{ marginBottom: 24 }}>
                          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111', margin: '0 0 10px' }}>{s.t}</h3>
                          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#444', margin: 0 }}>{s.x}</p>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111', margin: '0 0 24px' }}>{curItemLabel}</h1>
                      <div style={{ background: '#fefbeb', border: '1px solid #f5f0d0', borderRadius: 12, padding: '40px 32px', textAlign: 'center' }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: '#333', marginBottom: 8 }}>Upgrade to unlock your full Innovatech Academy plan</div>
                        <div style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>This section is available with the Pro plan.</div>
                        <button onClick={openModal} style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>✦ Upgrade</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ═══ ALL PAGES VIEW ═══ */}
          {planView === 'all' && (
            <div className='mb-16'>

              {/* Upgrade pill notification */}
              <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0 16px', position: 'sticky', top: 0, zIndex: 10, pointerEvents: 'none' }}>
                <div style={{ background: '#fefce8', borderRadius: 100, padding: '8px 8px 8px 24px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', pointerEvents: 'auto' }}>
                  <span style={{ fontSize: 14, color: '#666', fontWeight: 400 }}>Upgrade to get the full business plan</span>
                  <button onClick={openModal} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#111', color: '#fff', fontSize: 13, fontWeight: 600, border: 'none', borderRadius: 22, padding: '8px 18px', cursor: 'pointer', height: 36 }}>
                    <Crown style={{ width: 16, height: 16 }} /> Upgrade
                  </button>
                </div>
              </div>

              {/* Upgrade section */}
              <div style={{ padding: '16px 0 0' }}>
                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', padding: '28px 32px 24px' }}>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: '0 0 16px', letterSpacing: '-0.01em' }}>Upgrade to get the full business plan</h2>
                  {/* Progress bar */}
                  <div style={{ height: 6, borderRadius: 999, overflow: 'hidden', display: 'flex', marginBottom: 10 }}>
                    <div style={{ width: '28%', background: '#16A34A' }} />
                    <div style={{ flex: 1, background: '#C4B5FD' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 20, borderTop: '1px solid #E5E7EB', paddingTop: 10 }}>
                    <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Free pages <span style={{ fontWeight: 700 }}>14</span></span>
                    <div style={{ width: 1, height: 16, background: '#C4B5FD', margin: '0 16px' }} />
                    <span style={{ fontSize: 13, color: '#7C3AED', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Zap style={{ width: 13, height: 13 }} /> Pro pages <span style={{ fontWeight: 700 }}>36</span>
                    </span>
                  </div>
                  <button onClick={openModal} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#111827', color: '#fff', fontWeight: 700, fontSize: 13, border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer' }}>
                    <Zap style={{ width: 14, height: 14 }} /> Get full plan
                  </button>
                </div>
              </div>

              <div>
                {/* Document */}
                <DocumentSection
                  scheme={COLOR_SCHEMES[selectedScheme]}
                  onOpenExport={() => setIsExportModalOpen(true)}
                  onOpenOutline={() => setIsOutlineModalOpen(true)}
                  onAddPage={handleLockedAction}
                  exportConfig={exportConfig}
                />

                {/* Overview */}
                <Section id='overview' title='Overview' onAddPage={handleLockedAction}>
                  <CardGrid>
                    <ExecutiveSummaryCard
                      onViewAction={handleLockedAction}
                      onCopyAction={handleLockedAction}
                      onDeleteAction={handleDeleteAction}
                    />
                    <SwotCard
                      onViewAction={handleLockedAction}
                      onCopyAction={handleLockedAction}
                      onDeleteAction={handleDeleteAction}
                    />
                    <BusinessModelsCard
                      onViewAction={handleLockedAction}
                      onCopyAction={handleLockedAction}
                      onDeleteAction={handleDeleteAction}
                    />
                    <ViabilityCard
                      onViewAction={handleLockedAction}
                      onCopyAction={handleLockedAction}
                      onDeleteAction={handleDeleteAction}
                    />
                  </CardGrid>
                </Section>

                {/* Market Research */}
                <Section id='market-research' title='Market Research' onAddPage={handleLockedAction}>
                  <CardGrid>
                    <IndustryOverviewCard
                      onViewAction={handleLockedAction}
                      onCopyAction={handleLockedAction}
                      onDeleteAction={handleDeleteAction}
                    />
                    <TargetAudienceCard
                      onViewAction={handleLockedAction}
                      onCopyAction={handleLockedAction}
                      onDeleteAction={handleDeleteAction}
                    />
                    <MarketSizeCard
                      onViewAction={handleLockedAction}
                      onCopyAction={handleLockedAction}
                      onDeleteAction={handleDeleteAction}
                    />
                    <LockedCard title='Competitor Analysis' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                  </CardGrid>
                </Section>

                {/* Products & Services */}
                <Section id='products-services' title='Products & Services' onAddPage={handleLockedAction}>
                  <CardGrid>
                    <FadeCard
                      title='Marketing Overview'
                      showActions
                      onViewAction={handleLockedAction}
                      onCopyAction={handleLockedAction}
                      onDeleteAction={handleDeleteAction}
                      items={[
                        'Introduction to STEM Academy',
                        'Online and Hybrid Learning Model',
                        'Subscription-Based Learning Pla...',
                      ]}
                    />
                    <FadeCard
                      title='Expansion Opportunities'
                      showActions
                      onViewAction={handleLockedAction}
                      onCopyAction={handleLockedAction}
                      onDeleteAction={handleDeleteAction}
                      items={[
                        'STEM-Themed Escape Room',
                        'Augmented Reality STEM Field Trips',
                        'STEM Culinary Workshops',
                        'Robotics Pet Companions',
                        'STEM-Themed Virtual Reality Co...',
                      ]}
                    />
                    <LockedCard title='Secondary Offerings' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                    <LockedCard title='Customer Service' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                  </CardGrid>
                </Section>

                {/* Sales & Marketing */}
                <Section id='sales-marketing' title='Sales & Marketing' onAddPage={handleLockedAction}>
                  <CardGrid>
                    <MarketingOverviewCard
                      onViewAction={handleLockedAction}
                      onCopyAction={handleLockedAction}
                      onDeleteAction={handleDeleteAction}
                    />
                    <BrandingCard
                      onViewAction={handleLockedAction}
                      onCopyAction={handleLockedAction}
                      onDeleteAction={handleDeleteAction}
                    />
                    <FadeCard
                      title='Customer Retention'
                      showActions
                      onViewAction={handleLockedAction}
                      onCopyAction={handleLockedAction}
                      onDeleteAction={handleDeleteAction}
                      items={[
                        'Personalized Learning Plans',
                        'STEM Clubs and Extracurricular',
                        'Parent Engagement Programs',
                        'Alumni Network and Mentorship',
                        'Recognition and Rewards Progra...',
                      ]}
                    />
                    <LockedCard title='Online Presence' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                    <LockedCard title='Social Media' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                    <LockedCard title='SEO & Content' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                    <LockedCard title='Digital Marketing' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                    <LockedCard title='Community Engagement' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                  </CardGrid>
                </Section>

                {/* Financials */}
                <Section id='financials' title='Financials' onAddPage={handleLockedAction}>
                  <CardGrid>
                    <RevenueCard
                      onViewAction={handleLockedAction}
                      onCopyAction={handleLockedAction}
                      onDeleteAction={handleDeleteAction}
                    />
                    <LockedCard title='Expenses' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                    <LockedCard title='Financing' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                    <LockedCard title='Dividends' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                    <LockedCard title='Taxes' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                    <LockedCard title='Profit & Loss' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                    <LockedCard title='Balance Sheet' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                    <LockedCard title='Cash Flow' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                    <LockedCard title='Funding Plan' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                  </CardGrid>
                </Section>

                {/* Operations */}
                <Section id='operations' title='Operations' onAddPage={handleLockedAction}>
                  <CardGrid>
                    <FadeCard
                      title='Team & Roles'
                      showActions
                      onViewAction={handleLockedAction}
                      onCopyAction={handleLockedAction}
                      onDeleteAction={handleDeleteAction}
                      items={[
                        'Principal',
                        'STEM Curriculum Coordinator',
                        'Lead Science Teacher',
                        'Technology Integration Specialist',
                        'Student Counselor',
                      ]}
                    />
                    <LockedCard title='Operations Plan' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                    <LockedCard title='Risk Analysis' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                    <LockedCard title='Regulatory Compliance' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                  </CardGrid>
                </Section>

                {/* Implementation Plan */}
                <Section id='implementation' title='Implementation Plan' onAddPage={handleLockedAction}>
                  <CardGrid>
                    <LockedCard title='Pre-Launch' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                    <LockedCard title='Post-Launch' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                    <LockedCard title='5 Year Plan' onViewAction={handleLockedAction} onCopyAction={handleLockedAction} onDeleteAction={handleDeleteAction} />
                  </CardGrid>
                </Section>

              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export Panel */}
      <ExportBusinessPlanModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onConfigChange={setExportConfig}
      />

      {/* Edit Outline Modal — opens when clicking Table of Contents card */}
      <EditOutlineModal
        isOpen={isOutlineModalOpen}
        onClose={() => setIsOutlineModalOpen(false)}
        sections={sidebarSections}
      />
    </div>
  )
}

export default BusinessPlanDashboard
