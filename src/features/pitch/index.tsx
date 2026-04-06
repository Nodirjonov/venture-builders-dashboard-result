import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  Hexagon,
  Image,
  Italic,
  Keyboard,
  Layers,
  LayoutGrid,
  Loader2,
  MoreHorizontal,
  Paintbrush,
  Pencil,
  Play,
  Plus,
  Printer,
  Redo2,
  RefreshCw,
  Sliders,
  Sparkles,
  Trash2,
  Type,
  Underline as UnderlineIcon,
  Undo2,
  X,
} from 'lucide-react'
import { generateTemplateSlides } from './slide-generator'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

/* ═══════════════════ TYPES ═══════════════════ */

export type ShapeType = 'square' | 'rounded-rect' | 'circle' | 'semicircle' | 'triangle' | 'parallelogram' | 'diamond' | 'pentagon' | 'hexagon' | 'octagon'

export interface SlideElement {
  id: string
  type: 'text' | 'shape' | 'image'
  x: number
  y: number
  width: number
  height: number
  content?: string
  textStyle?: 'h1' | 'h2' | 'h3' | 'h4' | 'normal' | 'bullet' | 'ordered'
  fontSize?: number
  fontColor?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  textAlign?: 'left' | 'center' | 'right'
  shapeType?: ShapeType
  shapeVariant?: 'filled' | 'border'
  fillColor?: string
  imageUrl?: string
  rotation?: number
  shadow?: boolean
}

export interface SlideData {
  id: string
  title: string
  subtitle?: string
  type: 'cover' | 'content' | 'split' | 'stats' | 'blank'
  elements?: SlideElement[]
  bgColor?: string
}

interface PitchDeck {
  id: string
  name: string
  thumbnail: string
  color: string
  editedAt: Date
  slides: SlideData[]
}

interface Template {
  id: string
  name: string
  coverColor: string
  coverImage: string
  accentColor: string
  slides: SlideData[]
}

/* ═══════════════════ DATA ═══════════════════ */

const u1 = ['https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200', 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1200', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200', 'https://images.unsplash.com/photo-1510844355160-2fb07bf9af75?q=80&w=1200']
const u2 = ['https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200', 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200', 'https://images.unsplash.com/photo-1620325867502-221ddb5b4e29?q=80&w=1200']
const u3 = ['https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200', 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=1200', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200', 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=1200']
const u4 = ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200', 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200', 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200', 'https://images.unsplash.com/photo-1553484771-371a605b060b?q=80&w=1200', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200', 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1200']

const templatesData: Template[] = [
  {
    id: 'innovative-solutions', name: 'Innovative Solutions Pitch Deck', coverColor: '#0d1b2a',
    coverImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80', accentColor: '#ffffff',
    slides: generateTemplateSlides('Innovative Solutions', 'Pitch Deck 2024', u1, '#0d1b2a'),
  },
  {
    id: 'service-nova', name: 'Service Nova Pitch Deck', coverColor: '#c0392b',
    coverImage: '', accentColor: '#ffffff',
    slides: generateTemplateSlides('Service Nova', 'Next-Gen Solutions', u2, '#c0392b'),
  },
  {
    id: 'portfolio-plus', name: 'Portfolio Plus Pitch Deck', coverColor: '#f0f0f0',
    coverImage: '', accentColor: '#1a1a2e',
    slides: generateTemplateSlides('Portfolio Plus', 'Showcasing Excellence', u3, '#f0f0f0'),
  },
  {
    id: 'strategy-forge', name: 'Strategy Forge Pitch Deck', coverColor: '#1a1a1a',
    coverImage: '', accentColor: '#ffffff',
    slides: generateTemplateSlides('STRATEGY FORGE', 'By Alba Castro', u4, '#1a1a1a'),
  },
  {
    id: 'vision-craft', name: 'Vision Craft Pitch Deck', coverColor: '#f5f0e8',
    coverImage: '', accentColor: '#2c2c2c',
    slides: generateTemplateSlides('Vision Craft', 'New Business Opportunity', u1, '#f5f0e8'),
  },
  {
    id: 'inno-solve', name: 'Inno Solve Pitch Deck', coverColor: '#ffffff',
    coverImage: '', accentColor: '#2563eb',
    slides: generateTemplateSlides('Inno Solve', 'hello@innosolve.com', u2, '#ffffff'),
  },
  {
    id: 'service-pro', name: 'Service Pro Pitch Deck', coverColor: '#1c1c1c',
    coverImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80', accentColor: '#f8f8f8',
    slides: generateTemplateSlides('Service Pro', 'Enterprise Solutions', u3, '#1c1c1c'),
  },
]

const initialPitches: PitchDeck[] = [
  {
    id: 'p1',
    name: 'Veltro Vision',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    color: '#f5f0e8',
    editedAt: new Date(Date.now() - 36000),
    slides: [
      { id: 'v1', title: 'Innovating', subtitle: 'Revolutionizing Solutions with Cutting-Edge Precision', type: 'cover' },
      { id: 'v2', title: 'Veltro Solutions', subtitle: 'Driving Value Propositions', type: 'content' },
      { id: 'v3', title: 'Bridging', subtitle: 'The gap between technology and business', type: 'split' },
      { id: 'v4', title: 'Transformative Tech', subtitle: 'Our flagship platform overview', type: 'content' },
      { id: 'v5', title: 'Comprehensive Service Suite', subtitle: 'End-to-end delivery', type: 'split' },
      { id: 'v6', title: 'Key Features Unveiled', subtitle: '', type: 'stats' },
      { id: 'v7', title: 'Market Size', subtitle: '$855 Billion total addressable market', type: 'stats' },
    ],
  },
  {
    id: 'p2',
    name: 'Untitled',
    thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80',
    color: '#0f1e3a',
    editedAt: new Date(Date.now() - 120000),
    slides: [
      { id: 'u1', title: 'Pitch Deck', subtitle: 'Company Name', type: 'cover' },
    ],
  },
]

/* ═══════════════════ HELPERS ═══════════════════ */

function formatRelativeTime(date: Date): string {
  const diff = Date.now() - date.getTime()
  if (diff < 60000) return `Edited ${Math.max(1, Math.floor(diff / 1000))} sec ago`
  if (diff < 3600000) return `Edited ${Math.floor(diff / 60000)} min ago`
  return `Edited ${Math.floor(diff / 3600000)} hr ago`
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

/* ═══════════════════ SHAPE & TEXT CONSTANTS ═══════════════════ */

const SHAPE_TYPES: ShapeType[] = ['square','rounded-rect','circle','semicircle','triangle','parallelogram','diamond','pentagon','hexagon','octagon']

const TEXT_STYLES: { style: SlideElement['textStyle']; label: string; fontSize: number; cls: string }[] = [
  { style: 'h1', label: 'Heading 1', fontSize: 48, cls: 'text-3xl font-bold' },
  { style: 'h2', label: 'Heading 2', fontSize: 36, cls: 'text-2xl font-bold' },
  { style: 'h3', label: 'Heading 3', fontSize: 24, cls: 'text-xl font-semibold' },
  { style: 'h4', label: 'Heading 4', fontSize: 20, cls: 'text-lg font-semibold' },
  { style: 'normal', label: 'Normal Text', fontSize: 16, cls: 'text-sm' },
  { style: 'bullet', label: '• Bullet List', fontSize: 16, cls: 'text-sm' },
  { style: 'ordered', label: '1. Ordered List', fontSize: 16, cls: 'text-sm' },
]

/* ═══════════════════ SHAPE RENDERER ═══════════════════ */

function ShapeSvg({ shapeType, variant, color }: { shapeType: ShapeType; variant: 'filled' | 'border'; color: string }) {
  const f = variant === 'filled' ? color : 'none'
  const s = variant === 'filled' ? 'none' : color
  const w = variant === 'border' ? 6 : 0
  const shapes: Record<ShapeType, React.ReactNode> = {
    'square': <rect x={5} y={5} width={90} height={90} fill={f} stroke={s} strokeWidth={w} />,
    'rounded-rect': <rect x={5} y={5} width={90} height={90} rx={15} fill={f} stroke={s} strokeWidth={w} />,
    'circle': <circle cx={50} cy={50} r={45} fill={f} stroke={s} strokeWidth={w} />,
    'semicircle': <path d="M5 55 A45 45 0 0 1 95 55 Z" fill={f} stroke={s} strokeWidth={w} />,
    'triangle': <polygon points="50,5 95,95 5,95" fill={f} stroke={s} strokeWidth={w} />,
    'parallelogram': <polygon points="25,5 95,5 75,95 5,95" fill={f} stroke={s} strokeWidth={w} />,
    'diamond': <polygon points="50,5 95,50 50,95 5,50" fill={f} stroke={s} strokeWidth={w} />,
    'pentagon': <polygon points="50,5 95,38 81,90 19,90 5,38" fill={f} stroke={s} strokeWidth={w} />,
    'hexagon': <polygon points="25,5 75,5 95,50 75,95 25,95 5,50" fill={f} stroke={s} strokeWidth={w} />,
    'octagon': <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill={f} stroke={s} strokeWidth={w} />,
  }
  return <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">{shapes[shapeType]}</svg>
}

/* ═══════════════════ CANVAS ELEMENT RENDERERS ═══════════════════ */

function CanvasTextElement({ el, editing, onEdit, onContentChange, onFinishEditing }: { el: SlideElement; editing?: boolean; onEdit?: () => void; onContentChange?: (text: string) => void; onFinishEditing?: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const style: React.CSSProperties = {
    fontSize: el.fontSize ? `calc(${el.fontSize}cqi / 12)` : `calc(16cqi / 12)`,
    color: el.fontColor ?? '#1f2937',
    fontWeight: el.bold ? 'bold' : (el.textStyle?.startsWith('h') ? 'bold' : 'normal'),
    fontStyle: el.italic ? 'italic' : 'normal',
    textDecoration: [el.underline && 'underline', el.strikethrough && 'line-through'].filter(Boolean).join(' ') || 'none',
    textAlign: el.textAlign ?? 'left',
    lineHeight: 1.15,
    wordBreak: 'break-word',
    cursor: editing ? 'text' : 'move',
    outline: 'none',
  }

  const prefix = el.textStyle === 'bullet' ? '• ' : el.textStyle === 'ordered' ? '1. ' : ''
  const displayContent = prefix + (el.content || '')

  // Keep DOM updated with store ONLY if they differ, allowing browser to manage the text during contentEditable
  useEffect(() => {
    if (ref.current && ref.current.textContent !== displayContent) {
      ref.current.textContent = displayContent
    }
  }, [displayContent])

  // When editing starts, focus and select text
  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus()
      const t = setTimeout(() => {
        const sel = window.getSelection()
        if (sel && ref.current) {
          sel.selectAllChildren(ref.current)
          sel.collapseToEnd()
        }
      }, 0)
      return () => clearTimeout(t)
    }
  }, [editing])

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (!editing) return
    const raw = e.currentTarget.textContent ?? ''
    let content = raw
    if (prefix && raw.startsWith(prefix)) {
      content = raw.substring(prefix.length)
    } else if (prefix && raw.trim() === prefix.trim()) {
      content = ''
    }
    onContentChange?.(content)
  }

  return (
    <div
      ref={ref}
      className='h-full w-full select-text whitespace-pre-wrap'
      style={style}
      contentEditable={editing}
      suppressContentEditableWarning
      onDoubleClick={(e) => { e.stopPropagation(); onEdit?.() }}
      onInput={handleInput}
      onBlur={() => {
        if (ref.current) ref.current.textContent = displayContent
        onFinishEditing?.()
      }}
      onKeyDown={(e) => {
        e.stopPropagation()
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          e.currentTarget.blur()
        }
      }}
    />
  )
}

