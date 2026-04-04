import { type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import { NavigationProgress } from '@/components/navigation-progress'
import { GeneralError } from '@/features/errors/general-error'
import { NotFoundError } from '@/features/errors/not-found-error'
import { UpgradeModal } from '@/components/upgrade-modal'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    return (
      <>
        <NavigationProgress />
        <Outlet />
        <UpgradeModal />
        <Toaster duration={5000} />
      </>
    )
  },
  notFoundComponent: NotFoundError,
  errorComponent: ({ error }) => <GeneralError error={error} />,
})
