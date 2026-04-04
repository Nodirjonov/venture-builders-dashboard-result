import { Eye, Lock, Sparkles } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { GuideStatus } from '@/features/guides/data/guides'

interface GuideCardProps {
  title: string
  description: string
  status: GuideStatus
  imageUrl?: string
  imageGradient: string
  route: string
}

export function GuideCard({
  title,
  description,
  status,
  imageUrl,
  imageGradient,
  route,
}: GuideCardProps) {
  return (
    <Link
      to={route}
      className='group block no-underline'
      style={{
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        borderRadius: 0,
        overflow: 'visible',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div
        className='transition-opacity duration-300 group-hover:opacity-85 relative overflow-hidden rounded-[14px] w-full aspect-[4/3] sm:h-[260px]'
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className='h-full w-full object-cover block'
          />
        ) : (
          <div className={`h-full w-full ${imageGradient}`} />
        )}

        {status === 'locked' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className='flex items-center gap-1.5 rounded-full bg-white/75 px-4 py-1.5 text-[13px] font-medium text-gray-700 shadow-sm backdrop-blur-[3px]'>
              <Lock size={13} />
              Locked
            </span>
          </div>
        )}

        {status === 'preview' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className='flex items-center gap-1.5 rounded-full bg-white/65 px-4 py-1.5 text-[13px] font-medium text-gray-700 shadow-sm backdrop-blur-[3px]'>
              <Eye size={13} />
              Preview
            </span>
          </div>
        )}
      </div>

      {/* Text area */}
      <div style={{ paddingTop: 12 }}> {/* Rasmga 0.3 sm (taxminan 12px ga qadar) yaqinlashtirildi */}
        <h3
          style={{
            fontSize: 20, 
            fontWeight: 400, 
            color: '#111827',
            lineHeight: 1.35,
            marginBottom: 12, 
            marginTop: 0,
            minHeight: 54, 
          }}
          className='group-hover:underline group-hover:underline-offset-4' 
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 15, 
            color: '#4b5563', // Rang asl nusxaga o'xshatildi
            lineHeight: 1.6, 
            marginBottom: 20, // Tasvir osti va AI badge orasi ochildi (avval 12)
            marginTop: 0,
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
          }}
        >
          {description}
        </p>
        <div
          style={{
            fontSize: 14, // Aniqlangan kattalik
            fontWeight: 500,
            color: '#a855f7', 
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Sparkles size={14} />
          AI Generated for you
        </div>
      </div>
    </Link>
  )
}