function CanvasShapeElement({ el }: { el: SlideElement }) {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <ShapeSvg shapeType={el.shapeType ?? 'square'} variant={el.shapeVariant ?? 'filled'} color={el.fillColor ?? '#9ca3af'} />
    </div>
  )
}

/* ═══════════════════ FORMAT TOOLBAR ═══════════════════ */

function FormatToolbar({ el, onChange, onDelete }: { el: SlideElement; onChange: (u: Partial<SlideElement>) => void; onDelete?: () => void }) {
  return (
    <div className='flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1.5 shadow-xl' onClick={(e) => e.stopPropagation()}>
      <input 
        type='text' 
        value={el.content || ''} 
        onChange={(e) => onChange({ content: e.target.value })} 
        className='w-16 sm:w-24 rounded border border-gray-200 px-2 py-1 text-xs focus:ring-1 focus:ring-purple-400 focus:outline-none'
        placeholder='Text...'
      />
      <div className='h-5 w-px bg-gray-200 mx-1' />
      <input type='color' value={el.fontColor || '#1f2937'} onChange={(e) => onChange({ fontColor: e.target.value })} className='h-7 w-7 cursor-pointer rounded border-0 p-0' aria-label='Text color' />
      <input type='number' value={el.fontSize || 16} min={8} max={200} onChange={(e) => onChange({ fontSize: parseInt(e.target.value) || 16 })} className='w-10 rounded border border-gray-200 px-1 py-1 text-center text-xs' aria-label='Font size' />
      <div className='mx-0.5 h- 5 w-px bg-gray-200' />
      <button aria-label='Align left' onClick={() => onChange({ textAlign: 'left' })} className={cn('rounded p-1.5', el.textAlign === 'left' && 'bg-gray-100')}><AlignLeft className='h-4 w-4' /></button>
      <button aria-label='Align center' onClick={() => onChange({ textAlign: 'center' })} className={cn('rounded p-1.5', el.textAlign === 'center' && 'bg-gray-100')}><AlignCenter className='h-4 w-4' /></button>
      <button aria-label='Align right' onClick={() => onChange({ textAlign: 'right' })} className={cn('rounded p-1.5', el.textAlign === 'right' && 'bg-gray-100')}><AlignRight className='h-4 w-4' /></button>
      <div className='mx-0.5 h-5 w-px bg-gray-200' />
      <button aria-label='Bold' onClick={() => onChange({ bold: !el.bold })} className={cn('rounded px-2 py-1 text-xs font-bold', el.bold && 'bg-purple-500 text-white')}><Bold className='h-4 w-4' /></button>
      <button aria-label='Italic' onClick={() => onChange({ italic: !el.italic })} className={cn('rounded px-2 py-1 text-xs italic', el.italic && 'bg-purple-500 text-white')}><Italic className='h-4 w-4' /></button>
      <button aria-label='Underline' onClick={() => onChange({ underline: !el.underline })} className={cn('rounded px-2 py-1 text-xs', el.underline && 'bg-purple-500 text-white')}><UnderlineIcon className='h-4 w-4' /></button>
      <button aria-label='Toggle shadow' onClick={() => onChange({ shadow: !el.shadow })} className={cn('rounded p-1.5 text-gray-500 hover:bg-gray-100', el.shadow && 'bg-purple-100 text-purple-600')} title='Shadow'><Layers className='h-4 w-4' /></button>
      <div className='flex items-center gap-1 shrink-0'>
        <RefreshCw className='h-3.5 w-3.5 text-gray-400' />
        <input type='number' min={0} max={360} value={el.rotation || 0} onChange={(e) => onChange({ rotation: parseInt(e.target.value) || 0 })} className='w-11 rounded border border-gray-200 px-1 py-1 text-center text-xs' aria-label='Rotation degrees' />
        <span className='text-xs text-gray-400'>°</span>
      </div>
      {onDelete && (
        <>
          <div className='h-5 w-px bg-gray-200 mx-1' />
          <button aria-label='Delete' onClick={onDelete} className='rounded p-1.5 text-red-500 hover:bg-red-50'><Trash2 className='h-4 w-4' /></button>
        </>
      )}
    </div>
  )
}

/* ═══════════════════ TEMPLATE THUMBNAILS ═══════════════════ */

function InnovativeSolutionsThumb() {
  return (
    <div className='relative aspect-video w-full overflow-hidden rounded-xl' style={{ backgroundColor: '#0d1b2a' }}>
      <div className='absolute right-0 top-0 h-full w-1/2 overflow-hidden'>
        <div className='h-full w-full bg-cover bg-center' style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80)' }} />
      </div>
      <div className='absolute bottom-0 left-0 overflow-hidden p-3'>
        <div className='truncate' style={{ fontSize: 7, color: 'rgba(255,255,255,0.6)' }}>Company Name</div>
        <div className='truncate font-bold text-white' style={{ fontSize: 14 }}>Pitch Deck</div>
      </div>
      <div className='absolute bottom-1 left-0 right-0 flex justify-between overflow-hidden px-3'>
        <span className='truncate' style={{ fontSize: 6, color: 'rgba(255,255,255,0.5)' }}>January 2077</span>
        <span className='truncate' style={{ fontSize: 6, color: 'rgba(255,255,255,0.5)' }}>contact@email.com</span>
      </div>
    </div>
  )
}

function ServiceNovaThumb() {
  return (
    <div className='relative aspect-video w-full overflow-hidden rounded-xl' style={{ backgroundColor: '#c0392b' }}>
      <div className='absolute -left-8 -top-8 h-32 w-32 rounded-full bg-red-800 opacity-20' />
      <div className='absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-red-800 opacity-20' />
      <div className='absolute inset-0 flex flex-col items-center justify-center overflow-hidden'>
        <div className='truncate' style={{ fontSize: 8, color: 'rgba(255,255,255,0.7)' }}>Company name</div>
        <div className='truncate font-extrabold text-white' style={{ fontSize: 18 }}>Pitch Deck</div>
      </div>
      <div className='absolute bottom-1 left-0 right-0 truncate text-center' style={{ fontSize: 7, color: 'rgba(255,255,255,0.6)' }}>
        Name • Date
      </div>
    </div>
  )
}

function PortfolioPlusThumb() {
  return (
    <div className='relative aspect-video w-full overflow-hidden rounded-xl' style={{ backgroundColor: '#f0f0f0' }}>
      <div className='flex justify-between overflow-hidden px-3 pt-2'>
        <div className='overflow-hidden'>
          <div className='truncate text-gray-400' style={{ fontSize: 5 }}>NAME OF THE PROJECT</div>
          <div className='truncate text-gray-600' style={{ fontSize: 6 }}>your name</div>
        </div>
        <div className='flex gap-2 overflow-hidden'>
          <div className='text-right'>
            <div className='truncate text-gray-400' style={{ fontSize: 5 }}>DATE</div>
            <div className='truncate text-gray-600' style={{ fontSize: 6 }}>02/24/2024</div>
          </div>
          <div className='h-10 w-10 shrink-0 rounded-sm bg-gray-300' />
        </div>
      </div>
      <div className='mt-2 flex flex-col items-center overflow-hidden px-3'>
        <div className='truncate font-bold text-gray-900' style={{ fontSize: 16 }}>Pitch Deck</div>
        <div className='mx-auto mt-2 space-y-1' style={{ width: '75%' }}>
          <div className='h-1 w-full rounded-full bg-gray-300' />
          <div className='h-1 w-4/5 rounded-full bg-gray-300' />
          <div className='h-1 w-3/5 rounded-full bg-gray-300' />
        </div>
      </div>
      <div className='absolute bottom-1 left-0 right-0 flex justify-between overflow-hidden px-3'>
        <div className='overflow-hidden'>
          <div className='truncate text-gray-400' style={{ fontSize: 5 }}>NAME OF THE COMPANY</div>
          <div className='truncate text-gray-600' style={{ fontSize: 6 }}>your name</div>
        </div>
        <div className='overflow-hidden text-right'>
          <div className='truncate text-gray-400' style={{ fontSize: 5 }}>PRESENTED BY</div>
          <div className='truncate text-gray-600' style={{ fontSize: 6 }}>your name</div>
        </div>
      </div>
    </div>
  )
}

function StrategyForgeThumb() {
  return (
    <div className='relative aspect-video w-full overflow-hidden rounded-xl' style={{ backgroundColor: '#1a1a1a' }}>
      <div className='absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-4'>
        <div className='truncate font-light uppercase tracking-widest' style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>
          Presentation
        </div>
        <div className='mt-2 truncate font-serif font-bold text-white' style={{ fontSize: 20 }}>
          Pitch Deck
        </div>
        <div className='mt-1 truncate italic' style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>
          Alba Castro
        </div>
      </div>
    </div>
  )
}

function VisionCraftThumb() {
  return (
    <div className='relative aspect-video w-full overflow-hidden rounded-xl' style={{ backgroundColor: '#f5f0e8' }}>
      <div className='absolute inset-0 flex flex-col justify-center overflow-hidden px-6'>
        <div className='truncate font-serif font-semibold text-gray-900' style={{ fontSize: 20 }}>
          Pitch Deck
        </div>
        <div className='my-2 h-px w-full bg-gray-400' />
        <div className='truncate text-gray-500' style={{ fontSize: 8 }}>New Business Opportunity</div>
      </div>
      <div className='absolute bottom-2 left-0 right-0 overflow-hidden px-6'>
        <div className='flex justify-between'>
          <div className='overflow-hidden'>
            <div className='truncate text-gray-500' style={{ fontSize: 7 }}>John Doe, Founder &amp; CEO</div>
            <div className='truncate text-gray-500' style={{ fontSize: 7 }}>Michael Brown, Founder &amp; CTO</div>
            <div className='truncate text-gray-400' style={{ fontSize: 7 }}>13 September, 2023</div>
          </div>
          <div className='shrink-0 self-end text-gray-400' style={{ fontSize: 7 }}>Your logo</div>
        </div>
      </div>
    </div>
  )
}

