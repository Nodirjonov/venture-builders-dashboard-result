import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '@/components/language-switcher'

export function AccountForm() {
  const t = useTranslations('account')
  const tCommon = useTranslations('common')
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [password, setPassword] = useState('')

  return (
    <div className='bg-white px-8 py-8 max-w-3xl w-full'>
      {/* Page Header */}
      <h1 className='text-2xl font-bold text-gray-900'>{t('title')}</h1>
      <p className='text-sm text-gray-500 mt-1'>{t('subtitle')}</p>

      <hr className='my-8 border-gray-200' />

      {/* Profile Section */}
      <section>
        <h2 className='text-xl font-bold text-gray-900 mb-1'>{t('profile.title')}</h2>
        <p className='text-sm text-gray-900 mb-0.5'>
          {t('profile.email_label')} m15781191@gmail.com
        </p>
        <p className='text-sm text-gray-500 mb-4'>{t('profile.email_hint')}</p>

        {/* Google Button */}
        <button
          disabled
          aria-label={t('profile.google_enabled')}
          className='flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-700 cursor-default mb-3'
        >
          <GoogleIcon />
          {t('profile.google_enabled')}
        </button>

        {/* Add Password */}
        <button
          onClick={() => setShowPasswordModal(true)}
          className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-800 bg-white hover:bg-gray-50 transition-colors'
        >
          {t('profile.add_password')}
        </button>

        {/* Language — Custom Dropdown */}
        <div className='mt-5'>
          <label className='block text-sm font-semibold text-gray-800 mb-1.5'>
            {t('profile.language_label')}
          </label>
          <LanguageSwitcher />
        </div>
      </section>

      <hr className='my-8 border-gray-200' />

      {/* Subscription Section */}
      <section>
        <h2 className='text-xl font-bold text-gray-900 mb-1'>{t('subscription.title')}</h2>
        <p className='text-sm text-gray-500 mb-4'>{t('subscription.free_plan_text')}</p>
        <button className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-800 bg-white hover:bg-gray-50 transition-colors'>
          <CartIcon />
          {t('subscription.upgrade_button')}
        </button>
      </section>

      <hr className='my-8 border-gray-200' />

      {/* Contact Support Section */}
      <section>
        <h2 className='text-xl font-bold text-gray-900 mb-1'>{t('contact_support.title')}</h2>
        <p className='text-sm text-gray-500 mb-4'>{t('contact_support.description')}</p>
        <button className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-800 bg-white hover:bg-gray-50 transition-colors'>
          {t('contact_support.button')}
        </button>
      </section>

      <hr className='my-8 border-gray-200' />

      {/* Danger Zone Section */}
      <section>
        <h2 className='text-xl font-bold text-gray-900 mb-1'>{t('danger_zone.title')}</h2>
        <p className='text-sm text-gray-500 mb-4'>{t('danger_zone.description')}</p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className='px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-500 bg-white hover:bg-red-50 transition-colors'
        >
          {t('danger_zone.delete_button')}
        </button>
      </section>

      {/* Add Password Modal */}
      {showPasswordModal && (
        <div
          className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPasswordModal(false)
          }}
        >
          <div className='bg-white rounded-xl p-6 w-[440px] max-w-[90vw] shadow-2xl'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-base font-bold text-gray-900'>{t('password_modal.title')}</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                aria-label={tCommon('close')}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <XIcon />
              </button>
            </div>
            <input
              type='password'
              placeholder={t('password_modal.placeholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 mb-3'
            />
            <button className='w-full bg-green-500 hover:bg-green-600 text-white font-semibold text-sm py-2.5 rounded-md transition-colors'>
              {t('password_modal.submit')}
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteModal && (
        <div
          className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowDeleteModal(false)
          }}
        >
          <div className='bg-white rounded-xl p-7 w-[420px] max-w-[90vw] shadow-2xl'>
            <h3 className='text-lg font-bold text-gray-900 mb-2'>{t('delete_modal.title')}</h3>
            <p className='text-sm text-gray-500 leading-relaxed mb-6'>
              {t('delete_modal.description')}
            </p>
            <div className='flex justify-end gap-2.5'>
              <button
                onClick={() => setShowDeleteModal(false)}
                className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors'
              >
                {t('delete_modal.cancel')}
              </button>
              <button className='px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-500 bg-white hover:bg-red-50 transition-colors'>
                {t('delete_modal.continue')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Icons ── */
function GoogleIcon() {
  return (
    <svg width='18' height='18' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.015 17.64 11.707 17.64 9.2z'
        fill='#4285F4'
      />
      <path
        d='M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z'
        fill='#34A853'
      />
      <path
        d='M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z'
        fill='#FBBC05'
      />
      <path
        d='M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 6.293C4.672 4.169 6.656 3.58 9 3.58z'
        fill='#EA4335'
      />
    </svg>
  )
}



function CartIcon() {
  return (
    <svg width='15' height='15' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}>
      <path d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width='16' height='16' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
      <path d='M6 18L18 6M6 6l12 12' />
    </svg>
  )
}
