import { Outlet } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'

export function Settings() {
  return (
    <Main fixed>
      <div className='flex w-full overflow-y-auto p-1 justify-center'>
        <Outlet />
      </div>
    </Main>
  )
}
