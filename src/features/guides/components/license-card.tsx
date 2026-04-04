interface LicenseCardProps {
  title: string
  level: 'National' | 'Local'
  description: string
  link: string
}

export function LicenseCard({ title, level, description, link }: LicenseCardProps) {
  return (
    <div className='rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm'>
      <h3 className='mb-0.5 text-[13.5px] font-bold text-gray-900'>{title}</h3>
      <span className='mb-3 block text-[11px] text-gray-400'>{level}</span>
      <p className='mb-4 text-[12px] leading-[1.7] text-gray-600'>{description}</p>
      <a
        href='#'
        onClick={(e) => e.preventDefault()}
        className='text-[12px] text-blue-400 transition-colors hover:text-blue-600 hover:underline'
      >
        {link}
      </a>
    </div>
  )
}