function InnoSolveThumb() {
  return (
    <div className='relative aspect-video w-full overflow-hidden rounded-xl border border-gray-200' style={{ backgroundColor: '#ffffff' }}>
      <div className='flex justify-between overflow-hidden px-3 pt-2'>
        <span className='truncate text-gray-400' style={{ fontSize: 6 }}>Your logo</span>
        <span className='truncate text-gray-400' style={{ fontSize: 6 }}>Date/Time/Year</span>
      </div>
      <div className='flex flex-col items-center justify-center overflow-hidden pt-3'>
        <div className='truncate text-blue-500' style={{ fontSize: 8 }}>Company Name</div>
        <div className='truncate font-extrabold text-blue-600' style={{ fontSize: 22 }}>Pitch Deck</div>
        <div className='mt-1 h-0.5 bg-blue-500' style={{ width: '75%' }} />
      </div>
      <div className='absolute bottom-1 left-0 right-0 grid grid-cols-3 gap-1 overflow-hidden px-3 pb-1'>
        <div className='overflow-hidden'>
          <div className='truncate text-gray-400' style={{ fontSize: 5 }}>Address</div>
          <div className='truncate text-gray-600' style={{ fontSize: 5 }}>123 Anywhere St...</div>
        </div>
        <div className='overflow-hidden text-center'>
          <div className='truncate text-gray-400' style={{ fontSize: 5 }}>Telephone</div>
          <div className='truncate text-gray-600' style={{ fontSize: 5 }}>+123-456-789</div>
        </div>
        <div className='overflow-hidden text-right'>
          <div className='truncate text-gray-400' style={{ fontSize: 5 }}>Website</div>
          <div className='truncate text-gray-600' style={{ fontSize: 5 }}>anywhere.com</div>
        </div>
      </div>
    </div>
  )
}

