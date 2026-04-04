import { useMemo, useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { marketingTactics } from '@/features/guides/data/guides'

type SortField = 'title' | 'category' | 'budget'
type SortDir = 'asc' | 'desc'

const CATEGORIES = [
  'All',
  'Content Marketing',
  'Partnership Marketing',
  'Community Outreach',
  'Digital Marketing',
]

export function SortableTable() {
  const [filter, setFilter] = useState('All')
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const rows = useMemo(() => {
    let data = [...marketingTactics]
    if (filter !== 'All') {
      data = data.filter((d) => d.category === filter)
    }
    if (sortField) {
      data.sort((a, b) => {
        const av = a[sortField]
        const bv = b[sortField]
        const cmp =
          typeof av === 'number'
            ? av - (bv as number)
            : String(av).localeCompare(String(bv))
        return sortDir === 'asc' ? cmp : -cmp
      })
    }
    return data
  }, [filter, sortField, sortDir])

  function thClass(field: SortField) {
    return `cursor-pointer select-none bg-white px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.05em] transition-colors ${
      sortField === field ? 'text-gray-900' : 'text-gray-400'
    }`
  }

  return (
    <div className='mt-6'>
      {/* Filter dropdown */}
      <div className='relative mb-4 inline-block'>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className='cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-8 text-[13px] text-gray-600 focus:outline-none'
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-2 flex items-center'>
          <svg
            className='h-4 w-4 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
      </div>

      {/* Table */}
      <table className='mt-4 w-full border-collapse'>
        <thead>
          <tr className='border-b border-gray-200'>
            <th className={thClass('title')} onClick={() => handleSort('title')}>
              Title{' '}
              <ArrowUpDown size={11} className='ml-1 inline' />
            </th>
            <th className='bg-white px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.05em] text-gray-400'>
              Description
            </th>
            <th className={thClass('category')} onClick={() => handleSort('category')}>
              Category{' '}
              <ArrowUpDown size={11} className='ml-1 inline' />
            </th>
            <th className={thClass('budget')} onClick={() => handleSort('budget')}>
              Budget{' '}
              <ArrowUpDown size={11} className='ml-1 inline' />
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.title}
              className='border-b border-gray-100 transition-colors hover:bg-gray-50/70'
            >
              <td className='min-w-[140px] px-4 py-4 text-[13px] font-semibold text-gray-800'>
                {row.title}
              </td>
              <td className='max-w-[420px] px-4 py-4 text-[12px] leading-relaxed text-gray-500'>
                {row.description}
              </td>
              <td className='px-4 py-4 text-[12px] text-gray-600'>{row.category}</td>
              <td className='px-4 py-4 text-[13px] font-medium text-gray-800'>
                ${row.budget}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
