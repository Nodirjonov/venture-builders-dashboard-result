import { ArrowLeft } from 'lucide-react'
import { useRouter } from '@tanstack/react-router'

export function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.history.back()}
      className='mt-4 mb-6 flex items-center gap-1.5 text-[13px] text-gray-500 transition-colors hover:text-gray-900'
    >
      <ArrowLeft size={15} />
      Back
    </button>
  )
}