function ServiceProThumb() {
  return (
    <div className='relative aspect-video w-full overflow-hidden rounded-xl' style={{ backgroundColor: '#1c1c1c' }}>
      <div className='relative overflow-hidden' style={{ height: '40%' }}>
        <div className='flex justify-between overflow-hidden px-3 pt-2'>
          <span className='truncate' style={{ fontSize: 6, color: 'rgba(255,255,255,0.4)' }}>Your logo</span>
          <span className='truncate' style={{ fontSize: 6, color: 'rgba(255,255,255,0.4)' }}>Date/Time/Year</span>
        </div>
        <div className='mt-1 overflow-hidden px-3'>
          <div className='truncate font-bold text-white' style={{ fontSize: 12 }}>Pitch Deck</div>
          <div className='mt-0.5 truncate' style={{ fontSize: 6, color: 'rgba(255,255,255,0.5)' }}>Input your summary of what</div>
          <div className='truncate' style={{ fontSize: 6, color: 'rgba(255,255,255,0.5)' }}>your purpose here...</div>
        </div>
        <div className='mx-3 mt-1 bg-gray-600' style={{ width: '33%', height: 1 }} />
      </div>
      <div className='overflow-hidden bg-cover bg-center' style={{ height: '60%', backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80)' }} />
    </div>
  )
}

function TemplateThumbnailById({ templateId }: { templateId: string }) {
  switch (templateId) {
    case 'innovative-solutions': return <InnovativeSolutionsThumb />
    case 'service-nova': return <ServiceNovaThumb />
    case 'portfolio-plus': return <PortfolioPlusThumb />
    case 'strategy-forge': return <StrategyForgeThumb />
    case 'vision-craft': return <VisionCraftThumb />
    case 'inno-solve': return <InnoSolveThumb />
    case 'service-pro': return <ServiceProThumb />
    default: return <div className='aspect-video w-full rounded-xl bg-gray-200' />
  }
}

/* ═══════════════════ SLIDE RENDERERS ═══════════════════ */



function CanvasSlide({ slide, deck, thumbOpacity }: { slide: SlideData; deck: PitchDeck; thumbOpacity?: number }) {
  const effectiveBgColor = slide.bgColor || deck.color
  const isDark = ['#0f1e3a', '#0d1b2a', '#1c1c1c', '#1a1a1a', '#1a1a2e', '#c0392b'].includes(effectiveBgColor)
  const textColor = isDark ? '#f3f4f6' : '#1f2937'
  const subtextColor = isDark ? 'rgba(255,255,255,0.55)' : '#6b7280'
  const barColor = isDark ? 'rgba(255,255,255,0.15)' : '#d1d5db'

  return (
    <div className='relative aspect-video w-full max-w-[1000px] @container overflow-hidden' style={{ backgroundColor: effectiveBgColor }}>
      {slide.type === 'cover' && (
        <>
          <div className='flex items-center justify-between overflow-hidden px-8 pt-6'>
            <span className='truncate text-sm' style={{ color: subtextColor }}>Your logo</span>
            <span className='truncate text-sm' style={{ color: subtextColor }}>Date/Time/Year</span>
          </div>
          <div className='overflow-hidden px-8 pt-8'>
            <div className='inline-block rounded border-2 border-blue-400 px-2 py-1'>
              <h2 className='overflow-hidden font-bold leading-tight' style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', color: textColor }}>
                {slide.title}
              </h2>
            </div>
            {slide.subtitle && <p className='mt-4 max-w-lg overflow-hidden text-base' style={{ color: subtextColor }}>{slide.subtitle}</p>}
            <div className='mt-4 h-px w-full' style={{ backgroundColor: barColor }} />
          </div>
          {deck.thumbnail && (
            <div className='absolute bottom-0 left-0 right-0 h-48 overflow-hidden'>
              <div className='h-full w-full bg-cover bg-center' style={{ backgroundImage: `url(${deck.thumbnail})`, opacity: thumbOpacity ?? 0.35 }} />
            </div>
          )}
        </>
      )}
      {slide.type === 'content' && (
        <div className='overflow-hidden px-8 py-6'>
          <h3 className='mb-4 overflow-hidden text-2xl font-bold' style={{ color: textColor }}>{slide.title}</h3>
          {slide.subtitle && <p className='mb-4 overflow-hidden text-sm' style={{ color: subtextColor }}>{slide.subtitle}</p>}
          <div className='space-y-3'>
            <div className='h-2 w-full rounded-full' style={{ backgroundColor: barColor }} />
            <div className='h-2 w-4/5 rounded-full' style={{ backgroundColor: barColor }} />
            <div className='h-2 w-3/5 rounded-full' style={{ backgroundColor: barColor }} />
          </div>
        </div>
      )}
      {slide.type === 'split' && (
        <div className='flex h-full overflow-hidden'>
          <div className='flex w-1/2 flex-col overflow-hidden px-8 py-6'>
            <h3 className='mb-3 overflow-hidden text-2xl font-bold' style={{ color: textColor }}>{slide.title}</h3>
            {slide.subtitle && <p className='mb-3 overflow-hidden text-sm' style={{ color: subtextColor }}>{slide.subtitle}</p>}
            <div className='space-y-2'>
              <div className='h-2 w-full rounded-full' style={{ backgroundColor: barColor }} />
              <div className='h-2 w-3/4 rounded-full' style={{ backgroundColor: barColor }} />
            </div>
          </div>
          <div className='w-1/2 bg-gray-300 opacity-20' />
        </div>
      )}
      {slide.type === 'stats' && (
        <div className='overflow-hidden px-8 py-6'>
          <h3 className='mb-6 overflow-hidden text-2xl font-bold' style={{ color: textColor }}>{slide.title}</h3>
          {slide.subtitle && <p className='mb-4 overflow-hidden text-sm' style={{ color: subtextColor }}>{slide.subtitle}</p>}
          <div className='grid grid-cols-3 gap-6'>
            {['Seamless', 'Cutting-edge', 'Cost-effective'].map((label, i) => (
              <div key={i} className='overflow-hidden text-center'>
                <div className='text-4xl font-bold' style={{ color: textColor }}>{(i + 1) * 33}%</div>
                <div className='mt-1 text-xs' style={{ color: subtextColor }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {slide.type === 'blank' && (
        <div className='absolute inset-0' />
      )}
      {/* ELEMENTS OVERLAY */}
      {slide.elements && slide.elements.length > 0 && (
        <div className='absolute inset-0'>
          {slide.elements.map((el) => (
            <div key={el.id} className='absolute' style={{ left: `${el.x}%`, top: `${el.y}%`, width: `${el.width}%`, height: `${el.height}%` }}>
              {el.type === 'text' && <CanvasTextElement el={el} />}
              {el.type === 'shape' && <CanvasShapeElement el={el} />}
              {el.type === 'image' && el.imageUrl && <img src={el.imageUrl} alt='' className='h-full w-full object-cover' />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


/* ═══════════════════ HERO ILLUSTRATION ═══════════════════ */

function HeroIllustration() {
  return (
    <div className='w-64 opacity-70'>
      <div className='rounded-xl border border-gray-200 bg-white p-3 shadow-md'>
        <div className='mb-3 flex items-center gap-1.5'>
          {['🔗', '🔄', 'T', '🖼', '▦'].map((icon, i) => (
            <div key={i} className='flex h-6 w-6 items-center justify-center rounded bg-gray-100 text-[10px] text-gray-400'>
              {icon}
            </div>
          ))}
        </div>
        <div className='flex gap-4'>
          <div className='flex flex-1 flex-col gap-2'>
            <div className='h-2 w-full rounded-full bg-gray-200' />
            <div className='h-2 w-4/5 rounded-full bg-gray-200' />
            <div className='h-2 w-3/5 rounded-full bg-gray-200' />
            <div className='h-2 w-4/6 rounded-full bg-gray-200' />
          </div>
          <div className='w-20'>
            <svg viewBox='0 0 80 50' className='h-full w-full'>
              <polyline points='0,40 15,35 30,20 45,25 60,10 80,15' fill='none' stroke='#3b82f6' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════ PITCH EDITOR (full page) ═══════════════════ */

const DECK_COLORS = ['#f5f0e8','#0f1e3a','#1c1c1c','#f0f0ec','#ffffff','#c0392b','#1a1a2e','#2563eb']

type SaveStatus = 'saved' | 'saving' | 'unsaved'
type RightPanelType = 'theme' | 'properties' | 'layouts' | 'adjustments' | 'slides' | null

function downloadBlob(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

function PitchEditor({ deck, onClose, onSave }: { deck: PitchDeck; onClose: () => void; onSave: (d: PitchDeck) => void }) {
  const [localDeck, setLocalDeck] = useState<PitchDeck>(deck)
  const [history, setHistory] = useState<PitchDeck[]>([deck])
  const [historyIdx, setHistoryIdx] = useState(0)
  const [slideIdx, setSlideIdx] = useState(0)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewIdx, setPreviewIdx] = useState(0)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const [rightPanel, setRightPanel] = useState<RightPanelType>(null)
  const [thumbnailOpacity, setThumbnailOpacity] = useState(0.35)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const imgInputRef = useRef<HTMLInputElement>(null)

  const currentSlide = localDeck.slides[slideIdx]
  const canUndo = historyIdx > 0
  const canRedo = historyIdx < history.length - 1

  function triggerSave() {
    setSaveStatus('unsaved')
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => { setSaveStatus('saving'); setTimeout(() => setSaveStatus('saved'), 500) }, 1500)
  }
  useEffect(() => () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current) }, [])

  function pushHistory(newDeck: PitchDeck) {
    const next = history.slice(0, historyIdx + 1)
    setHistory([...next, newDeck])
    setHistoryIdx(next.length)
    setLocalDeck(newDeck)
    triggerSave()
  }
  function handleUndo() { if (!canUndo) return; const idx = historyIdx - 1; setHistoryIdx(idx); setLocalDeck(history[idx]) }
  function handleRedo() { if (!canRedo) return; const idx = historyIdx + 1; setHistoryIdx(idx); setLocalDeck(history[idx]) }

  function handleRandomizeColor() {
    const ci = DECK_COLORS.indexOf(localDeck.color)
    const next = DECK_COLORS[(ci + 1) % DECK_COLORS.length]
    pushHistory({ ...localDeck, color: next })
  }
  function handleAddSlide() {
    const ns: SlideData = { id: uid(), title: '', subtitle: '', type: 'blank', elements: [], bgColor: '#ffffff' }
    const slides = [...localDeck.slides, ns]
    pushHistory({ ...localDeck, slides })
    setSlideIdx(slides.length - 1)
  }
  function handleDeleteSlide(index: number) {
    if (localDeck.slides.length <= 1) return
    const slides = localDeck.slides.filter((_, i) => i !== index)
    pushHistory({ ...localDeck, slides })
    if (slideIdx >= index && slideIdx > 0) setSlideIdx(slideIdx - 1)
    else if (slideIdx >= slides.length) setSlideIdx(slides.length - 1)
  }
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    pushHistory({ ...localDeck, thumbnail: URL.createObjectURL(file) })
  }
  function toggleRightPanel(p: RightPanelType) { setRightPanel(prev => prev === p ? null : p) }

  // Element state
  const [selectedElId, setSelectedElId] = useState<string | null>(null)
  const [editingElId, setEditingElId] = useState<string | null>(null)
  const [shapesPopover, setShapesPopover] = useState(false)
  const [textPopover, setTextPopover] = useState(false)
  type DragHandle = 'move' | 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w' | 'rotate'
  const [dragState, setDragState] = useState<{ handle: DragHandle; elId: string; startX: number; startY: number; origX: number; origY: number; origW: number; origH: number } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [canvasRect, setCanvasRect] = useState<{ offsetLeft: number; offsetTop: number; offsetWidth: number; offsetHeight: number } | null>(null)

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const update = () => setCanvasRect({ offsetLeft: el.offsetLeft, offsetTop: el.offsetTop, offsetWidth: el.offsetWidth, offsetHeight: el.offsetHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [selectedElId])

  const selectedEl = selectedElId ? currentSlide?.elements?.find(e => e.id === selectedElId) ?? null : null

  function updateSlideElements(newElements: SlideElement[]) {
    pushHistory({ ...localDeck, slides: localDeck.slides.map((s, i) => i === slideIdx ? { ...s, elements: newElements } : s) })
  }

  function addTextElement(textStyle: SlideElement['textStyle'], fontSize: number) {
    const els = currentSlide?.elements ?? []
    const newEl: SlideElement = { id: uid(), type: 'text', x: 30, y: 15, width: 40, height: 15, content: textStyle === 'bullet' ? 'List item' : textStyle === 'ordered' ? 'List item' : textStyle?.startsWith('h') ? `${TEXT_STYLES.find(t => t.style === textStyle)?.label ?? 'Text'}` : 'Text', textStyle, fontSize, fontColor: '#1f2937', bold: textStyle?.startsWith('h') ?? false, textAlign: 'left' }
    updateSlideElements([...els, newEl])
    setSelectedElId(newEl.id)
    setTextPopover(false)
  }

  function addShapeElement(shapeType: ShapeType, variant: 'filled' | 'border') {
    const els = currentSlide?.elements ?? []
    const newEl: SlideElement = { id: uid(), type: 'shape', x: 35, y: 25, width: 20, height: 35, shapeType, shapeVariant: variant, fillColor: '#9ca3af' }
    updateSlideElements([...els, newEl])
    setSelectedElId(newEl.id)
    setShapesPopover(false)
  }

  function updateElement(elId: string, updates: Partial<SlideElement>) {
    const els = currentSlide?.elements ?? []
    updateSlideElements(els.map(e => e.id === elId ? { ...e, ...updates } : e))
  }

  const imgElInputRef = useRef<HTMLInputElement>(null)
  function handleImageElementUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    const url = URL.createObjectURL(file)
    const els = currentSlide?.elements ?? []
    const newEl: SlideElement = { id: uid(), type: 'image', x: 20, y: 15, width: 30, height: 40, imageUrl: url }
    updateSlideElements([...els, newEl])
    setSelectedElId(newEl.id)
    e.target.value = ''
  }

  function deleteSelectedElement() {
    if (!selectedElId) return
    const els = currentSlide?.elements ?? []
    updateSlideElements(els.filter(e => e.id !== selectedElId))
    setSelectedElId(null)
  }

  // Canvas drag handlers
  function handleCanvasMouseDown(e: React.MouseEvent | React.TouchEvent | TouchEvent, elId: string, elX: number, elY: number, elW: number, elH: number, handle: DragHandle = 'move') {
    if (editingElId === elId && handle === 'move') {
      e.stopPropagation(); return
    }
    e.stopPropagation(); e.preventDefault()
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY
    setDragState({ handle, elId, startX: clientX, startY: clientY, origX: elX, origY: elY, origW: elW, origH: elH })
  }
  function handleCanvasMouseMove(e: React.MouseEvent | React.TouchEvent | TouchEvent) {
    if (!dragState || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY
    const dx = ((clientX - dragState.startX) / rect.width) * 100
    const dy = ((clientY - dragState.startY) / rect.height) * 100
    
    let nx = dragState.origX
    let ny = dragState.origY
    let nw = dragState.origW
    let nh = dragState.origH

    if (dragState.handle === 'move') {
      nx = dragState.origX + dx
      ny = dragState.origY + dy
    } else if (dragState.handle === 'rotate') {
      const elCenterX = rect.left + (dragState.origX + dragState.origW / 2) / 100 * rect.width
      const elCenterY = rect.top + (dragState.origY + dragState.origH / 2) / 100 * rect.height
      const angle = Math.atan2(clientY - elCenterY, clientX - elCenterX) * (180 / Math.PI) + 90
      const snapped = Math.round(angle)
      const els = currentSlide?.elements ?? []
      const updated = els.map(el => el.id === dragState.elId ? { ...el, rotation: ((snapped % 360) + 360) % 360 } : el)
      setLocalDeck({ ...localDeck, slides: localDeck.slides.map((s, i) => i === slideIdx ? { ...s, elements: updated } : s) })
      return
    } else {
       if (dragState.handle.includes('w')) { nx = dragState.origX + Math.min(dx, dragState.origW - 2); nw = Math.max(2, dragState.origW - dx) }
       if (dragState.handle.includes('e')) { nw = Math.max(2, dragState.origW + dx) }
       if (dragState.handle.includes('n')) { ny = dragState.origY + Math.min(dy, dragState.origH - 2); nh = Math.max(2, dragState.origH - dy) }
       if (dragState.handle.includes('s')) { nh = Math.max(2, dragState.origH + dy) }
    }

    const els = currentSlide?.elements ?? []
    const updated = els.map(el => el.id === dragState.elId ? { ...el, x: nx, y: ny, width: nw, height: nh } : el)
    setLocalDeck({ ...localDeck, slides: localDeck.slides.map((s, i) => i === slideIdx ? { ...s, elements: updated } : s) })
  }
  function handleCanvasMouseUp() {
    if (dragState) { triggerSave(); setDragState(null) }
  }

  // Delete element on backspace/delete
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (['INPUT','TEXTAREA'].includes(tag)) return
      if ((e.target as HTMLElement).isContentEditable) return
      if (editingElId) return
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElId) { e.preventDefault(); deleteSelectedElement() }
    }
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h)
  })

  function exportJSON() { downloadBlob(JSON.stringify(localDeck, null, 2), `${localDeck.name}.json`, 'application/json') }
  function exportHTML() {
    const isDk = (c: string) => ['#0f1e3a','#1c1c1c','#1a1a1a','#c0392b'].includes(c)
    const html = localDeck.slides.map((s, i) => `<div style="background:${localDeck.color};padding:48px;min-height:100vh;display:${i===0?'flex':'none'};flex-direction:column;justify-content:center;"><h1 style="font-size:3rem;font-weight:bold;color:${isDk(localDeck.color)?'#fff':'#1f2937'}">${s.title}</h1>${s.subtitle?`<p style="margin-top:1rem;color:#6b7280">${s.subtitle}</p>`:''}</div>`).join('')
    downloadBlob(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${localDeck.name}</title></head><body style="margin:0">${html}</body></html>`, `${localDeck.name}.html`, 'text/html')
  }

  // Preview keyboard nav
  useEffect(() => {
    if (!previewOpen) return
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setPreviewIdx(i => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setPreviewIdx(i => Math.min(localDeck.slides.length - 1, i + 1))
      if (e.key === 'Escape') setPreviewOpen(false)
    }
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h)
  }, [previewOpen, localDeck.slides.length])

  // Global editor keyboard shortcuts
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (['INPUT','TEXTAREA'].includes(tag)) return
      if ((e.target as HTMLElement).isContentEditable) return
      if (editingElId) return
      if (e.key === 'ArrowLeft') setSlideIdx(i => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setSlideIdx(i => Math.min(localDeck.slides.length - 1, i + 1))
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); handleUndo() }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); handleRedo() }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); triggerSave() }
    }
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h)
  })

  const rightPanelButtons = useMemo<{ Icon: typeof Paintbrush; label: string; action: () => void }[]>(() => [
    { Icon: Paintbrush, label: 'Theme', action: () => toggleRightPanel('theme') },
    { Icon: LayoutGrid, label: 'Layouts', action: () => toggleRightPanel('layouts') },
    { Icon: RefreshCw, label: 'Randomize', action: handleRandomizeColor },
    { Icon: Keyboard, label: 'Shortcuts', action: () => setShortcutsOpen(true) },
    { Icon: Sliders, label: 'Adjustments', action: () => toggleRightPanel('adjustments') },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  return (
    <>
      <input ref={imgInputRef} type='file' accept='image/*' className='hidden' onChange={handleImageUpload} />
      <input ref={imgElInputRef} type='file' accept='image/*' className='hidden' onChange={handleImageElementUpload} />
      <Header className='!h-12 border-b border-gray-200'>
        <div className='flex flex-1 items-center gap-2 md:gap-3 overflow-hidden'>
          <button onClick={() => { onSave(localDeck); onClose() }} aria-label='Back' className='shrink-0 rounded p-1 text-gray-500 hover:bg-gray-100'><ChevronLeft className='h-4 w-4' /></button>
          <span className='truncate text-sm font-medium text-gray-800'>{localDeck.name}</span>
        </div>
        <div className='ml-auto flex shrink-0 items-center justify-end gap-2 md:gap-3'>
          <div className='hidden md:flex items-center gap-1 mr-2 border-r border-gray-200 pr-3'>
            <button onClick={handleUndo} disabled={!canUndo} aria-label='Undo' className={cn('rounded p-1 hover:bg-gray-100 text-gray-500', !canUndo && 'cursor-not-allowed opacity-30')}><Undo2 className='h-4 w-4' /></button>
            <button onClick={handleRedo} disabled={!canRedo} aria-label='Redo' className={cn('rounded p-1 hover:bg-gray-100 text-gray-500', !canRedo && 'cursor-not-allowed opacity-30')}><Redo2 className='h-4 w-4' /></button>
          </div>
          {saveStatus === 'saved' && <span className='flex items-center gap-1 text-[11px] md:text-xs text-gray-400'><CheckCircle2 className='h-3 w-3' /> <span className='hidden sm:inline'>Saved</span></span>}
          {saveStatus === 'saving' && <span className='flex items-center gap-1 text-[11px] md:text-xs text-gray-400'><Loader2 className='h-3 w-3 animate-spin' /> <span className='hidden sm:inline'>Saving</span></span>}
          {saveStatus === 'unsaved' && <span className='flex items-center gap-1 text-[11px] md:text-xs text-amber-500'><span className='h-2 w-2 rounded-full bg-amber-400' /> <span className='hidden sm:inline'>Unsaved</span></span>}
          
          <div className='hidden md:flex items-center gap-2 ml-2'>
            <Button variant='outline' size='sm' onClick={() => { setPreviewIdx(slideIdx); setPreviewOpen(true) }}><Play className='mr-1 h-3 w-3' /> Preview</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button size='sm' className='bg-gray-900 text-white hover:bg-gray-800'><Download className='mr-1 h-3 w-3' /> Export</Button></DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-48'>
                <DropdownMenuItem onClick={exportJSON}><Download className='mr-2 h-4 w-4' /> Export as JSON</DropdownMenuItem>
                <DropdownMenuItem onClick={exportHTML}><ExternalLink className='mr-2 h-4 w-4' /> Export as HTML</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(`${window.location.origin}/pitch?deck=${localDeck.id}`)}><Copy className='mr-2 h-4 w-4' /> Copy share link</DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.print()}><Printer className='mr-2 h-4 w-4' /> Print / PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Header>

      {/* UNIVERSAL TOOLBAR (Mobile: below header, Desktop: floating center top) */}
      <div className='w-full md:w-auto static md:absolute md:left-1/2 md:translate-y-[6px] md:-translate-x-1/2 md:z-[60] flex items-center gap-3 overflow-x-auto bg-gray-50 md:bg-white border-b border-gray-200 md:border md:rounded-full px-3 py-2 md:py-1 md:px-2 shadow-none md:shadow-md custom-scrollbar shrink-0'>
        {/* Mobile Undo/Redo */}
        <div className='flex md:hidden items-center gap-1 shrink-0 border-r border-gray-300 pr-2'>
          <button onClick={handleUndo} disabled={!canUndo} className={cn('rounded p-1.5 bg-white shadow-sm border border-gray-200 text-gray-700', !canUndo && 'opacity-40')}><Undo2 className='h-4 w-4' /></button>
          <button onClick={handleRedo} disabled={!canRedo} className={cn('rounded p-1.5 bg-white shadow-sm border border-gray-200 text-gray-700', !canRedo && 'opacity-40')}><Redo2 className='h-4 w-4' /></button>
        </div>

        {/* Center Editing Tools */}
        <div className='flex items-center gap-0.5 shrink-0'>
          <Popover open={shapesPopover} onOpenChange={setShapesPopover}>
            <PopoverTrigger asChild><button aria-label='Shapes' className='flex h-8 w-8 items-center justify-center rounded-full text-gray-700 bg-white md:bg-transparent shadow-sm md:shadow-none border border-gray-200 md:border-transparent hover:bg-gray-100'><Hexagon className='h-4 w-4' /></button></PopoverTrigger>
            <PopoverContent className='w-64 p-3 z-[70]' align='center'>
              <p className='mb-2 text-xs font-bold text-gray-700'>Shapes</p>
              <div className='grid grid-cols-5 gap-1.5'>
                {SHAPE_TYPES.map(st => (
                  <button key={st} aria-label={st} onClick={() => addShapeElement(st, 'filled')} className='flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100'>
                    <ShapeSvg shapeType={st} variant='filled' color='#4b5563' />
                  </button>
                ))}
              </div>
              <p className='mb-2 mt-3 text-xs font-bold text-gray-700'>Border Shapes</p>
              <div className='grid grid-cols-5 gap-1.5'>
                {SHAPE_TYPES.map(st => (
                  <button key={`b-${st}`} aria-label={`${st} border`} onClick={() => addShapeElement(st, 'border')} className='flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100'>
                    <ShapeSvg shapeType={st} variant='border' color='#4b5563' />
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <button aria-label='Change color' onClick={handleRandomizeColor} className='flex h-8 w-8 items-center justify-center rounded-full text-gray-700 bg-white md:bg-transparent shadow-sm md:shadow-none border border-gray-200 md:border-transparent hover:bg-gray-100'><RefreshCw className='h-4 w-4' /></button>
          
          <Popover open={textPopover} onOpenChange={setTextPopover}>
            <PopoverTrigger asChild><button aria-label='Text' className='flex h-8 w-8 items-center justify-center rounded-full text-gray-700 bg-white md:bg-transparent shadow-sm md:shadow-none border border-gray-200 md:border-transparent hover:bg-gray-100'><Type className='h-4 w-4' /></button></PopoverTrigger>
            <PopoverContent className='w-52 p-2 z-[70]' align='center'>
              {TEXT_STYLES.map(ts => (
                <button key={ts.style} onClick={() => addTextElement(ts.style, ts.fontSize)} className='flex w-full items-center rounded-md px-3 py-2 text-left hover:bg-gray-100'>
                  <span className={ts.cls}>{ts.label}</span>
                </button>
              ))}
            </PopoverContent>
          </Popover>
          
          <button aria-label='Background image' onClick={() => imgInputRef.current?.click()} className='flex h-8 w-8 items-center justify-center rounded-full text-gray-700 bg-white md:bg-transparent shadow-sm md:shadow-none border border-gray-200 md:border-transparent hover:bg-gray-100' title='Background image'><Image className='h-4 w-4' /></button>
          <button aria-label='Add image to slide' onClick={() => imgElInputRef.current?.click()} className='flex h-8 w-8 items-center justify-center rounded-full text-gray-700 bg-white md:bg-transparent shadow-sm md:shadow-none border border-gray-200 md:border-transparent hover:bg-gray-100' title='Insert image element'><Plus className='h-3 w-3 -mr-1' /><Image className='h-4 w-4' /></button>
        </div>

        {/* Mobile Preview/Export */}
        <div className='flex md:hidden items-center gap-2 shrink-0 border-l border-gray-300 pl-2'>
           <Button variant='outline' size='sm' className='h-8 w-8 p-0 bg-white text-gray-700 shadow-sm' onClick={() => { setPreviewIdx(slideIdx); setPreviewOpen(true) }}><Play className='h-4 w-4 ml-0.5' /></Button>
           <DropdownMenu>
             <DropdownMenuTrigger asChild><Button size='sm' className='h-8 w-8 p-0 bg-[#1C1C1E] text-white shadow-sm'><Download className='h-4 w-4' /></Button></DropdownMenuTrigger>
             <DropdownMenuContent align='end' className='w-48 z-[70]'>
                <DropdownMenuItem onClick={exportJSON}><Download className='mr-2 h-4 w-4' /> Export JSON</DropdownMenuItem>
                <DropdownMenuItem onClick={exportHTML}><ExternalLink className='mr-2 h-4 w-4' /> Export HTML</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(`${window.location.origin}/pitch?deck=${localDeck.id}`)}><Copy className='mr-2 h-4 w-4' /> Share link</DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.print()}><Printer className='mr-2 h-4 w-4' /> Print / PDF</DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
        </div>
      </div>

      <Main fixed className='!p-0 overflow-hidden'>
        <div className='flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden'>
          {/* LEFT PANEL */}
          <div className='w-full md:w-56 shrink-0 md:h-full overflow-x-auto md:overflow-y-auto border-b md:border-b-0 md:border-r border-gray-200 bg-white px-4 md:px-2 py-3 flex md:flex-col gap-3 md:gap-0 custom-scrollbar'>
            {localDeck.slides.map((s, i) => (
              <div key={s.id} className='group md:mb-3 flex flex-col md:flex-row cursor-pointer items-start gap-1 md:gap-2 w-32 md:w-auto shrink-0' onClick={() => setSlideIdx(i)}>
                <span className='w-full md:w-4 shrink-0 pt-0 md:pt-1 text-center md:text-right text-gray-400' style={{ fontSize: 11 }}>{i + 1}</span>
                <div className='w-full overflow-hidden'>
                  <div className={cn('relative w-full aspect-video bg-white overflow-hidden rounded-md border-2', slideIdx === i ? 'border-violet-500' : 'border-transparent hover:border-gray-300')}>
                    <div className='pointer-events-none h-full w-full origin-top-left'>
                      <CanvasSlide slide={s} deck={localDeck} />
                    </div>
                    {localDeck.slides.length > 1 && (
                      <button onClick={(e) => { e.stopPropagation(); handleDeleteSlide(i) }} className='absolute right-1 top-1 rounded bg-white p-1 text-gray-400 opacity-0 shadow-sm transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100'>
                        <Trash2 className='h-3.5 w-3.5' />
                      </button>
                    )}
                  </div>
                  <p className='mt-1 truncate text-gray-600' style={{ fontSize: 11 }}>{s.title}</p>
                </div>
              </div>
            ))}
            
            {/* INLINE ADD SLIDE BUTTON */}
            <div className='md:mb-3 flex flex-col md:flex-row cursor-pointer items-start gap-1 md:gap-2 group w-32 md:w-auto shrink-0' onClick={handleAddSlide}>
              <span className='hidden md:block w-4 shrink-0 pt-1 text-right opacity-0'>+</span>
              <div className='w-full overflow-hidden'>
                <div className='w-full aspect-video flex items-center justify-center overflow-hidden bg-gray-50 rounded-md border-2 border-dashed border-gray-300 text-gray-400 group-hover:border-violet-500 group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors'>
                  <Plus className='h-8 w-8' />
                </div>
                <p className='mt-1 text-center text-gray-500 font-medium' style={{ fontSize: 11 }}>Add slide</p>
              </div>
            </div>

          </div>
          {/* CENTER CANVAS */}
          <div className='relative flex flex-1 shrink-0 md:shrink w-full min-h-[50vh] md:min-h-0 items-start md:items-center justify-center overflow-hidden bg-[#f0f0f0] p-4 md:p-10 pt-12 md:pt-10' onMouseMove={handleCanvasMouseMove} onMouseUp={handleCanvasMouseUp} onMouseLeave={handleCanvasMouseUp} onTouchMove={handleCanvasMouseMove} onTouchEnd={handleCanvasMouseUp} onTouchCancel={handleCanvasMouseUp}>
            {currentSlide && (
              <>
                <div ref={canvasRef} className='relative aspect-video w-full max-w-[860px] @container overflow-hidden rounded-2xl shadow-2xl shrink-0' style={{ backgroundColor: currentSlide.bgColor || localDeck.color }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedElId(null); }}>
                  {/* Template rendering for non-blank slides */}
                  {currentSlide.type !== 'blank' && <CanvasSlide slide={currentSlide} deck={localDeck} thumbOpacity={thumbnailOpacity} />}
                  {currentSlide.type === 'blank' && localDeck.thumbnail && (
                    <div className='absolute inset-0'><div className='h-full w-full bg-cover bg-center' style={{ backgroundImage: `url(${localDeck.thumbnail})`, opacity: thumbnailOpacity }} /></div>
                  )}
                  {/* Interactive elements overlay */}
                  {(currentSlide.elements ?? []).map(el => (
                    <div
                      key={el.id}
                      className={cn('absolute select-none cursor-move')}
                      style={{ left: `${el.x}%`, top: `${el.y}%`, width: `${el.width}%`, height: `${el.height}%`, zIndex: selectedElId === el.id ? 20 : 10, transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined, boxShadow: el.shadow ? '0 4px 14px rgba(0,0,0,0.25)' : undefined }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedElId(el.id)
                      }}
                      onMouseDown={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'move')}
                      onTouchStart={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'move')}
                    >
                      {el.type === 'text' && <CanvasTextElement el={el} editing={editingElId === el.id} onEdit={() => setEditingElId(el.id)} onContentChange={(text) => updateElement(el.id, { content: text })} onFinishEditing={() => setEditingElId(null)} />}
                      {el.type === 'shape' && <CanvasShapeElement el={el} />}
                      {el.type === 'image' && el.imageUrl && <img src={el.imageUrl} alt='' className='h-full w-full object-contain' draggable={false} />}
                      
                      {selectedElId === el.id && !editingElId && (
                        <div className='absolute inset-0 border border-purple-500 pointer-events-none'>
                          <div className='absolute -left-1.5 -top-1.5 h-3 w-3 cursor-nwse-resize rounded-full border border-purple-500 bg-white pointer-events-auto' onMouseDown={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'nw')} onTouchStart={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'nw')} />
                          <div className='absolute -right-1.5 -top-1.5 h-3 w-3 cursor-nesw-resize rounded-full border border-purple-500 bg-white pointer-events-auto' onMouseDown={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'ne')} onTouchStart={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'ne')} />
                          <div className='absolute -left-1.5 -bottom-1.5 h-3 w-3 cursor-nesw-resize rounded-full border border-purple-500 bg-white pointer-events-auto' onMouseDown={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'sw')} onTouchStart={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'sw')} />
                          <div className='absolute -right-1.5 -bottom-1.5 h-3 w-3 cursor-nwse-resize rounded-full border border-purple-500 bg-white pointer-events-auto' onMouseDown={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'se')} onTouchStart={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'se')} />
                          <div className='absolute left-1/2 -top-1.5 h-3 w-3 -translate-x-1/2 cursor-ns-resize rounded-full border border-purple-500 bg-white pointer-events-auto' onMouseDown={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'n')} onTouchStart={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'n')} />
                          <div className='absolute left-1/2 -bottom-1.5 h-3 w-3 -translate-x-1/2 cursor-ns-resize rounded-full border border-purple-500 bg-white pointer-events-auto' onMouseDown={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 's')} onTouchStart={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 's')} />
                          <div className='absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 cursor-ew-resize rounded-full border border-purple-500 bg-white pointer-events-auto' onMouseDown={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'w')} onTouchStart={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'w')} />
                          <div className='absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 cursor-ew-resize rounded-full border border-purple-500 bg-white pointer-events-auto' onMouseDown={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'e')} onTouchStart={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'e')} />
                          {/* Rotation handle */}
                          <div className='absolute left-1/2 -translate-x-1/2 pointer-events-auto' style={{ top: -30 }}>
                            <div className='mx-auto h-4 w-px bg-purple-400' />
                            <div className='mx-auto -mt-0.5 h-3.5 w-3.5 cursor-grab rounded-full border border-purple-500 bg-white flex items-center justify-center' onMouseDown={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'rotate' as DragHandle)} onTouchStart={(e) => handleCanvasMouseDown(e, el.id, el.x, el.y, el.width, el.height, 'rotate' as DragHandle)}>
                              <RefreshCw className='h-2 w-2 text-purple-500' />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {/* Formatting toolbars for selected elements placed OUTSIDE canvas container */}
                {selectedEl && selectedEl.type === 'text' && (
                  <div className='absolute inset-0 pointer-events-none z-50 overflow-visible'>
                    <div className='md:hidden pointer-events-auto fixed bottom-16 left-1/2 -translate-x-1/2 z-[60] w-[95vw] flex justify-center' onClick={e => e.stopPropagation()}>
                      <div className='w-full overflow-x-auto custom-scrollbar flex justify-center'>
                        <FormatToolbar el={selectedEl} onChange={(u) => updateElement(selectedEl.id, u)} onDelete={deleteSelectedElement} />
                      </div>
                    </div>
                    {canvasRect && (
                      <div className='hidden md:block pointer-events-auto absolute z-30' style={{ left: canvasRect.offsetLeft + (canvasRect.offsetWidth * (selectedEl.x / 100)), top: canvasRect.offsetTop + (canvasRect.offsetHeight * (Math.max(0, selectedEl.y - 12) / 100)) }} onClick={e => e.stopPropagation()}>
                        <FormatToolbar el={selectedEl} onChange={(u) => updateElement(selectedEl.id, u)} onDelete={deleteSelectedElement} />
                      </div>
                    )}
                  </div>
                )}
                
                {selectedEl && (selectedEl.type === 'shape' || selectedEl.type === 'image') && (
                  <div className='absolute inset-0 pointer-events-none z-50 overflow-visible'>
                    <div className='md:hidden pointer-events-auto fixed bottom-16 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-2xl whitespace-nowrap overflow-x-auto w-[95vw] sm:w-auto custom-scrollbar' onClick={e => e.stopPropagation()}>
                      {selectedEl.type === 'shape' && <input type='color' value={selectedEl.fillColor || '#9ca3af'} onChange={(e) => updateElement(selectedEl.id, { fillColor: e.target.value })} className='h-8 w-8 shrink-0 cursor-pointer rounded border-0 p-0' aria-label='Shape color' />}
                      <button aria-label='Toggle shadow' onClick={() => updateElement(selectedEl.id, { shadow: !selectedEl.shadow })} className={cn('shrink-0 rounded p-2 text-gray-500 hover:bg-gray-100', selectedEl.shadow && 'bg-purple-100 text-purple-600')} title='Shadow'>
                        <Layers className='h-5 w-5' />
                      </button>
                      <div className='flex items-center gap-1.5 shrink-0 px-1'>
                        <RefreshCw className='h-4 w-4 text-gray-400' />
                        <input type='number' min={0} max={360} value={selectedEl.rotation || 0} onChange={(e) => updateElement(selectedEl.id, { rotation: parseInt(e.target.value) || 0 })} className='w-12 rounded border border-gray-200 px-1 py-1 text-center text-sm' aria-label='Rotation degrees' />
                        <span className='text-sm text-gray-400'>°</span>
                      </div>
                      <button aria-label='Delete element' onClick={deleteSelectedElement} className='shrink-0 rounded p-2 text-red-500 hover:bg-red-50'><Trash2 className='h-5 w-5' /></button>
                    </div>
                    
                    {canvasRect && (
                      <div className='hidden md:flex pointer-events-auto absolute z-30 items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 shadow-xl' style={{ left: canvasRect.offsetLeft + (canvasRect.offsetWidth * (selectedEl.x / 100)), top: canvasRect.offsetTop + (canvasRect.offsetHeight * (Math.max(0, selectedEl.y - 14) / 100)) }} onClick={e => e.stopPropagation()}>
                        {selectedEl.type === 'shape' && <input type='color' value={selectedEl.fillColor || '#9ca3af'} onChange={(e) => updateElement(selectedEl.id, { fillColor: e.target.value })} className='h-6 w-6 cursor-pointer rounded border-0 p-0' aria-label='Shape color' />}
                        <button aria-label='Toggle shadow' onClick={() => updateElement(selectedEl.id, { shadow: !selectedEl.shadow })} className={cn('rounded p-1 text-gray-500 hover:bg-gray-100', selectedEl.shadow && 'bg-purple-100 text-purple-600')} title='Shadow'>
                          <Layers className='h-3.5 w-3.5' />
                        </button>
                        <div className='flex items-center gap-0.5'>
                          <RefreshCw className='h-3 w-3 text-gray-400' />
                          <input type='number' min={0} max={360} value={selectedEl.rotation || 0} onChange={(e) => updateElement(selectedEl.id, { rotation: parseInt(e.target.value) || 0 })} className='w-9 rounded border border-gray-200 px-1 py-0.5 text-center text-[10px]' aria-label='Rotation degrees' />
                          <span className='text-[10px] text-gray-400'>°</span>
                        </div>
                        <button aria-label='Delete element' onClick={deleteSelectedElement} className='rounded p-1 text-red-500 hover:bg-red-50'><Trash2 className='h-3.5 w-3.5' /></button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          {/* RIGHT PANEL CONTENT */}
          <div className={cn('overflow-y-auto border-t md:border-t-0 md:border-l border-gray-200 bg-white transition-all duration-200 shrink-0 md:h-full', rightPanel ? 'h-48 md:h-auto md:w-56' : 'h-0 md:w-0')}>
            {rightPanel === 'theme' && <div className='p-4'><p className='mb-3 text-xs font-semibold uppercase text-gray-400'>Background color</p><div className='grid grid-cols-6 md:grid-cols-3 gap-2'>{DECK_COLORS.map(c => <button key={c} aria-label={c} className={cn('h-8 w-full rounded-md border-2', localDeck.color===c?'border-blue-500':'border-transparent')} style={{backgroundColor:c}} onClick={()=>pushHistory({...localDeck,color:c})} />)}</div></div>}
            {rightPanel === 'layouts' && <div className='p-4'><p className='mb-3 text-xs font-semibold uppercase text-gray-400'>Layout</p><div className='grid grid-cols-2 gap-2'>{(['cover','content','split','stats'] as SlideData['type'][]).map(t=><button key={t} onClick={()=>pushHistory({...localDeck,slides:localDeck.slides.map((s,i)=>i===slideIdx?{...s,type:t}:s)})} className={cn('rounded-lg border-2 p-3 text-xs font-medium capitalize transition-colors',localDeck.slides[slideIdx]?.type===t?'border-blue-500 bg-blue-50':'border-gray-200 hover:border-gray-300')}>{t}</button>)}</div></div>}
            {rightPanel === 'adjustments' && <div className='space-y-3 p-4'><p className='text-xs font-semibold uppercase text-gray-400'>Image overlay</p><div><label className='text-xs text-gray-500'>Opacity: {Math.round(thumbnailOpacity*100)}%</label><input type='range' min={0} max={1} step={0.05} value={thumbnailOpacity} onChange={e=>setThumbnailOpacity(parseFloat(e.target.value))} className='mt-1 w-full'/></div></div>}
            {rightPanel === 'slides' && <div className='overflow-y-auto p-2'>{localDeck.slides.map((s,i)=><div key={s.id} className='group mb-2 flex cursor-pointer items-start gap-2' onClick={()=>setSlideIdx(i)}><span className='w-4 shrink-0 pt-1 text-right text-gray-400' style={{fontSize:11}}>{i+1}</span><div className='flex-1'><div className={cn('relative aspect-video bg-white overflow-hidden rounded-md border-2',slideIdx===i?'border-violet-500':'border-transparent hover:border-gray-300')}><div className='pointer-events-none h-full w-full'><CanvasSlide slide={s} deck={localDeck}/></div>{localDeck.slides.length>1&&(<button onClick={(e)=>{e.stopPropagation();handleDeleteSlide(i)}} className='absolute right-1 top-1 rounded bg-white p-1 text-gray-400 opacity-0 shadow-sm transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100'><Trash2 className='h-3.5 w-3.5'/></button>)}</div><p className='mt-1 truncate text-gray-600' style={{fontSize:11}}>{s.title}</p></div></div>)}<div className='mb-3 flex cursor-pointer items-start gap-2 group' onClick={handleAddSlide}><span className='w-4 shrink-0 pt-1 text-right opacity-0'>+</span><div className='flex-1 overflow-hidden'><div className='aspect-video flex items-center justify-center overflow-hidden bg-gray-50 rounded-md border-2 border-dashed border-gray-300 text-gray-400 group-hover:border-violet-500 group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors'><Plus className='h-8 w-8' /></div><p className='mt-1 text-center text-gray-500 font-medium' style={{ fontSize: 11 }}>Add slide</p></div></div></div>}
          </div>
          {/* RIGHT ICON COLUMN */}
          <div className='flex md:w-10 w-full shrink-0 flex-row md:flex-col justify-center items-center gap-2 md:gap-3 border-t md:border-t-0 md:border-l border-gray-200 bg-white py-2 md:py-4 px-4 md:px-0 sticky bottom-0 z-20'>
            {rightPanelButtons.map(({ Icon, label, action }) => (
              <button key={label} aria-label={label} onClick={action} className='flex h-10 w-10 md:h-8 md:w-8 items-center justify-center rounded text-gray-500 hover:bg-gray-100'><Icon className='h-[18px] w-[18px] md:h-4 md:w-4' /></button>
            ))}
          </div>
        </div>
      </Main>

      {/* PREVIEW MODAL */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className='h-screen w-screen max-w-none border-0 bg-black p-0' showCloseButton={false}>
          <DialogTitle className='sr-only'>Preview</DialogTitle>
          <div className='relative flex h-full w-full flex-col'>
            {/* Preview header */}
            <div className='flex items-center justify-between px-5 py-3'>
              <div className='flex items-center gap-2'>
                <img src='/images/logo.png' alt='Logo' className='h-5 w-auto brightness-200' />
                <span className='text-sm text-white/70'>{localDeck.name}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Button variant='outline' size='sm' className='border-gray-600 bg-gray-800 text-white hover:bg-gray-700' onClick={() => setPreviewOpen(false)}>
                  <Pencil className='mr-1 h-3 w-3' /> Edit
                </Button>
                <button onClick={() => setPreviewOpen(false)} aria-label='Close preview' className='rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white'><X className='h-4 w-4' /></button>
              </div>
            </div>
            {/* Main slide area */}
            <div className='flex flex-1 items-center justify-center px-16 pb-28'>
              <CanvasSlide slide={localDeck.slides[previewIdx]} deck={localDeck} thumbOpacity={thumbnailOpacity} />
            </div>
            {/* Nav arrows */}
            <button onClick={() => setPreviewIdx(i => Math.max(0, i-1))} disabled={previewIdx===0} aria-label='Previous slide' className='absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 disabled:opacity-20'><ChevronLeft className='h-5 w-5' /></button>
            <button onClick={() => setPreviewIdx(i => Math.min(localDeck.slides.length-1, i+1))} disabled={previewIdx===localDeck.slides.length-1} aria-label='Next slide' className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 disabled:opacity-20'><ChevronRight className='h-5 w-5' /></button>
            {/* Bottom thumbnail strip */}
            <div className='absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/90 px-4 py-2.5'>
              <div className='flex items-center gap-2 overflow-x-auto'>
                {localDeck.slides.map((s, i) => (
                  <div key={s.id} className={cn('shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-all', previewIdx === i ? 'border-red-500 shadow-lg shadow-red-500/20' : 'border-transparent opacity-60 hover:opacity-90')} style={{ width: 88 }} onClick={() => setPreviewIdx(i)}>
                    <div className='aspect-video bg-white pointer-events-none'><CanvasSlide slide={s} deck={localDeck} thumbOpacity={thumbnailOpacity} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* SHORTCUTS MODAL */}
      <Dialog open={shortcutsOpen} onOpenChange={setShortcutsOpen}>
        <DialogContent className='max-w-sm'>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <table className='w-full text-sm'><tbody className='divide-y divide-gray-100'>
            {[['← / →','Navigate slides'],['Ctrl+Z','Undo'],['Ctrl+Shift+Z','Redo'],['Ctrl+S','Save'],['Esc','Close preview']].map(([key,desc])=>(
              <tr key={key}><td className='py-2 pr-4'><kbd className='rounded bg-gray-100 px-2 py-0.5 font-mono text-xs'>{key}</kbd></td><td className='py-2 text-gray-500'>{desc}</td></tr>
            ))}
          </tbody></table>
        </DialogContent>
      </Dialog>
    </>
  )
}

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */

export function Pitch() {
  const [pitches, setPitches] = useState<PitchDeck[]>(initialPitches)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [showAiModal, setShowAiModal] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generatedDeck, setGeneratedDeck] = useState<PitchDeck | null>(null)
  const [editingDeck, setEditingDeck] = useState<PitchDeck | null>(null)
  const [createDropOpen, setCreateDropOpen] = useState(false)
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const [aiTemplateName, setAiTemplateName] = useState('')
  const [aiTemplateColor, setAiTemplateColor] = useState('#ffffff')
  const [tick, setTick] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timerRef.current = setInterval(() => setTick((t) => t + 1), 30000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])
  void tick

  const openEditor = useCallback((deck: PitchDeck) => {
    setEditingDeck(deck)
  }, [])

  const saveDeckToRecent = useCallback((deck: PitchDeck) => {
    setPitches((prev) => {
      const exists = prev.find((p) => p.id === deck.id)
      if (exists) return prev.map((p) => (p.id === deck.id ? { ...deck, editedAt: new Date() } : p))
      return [{ ...deck, editedAt: new Date() }, ...prev]
    })
  }, [])

  /* Create blank */
  const createBlank = () => {
    const deck: PitchDeck = {
      id: uid(), name: 'Untitled', thumbnail: '', color: '#ffffff', editedAt: new Date(),
      slides: [{ id: uid(), title: '', subtitle: '', type: 'blank', elements: [] }],
    }
    saveDeckToRecent(deck)
    openEditor(deck)
    setCreateDropOpen(false)
  }

  /* Create from template */
  const createFromTemplate = (tmpl: Template) => {
    const deck: PitchDeck = {
      id: uid(), name: tmpl.name, thumbnail: tmpl.coverImage, color: tmpl.coverColor, editedAt: new Date(),
      slides: tmpl.slides.map((s) => ({ ...s, id: uid() })),
    }
    saveDeckToRecent(deck)
    openEditor(deck)
    setSelectedTemplate(null)
  }

  /* AI generation */
  const [genProgress, setGenProgress] = useState(0)
  const genTimersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const aiWordCount = aiPrompt.trim().split(/\s+/).filter(Boolean).length
  const aiWordTarget = 10
  const aiWordProgress = Math.min(1, aiWordCount / aiWordTarget)

  const handleAiGenerate = () => {
    setGenerating(true)
    setShowAiModal(false)
    setGenProgress(0)
    const keywords = aiPrompt.split(/\s+/).filter((w) => w.length > 3).slice(0, 3)
    const deckName = keywords.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'AI Pitch'
    const stages = [10, 25, 40, 55, 70, 85, 95, 100]
    genTimersRef.current.forEach(t => clearTimeout(t))
    genTimersRef.current = stages.map((p, i) => setTimeout(() => setGenProgress(p), (i + 1) * 500))
    const u1 = ['https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200', 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1200', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200', 'https://images.unsplash.com/photo-1510844355160-2fb07bf9af75?q=80&w=1200']
    
    setTimeout(() => {
      const deck: PitchDeck = {
        id: uid(), name: deckName, thumbnail: '', color: aiTemplateColor, editedAt: new Date(),
        slides: generateTemplateSlides(aiTemplateName || 'Startup Pitch', aiPrompt || 'Crafting the future of innovation and technology today.', u1, aiTemplateColor)
      }
      setGeneratedDeck(deck)
      setGenerating(false)
    }, 4500)
  }

  const saveGeneratedDeck = () => {
    if (!generatedDeck) return
    saveDeckToRecent(generatedDeck)
    openEditor(generatedDeck)
    closeAiFlow()
  }

  const closeAiFlow = () => {
    setShowAiModal(false)
    setAiPrompt('')
    setGenerating(false)
    setGeneratedDeck(null)
    setAiTemplateName('')
    setGenProgress(0)
    genTimersRef.current.forEach(t => clearTimeout(t))
  }

  /* Rename */
  const commitRename = () => {
    if (renamingId && renameValue.trim()) {
      setPitches((prev) => prev.map((p) => (p.id === renamingId ? { ...p, name: renameValue.trim(), editedAt: new Date() } : p)))
    }
    setRenamingId(null)
  }

  const duplicatePitch = (id: string) => {
    setPitches((prev) => {
      const src = prev.find((p) => p.id === id)
      if (!src) return prev
      return [{ ...src, id: uid(), name: `${src.name} (Copy)`, editedAt: new Date() }, ...prev]
    })
  }

  const deletePitch = (id: string) => {
    setPitches((prev) => prev.filter((p) => p.id !== id))
  }

  const handleEditorSave = (deck: PitchDeck) => {
    saveDeckToRecent(deck)
    setEditingDeck(null)
  }

  /* ─── RENDER: AI GENERATING / RESULT (full page) ─── */
  if (generating || generatedDeck) {
    const deckName = generatedDeck?.name || aiPrompt.split(/\s+/).filter(w => w.length > 3).slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'AI Pitch'
    return (
      <>
        <Header>
          <div className='flex flex-1 items-center justify-between'>
            <h1 className='text-lg font-semibold text-gray-900'>{deckName}</h1>
            <div className='flex items-center gap-2'>
              {generatedDeck && <Button className='bg-emerald-600 text-white hover:bg-emerald-700' onClick={saveGeneratedDeck}><Play className='mr-1 h-4 w-4' /> Start Editing</Button>}
              <Button variant='outline' onClick={closeAiFlow}>Cancel</Button>
            </div>
          </div>
        </Header>
        {/* Top progress bar */}
        {generating && (
          <div className='h-1 w-full bg-gray-100'>
            <div className='h-full bg-teal-400 transition-all duration-500 ease-out' style={{ width: `${generating ? genProgress : 100}%` }} />
          </div>
        )}
        <Main className='overflow-y-auto bg-gray-50/50 pb-20'>
          <div className='mx-auto max-w-4xl py-12'>
            {generating && (
              <div className='grid grid-cols-2 gap-8'>
                {[0,1,2,3,4,5].map(i => (
                  <div key={i} className={cn('overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-700', i * 14 < genProgress ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2')}>
                    <div className='aspect-video p-8'>
                      <div className='mb-4 h-5 w-2/3 animate-pulse rounded-full bg-gray-200' />
                      <div className='mb-3 h-4 w-full animate-pulse rounded-full bg-gray-100' />
                      <div className='mb-3 h-4 w-4/5 animate-pulse rounded-full bg-gray-100' />
                      <div className='mt-8 h-32 w-1/2 animate-pulse rounded-xl bg-gray-100' />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {generatedDeck && !generating && (
              <div className='grid grid-cols-2 gap-8 pointer-events-none select-none'>
                {generatedDeck.slides.map((slide, i) => (
                  <div key={slide.id} className='overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 transform-gpu' style={{ animationDelay: `${i * 100}ms` }}>
                    <div className='aspect-video overflow-hidden'>
                      <CanvasSlide slide={slide} deck={generatedDeck} thumbOpacity={0.35} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Main>
      </>
    )
  }

  /* ─── RENDER EDITOR (full page, replaces list view) ─── */
  if (editingDeck) {
    return <PitchEditor deck={editingDeck} onClose={() => setEditingDeck(null)} onSave={handleEditorSave} />
  }

  /* ─── RENDER MAIN LIST VIEW ─── */
  return (
    <>
      <Header>
        <div className='flex flex-1 items-center justify-between'>
          <h1 className='text-lg font-semibold text-gray-900'>Pitch Deck</h1>
          <DropdownMenu open={createDropOpen} onOpenChange={setCreateDropOpen}>
            <DropdownMenuTrigger asChild>
              <Button className='bg-[#111827] text-white hover:bg-[#1F2937]'>Create</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-64 p-3'>
              <p className='mb-2 text-xs text-gray-400'>Select a template below to get started</p>
              <div className='my-2 h-px bg-gray-100' />
              <p className='mb-2 text-xs text-gray-400'>Or...</p>
              <DropdownMenuItem className='flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2' onClick={() => { setAiTemplateName(''); setShowAiModal(true); setCreateDropOpen(false) }}>
                <Sparkles className='h-4 w-4' /> Generate with AI
              </DropdownMenuItem>
              <DropdownMenuItem className='flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2' onClick={createBlank}>
                <Plus className='h-4 w-4' /> New Blank Pitch
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Header>

      <Main className='space-y-8'>
        {/* HERO BANNER */}
        <div className='flex items-center justify-between gap-8 rounded-xl border border-gray-100 bg-gray-50 p-8'>
          <div className='max-w-lg'>
            <h2 className='text-xl font-bold text-gray-900'>Create investor-ready pitch decks in minutes</h2>
            <p className='mt-3 max-w-sm text-sm leading-relaxed text-gray-500'>
              Pick from a range of professional templates and customize your pitch deck with AI-powered design tools. Then easily export and share your pitch deck with anyone.
            </p>
            <p className='mt-4 text-sm italic text-gray-400'>Pick a template to get started</p>
          </div>
          <div className='hidden md:block'><HeroIllustration /></div>
        </div>

        {/* RECENT PITCHES */}
        <section>
          <h3 className='mb-4 text-base font-semibold text-gray-900'>Recent Pitches</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {pitches.map((deck) => (
              <div key={deck.id}>
                <div
                  className='group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-gray-200'
                  style={{ backgroundColor: deck.color }}
                  onClick={() => openEditor(deck)}
                >
                  {deck.thumbnail && (
                    <img src={deck.thumbnail} alt='' className='absolute inset-0 h-full w-full object-cover opacity-40' />
                  )}
                  <span className='absolute bottom-3 left-3 text-base font-bold text-white drop-shadow'>
                    {deck.slides[0]?.title || deck.name}
                  </span>
                  <div className='absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100' onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className='flex h-7 w-7 items-center justify-center rounded-md bg-white/80 hover:bg-white'>
                          <MoreHorizontal className='h-4 w-4 text-gray-600' />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem className='cursor-pointer gap-2' onClick={() => openEditor(deck)}>
                          <ExternalLink className='h-4 w-4' /> Open in New Tab
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer gap-2' onClick={() => { setRenamingId(deck.id); setRenameValue(deck.name) }}>
                          <Pencil className='h-4 w-4' /> Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer gap-2' onClick={() => duplicatePitch(deck.id)}>
                          <Copy className='h-4 w-4' /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer gap-2 text-red-600' onClick={() => deletePitch(deck.id)}>
                          <Trash2 className='h-4 w-4' /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {renamingId === deck.id ? (
                  <input
                    autoFocus
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={() => commitRename()}
                    onKeyDown={(e) => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenamingId(null) }}
                    className='mt-1.5 w-full rounded border border-gray-300 px-2 py-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400'
                  />
                ) : (
                  <p className='mt-1.5 text-sm font-medium text-gray-900'>{deck.name}</p>
                )}
                <p className='text-xs text-gray-400'>{formatRelativeTime(deck.editedAt)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEMPLATES GALLERY */}
        <section>
          <h3 className='mb-4 text-base font-semibold text-gray-900'>Templates gallery</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {templatesData.map((tmpl) => (
              <div key={tmpl.id}>
                <div
                  className='cursor-pointer overflow-hidden rounded-xl border border-gray-200 transition-colors hover:border-gray-400'
                  onClick={() => setSelectedTemplate(tmpl)}
                >
                  <TemplateThumbnailById templateId={tmpl.id} />
                </div>
                <p className='mt-2 text-sm text-gray-700'>{tmpl.name}</p>
              </div>
            ))}
          </div>
        </section>
      </Main>

      <Dialog open={!!selectedTemplate} onOpenChange={(open) => { if (!open) setSelectedTemplate(null) }}>
        <DialogContent className='sm:max-w-[1100px] p-0 overflow-hidden bg-white' showCloseButton>
          <div className='px-8 pt-6 pb-2 text-left'>
            <DialogTitle className='text-xl font-bold text-gray-900'>{selectedTemplate?.name}</DialogTitle>
          </div>
          <div className='flex flex-col md:flex-row h-auto md:h-[70vh] max-h-[85vh] md:max-h-full items-stretch pb-4 overflow-y-auto md:overflow-hidden'>
            {/* LEFT: Flexible Area for Huge Cover */}
            <div className='flex-1 flex w-full shrink px-4 md:px-8 pt-2 md:pr-4 items-start mb-6 md:mb-0'>
              <div className='w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-200'>
                <TemplateThumbnailById templateId={selectedTemplate?.id || ''} />
              </div>
            </div>
            
            {/* RIGHT: Rigid 400px Area for Grid */}
            <div className='w-full md:w-[420px] shrink-0 flex flex-col md:h-full border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50/50 md:rounded-r-xl'>
               <div className='flex-none md:flex-1 md:overflow-y-auto px-6 pt-4 pb-4 custom-scrollbar'>
                <div className='grid grid-cols-2 gap-4 pb-4'>
                  {selectedTemplate?.slides.map((slide) => (
                    <div key={slide.id} className='relative overflow-hidden rounded-lg border border-gray-200 outline outline-2 outline-transparent transition-all pointer-events-none shadow-sm'>
                      <div className='aspect-video w-full bg-white'>
                        <CanvasSlide slide={slide} deck={{ color: selectedTemplate.coverColor } as unknown as PitchDeck} />
                      </div>
                    </div>
                  ))}
                </div>
               </div>
               <div className='flex flex-col sm:flex-row justify-end gap-3 px-6 pt-4 pb-6 bg-white border-t border-gray-100 shrink-0 md:sticky md:bottom-0 z-10'>
                 <Button variant='outline' className='flex-1 h-11 border-gray-200 bg-white hover:bg-gray-50 text-gray-700' onClick={() => selectedTemplate && createFromTemplate(selectedTemplate)}>
                   <span className='font-semibold text-sm'>Use Template</span>
                 </Button>
                 <Button className='flex-1 h-11 bg-[#1C1C1E] text-white hover:bg-[#2C2C2E] shadow-sm' onClick={() => { if (selectedTemplate) { setAiTemplateName(selectedTemplate.name); setAiTemplateColor(selectedTemplate.coverColor); setSelectedTemplate(null); setShowAiModal(true) } }}>
                   <Sparkles className='h-4 w-4 mr-2' /> <span className='font-semibold text-sm'>Fill with AI</span>
                 </Button>
               </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ═══ AI PROMPT MODAL ═══ */}
      <Dialog open={showAiModal} onOpenChange={(open) => { if (!open) closeAiFlow() }}>
        <DialogContent className='max-w-lg p-6' showCloseButton>
          <DialogTitle>What Pitch do you want to generate?</DialogTitle>
          {aiTemplateName && <p className='text-xs text-gray-400'>Based on template: {aiTemplateName}</p>}
          <textarea
            className='mt-2 h-32 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300'
            placeholder="Describe your idea, topic, market, or business model. We'll transform your ideas into a compelling pitch deck!"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          />
          {/* Word count progress bar */}
          <div className='mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100'>
            <div className='h-full rounded-full bg-teal-400 transition-all duration-300 ease-out' style={{ width: `${aiWordProgress * 100}%` }} />
          </div>
          <p className='mt-1 text-right text-xs text-gray-400'>{aiWordCount} / {aiWordTarget} words</p>
          <Button className='mt-2 h-11 w-full rounded-xl bg-teal-400 text-white hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed' disabled={aiWordCount < aiWordTarget} onClick={handleAiGenerate}>
            <Sparkles className='h-4 w-4' /> Generate Pitch Deck
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
