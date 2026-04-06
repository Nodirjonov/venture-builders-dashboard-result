import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { useUpgradeStore } from '@/stores/upgrade-store'
import { Link, useLocation } from '@tanstack/react-router'
import {
  BarChart,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Crown,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  MessageCircle,
  Pencil,
  PieChart,
  PlusCircle,
  Presentation,
  Rocket,
  Settings,
  Target,
  Trash2,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type NavKey =
  | 'home'
  | 'plans'
  | 'guides'
  | 'ai_consultant'
  | 'pitch'
  | 'radar'
  | 'market_research'
  | 'financials'
  | 'formation'

type NavSimple = { key: NavKey; url: string; icon: React.ElementType; label: string; items?: never }
type NavWithSub = { key: NavKey; url?: string; icon: React.ElementType; label: string; items: { title: string; url: string }[] }
type NavEntry = NavSimple | NavWithSub

const navItems: NavEntry[] = [
  { key: 'home', url: '/', icon: Home, label: 'Home' },
  { key: 'plans', url: '/plans', icon: FileText, label: 'Plans' },
  { key: 'guides', url: '/guides', icon: BookOpen, label: 'Guides' },
  { key: 'ai_consultant', url: '/ai-consultant', icon: MessageCircle, label: 'AI Consultant' },
  { key: 'pitch', url: '/pitch', icon: Presentation, label: 'Pitch Decks' },
  {
    key: 'radar',
    icon: Target,
    label: 'Radar',
    items: [
      { title: 'Overview', url: '/radar' },
      { title: 'News', url: '/radar/news' },
      { title: 'Events', url: '/radar/events' },
      { title: 'Social Media', url: '/radar/social-media' },
      { title: 'Competitor Monitoring', url: '/radar/competitor-monitoring' },
    ],
  },
  {
    key: 'market_research',
    icon: PieChart,
    label: 'Market Research',
    items: [
      { title: 'Audience', url: '/market-research' },
      { title: 'Personas', url: '/market-research/personas' },
      { title: 'Benchmarks', url: '/market-research/benchmarks' },
      { title: 'Competitors', url: '/market-research/competitors' },
    ],
  },
  {
    key: 'financials',
    icon: BarChart,
    label: 'Financials',
    items: [
      { title: 'Overview', url: '/financials' },
      { title: 'Revenue', url: '/financials/revenue' },
      { title: 'Expenses', url: '/financials/expenses' },
      { title: 'Financing', url: '/financials/financing' },
      { title: 'Dividends', url: '/financials/dividends' },
      { title: 'Taxes', url: '/financials/taxes' },
      { title: 'Profit & Loss', url: '/financials/profit-loss' },
      { title: 'Balance Sheet', url: '/financials/balance-sheet' },
      { title: 'Cash Flow', url: '/financials/cash-flow' },
    ],
  },
  { key: 'formation', url: '/formation', icon: Rocket, label: 'Formation' },
]

function checkIsActive(href: string, url: string) {
  return href === url || (url !== '/' && href.startsWith(url))
}

function isGroupActive(href: string, items: { url: string }[]) {
  return items.some(item => href === item.url || href === item.url + '/' || href.startsWith(item.url + '/'))
}

function CollapsibleNavItem({
  item,
  isActive,
  href,
  label,
  showTooltip,
}: {
  item: NavWithSub
  isActive: boolean
  href: string
  label: string
  showTooltip: boolean
}) {
  const [manualOpen, setManualOpen] = useState<boolean | null>(null)

  // Reset manual override when route changes so active group auto-opens
  /* eslint-disable react-hooks/refs */
  const prevHref = useRef(href)
  if (prevHref.current !== href) {
    prevHref.current = href
    if (manualOpen !== null) setManualOpen(null)
  }
  /* eslint-enable react-hooks/refs */

  const open = manualOpen !== null ? manualOpen : isActive

  return (
    <Collapsible
      asChild
      open={open}
      onOpenChange={setManualOpen}
      className='group/collapsible'
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            isActive={isActive}
            tooltip={showTooltip ? label : undefined}
            className={cn(
              'flex items-center gap-2 w-full py-[7px] px-2 h-[36px] outline-none border-none ring-0 focus:ring-0 focus:outline-none focus:bg-[#E5E7EB] transition-all duration-200 sb-item',
              isActive ? 'bg-[#E5E7EB]' : 'bg-transparent text-[#6b7280]',
            )}
          >
            <div className='w-8 h-8 flex items-center justify-center shrink-0'>
              <item.icon
                className={cn(
                  'h-[20px] w-[20px] ml-0 shrink-0',
                  isActive ? 'text-[#000]' : 'text-[#6B7280]'
                )}
                strokeWidth={1.5}
              />
            </div>
            <span className={cn(
              'text-[14px] whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-200 sb-text',
              isActive ? 'text-[#000] font-medium' : 'text-[#6B7280] font-normal',
            )}>
              {label}
            </span>
            <ChevronDown className={cn(
              'ms-auto h-4 w-4 text-[#9CA3AF] shrink-0 transition-transform duration-200 sb-caret',
              'group-data-[state=open]/collapsible:rotate-180',
            )} />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className='sb-sub-menu transition-all duration-200'>
          <SidebarMenuSub className='ml-4 border-l border-[#E5E7EB] pl-0'>
            {item.items.map((subItem) => {
              const subActive = href === subItem.url || href === subItem.url + '/'
              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={subActive}
                    className={cn(
                      'h-9 rounded-lg px-3 text-[13px] font-medium',
                      'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]',
                      subActive && 'text-[#111827] font-semibold'
                    )}
                  >
                    <Link to={subItem.url}>
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              )
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

function ScenarioItem({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(initialName)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  if (isEditing) {
    return (
      <div className='flex items-center w-full px-2 py-1.5 focus:outline-none' onClick={(e) => { e.preventDefault(); e.stopPropagation() }}>
        <div className='flex items-center border border-gray-300 rounded-md w-full overflow-hidden bg-white shadow-sm'>
          <input
            autoFocus
            type='text'
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className='flex-1 h-8 px-2.5 text-[14px] text-gray-900 focus:outline-none min-w-0 bg-transparent'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); e.stopPropagation()
                setName(editValue)
                setIsEditing(false)
              } else if (e.key === 'Escape') {
                e.preventDefault(); e.stopPropagation()
                setIsEditing(false)
                setEditValue(name)
              }
            }}
          />
          <div className='flex items-center shrink-0 pr-1'>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setName(editValue); setIsEditing(false) }}
              className='h-6 w-6 flex items-center justify-center rounded-[4px] bg-[#86EFAC] hover:bg-[#6EE7B7] transition-colors m-0.5 shrink-0'
            >
              <Check className='h-[14px] w-[14px] text-[#064E3B]' />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsEditing(false); setEditValue(name) }}
              className='h-6 w-6 flex items-center justify-center rounded-[4px] hover:bg-gray-100 text-gray-600 transition-colors shrink-0'
            >
              <X className='h-[14px] w-[14px]' />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <DropdownMenuItem 
        className='group px-3 py-1.5 cursor-pointer rounded-r-lg hover:bg-[#F9FAFB] flex items-center justify-between w-full min-h-[36px]'
      >
        <span className='text-[14px] text-[#111827] font-medium truncate flex-1'>{name}</span>
        <div className='hidden group-hover:flex items-center gap-1.5 shrink-0 ml-2'>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsEditing(true); setEditValue(name) }}
            className='text-gray-500 hover:text-gray-900 transition-colors flex items-center justify-center'
          >
            <Pencil className='h-[14px] w-[14px]' />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowDeleteAlert(true) }}
            className='bg-[#FECACA] hover:bg-[#FCA5A5] rounded-md transition-colors flex items-center justify-center w-5 h-5 ml-1'
          >
            <Trash2 className='h-[12px] w-[12px] text-[#991B1B]' />
          </button>
        </div>
      </DropdownMenuItem>
      
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className='max-w-[420px] rounded-2xl p-6'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-[18px] font-bold text-[#111827]'>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className='text-[#4B5563] text-[14px] mt-2'>
              This will delete all data associated with the <span className="font-semibold">{name}</span> scenario. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='mt-5 gap-3'>
            <AlertDialogCancel className='mt-0 border-none shadow-none text-[#111827] hover:bg-[#F3F4F6] font-medium' onClick={(e) => e.stopPropagation()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className='!bg-transparent !text-[#EF4444] hover:!bg-red-50 !border-none !shadow-none font-medium text-[14px] px-4'
              onClick={(e) => { e.stopPropagation(); setShowDeleteAlert(false) }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export function AppSidebar() {
  const href = useLocation({ select: (location) => location.pathname })
  const isPlansPage = href.startsWith('/plans')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { openModal } = useUpgradeStore()
  const { setOpen } = useSidebar()

  // On /plans: collapse sidebar to icons only
  // On all other pages: sidebar is fully open
  useEffect(() => {
    if (isPlansPage) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [isPlansPage, setOpen])

  return (
    <>
    <style>{`
      /* Smooth transitions for native text handling */
      .sb-text {
         width: auto;
         opacity: 1;
      }
      .plans-sidebar.group[data-collapsible="icon"][data-state="collapsed"]:not(:hover) .sb-item.sb-item {
         padding: 0 !important;
         margin: 0 !important;
         justify-content: center !important;
         gap: 0 !important;
         width: 100% !important;
         height: 36px !important;
      }
      .sb-caret {
         display: block;
      }
      .sb-sub-menu {
         display: block;
      }
      .sb-upgrade-text {
         display: block;
      }
      .sb-upgrade-crown {
         display: none;
      }

      /* Shadcn normally strips width and gap when data-state=collapsed.
         We re-apply them ONLY IF the container is hovered, 
         to prevent jumpy classes while maintaining native flex alignment */
      .plans-sidebar.group[data-collapsible="icon"][data-state="collapsed"]:not(:hover) .sb-text {
         width: 0px !important;
         opacity: 0 !important;
         min-width: 0 !important;
         padding: 0 !important;
         margin: 0 !important;
      }
      .plans-sidebar.group[data-collapsible="icon"][data-state="collapsed"] .sb-sub-menu {
         display: none !important;
      }
      .plans-sidebar.group[data-collapsible="icon"][data-state="collapsed"]:not(:hover) .sb-caret {
         display: none !important;
      }
      .plans-sidebar.group[data-collapsible="icon"][data-state="collapsed"]:not(:hover) .sb-item.sb-item.sb-upgrade-btn {
         width: 32px !important;
         height: 32px !important;
         border-radius: 50% !important;
         padding: 0 !important;
         justify-content: center !important;
      }
      .plans-sidebar.group[data-collapsible="icon"][data-state="collapsed"]:not(:hover) .sb-item.sb-item.sb-logo-btn {
         width: 32px !important;
         height: 32px !important;
         min-height: 32px !important;
         padding: 0 !important;
         justify-content: center !important;
      }
      .plans-sidebar.group[data-collapsible="icon"][data-state="collapsed"]:not(:hover) .sb-item.sb-item.sb-company-btn {
        width: 32px !important;
        height: 32px !important;
        padding: 0 !important;
        justify-content: center !important;
      }
      .plans-sidebar.group[data-collapsible="icon"][data-state="collapsed"]:not(:hover) .sb-company-caret {
        display: none !important;
      }
      .plans-sidebar.group[data-collapsible="icon"][data-state="collapsed"]:not(:hover) .sb-upgrade-text {
         display: none !important;
      }
      .plans-sidebar.group[data-collapsible="icon"][data-state="collapsed"]:not(:hover) .sb-upgrade-crown {
         display: flex !important;
      }

      /* Explicitly fix Shadcn Native size-8 override which restricts width globally */
      .plans-sidebar.group[data-collapsible="icon"]:hover [data-sidebar="menu-button"] {
         width: 100% !important;
         padding-left: 8px !important;
         padding-right: 8px !important;
      }
    `}</style>
    <Sidebar
      collapsible='icon'
      variant='sidebar'
      className={cn('border-r border-[#E5E7EB] !bg-white', isPlansPage && 'plans-sidebar')}
      style={{'--sidebar-accent': '#E5E7EB', '--sidebar-accent-foreground': '#111827'} as React.CSSProperties}
    >
      <SidebarHeader className='px-2 sb-wrapper pt-[18px] pb-[10px] !bg-white border-none shadow-none flex flex-row items-center justify-between transition-all duration-200'>
        <Link
          to='/'
          className='flex items-center gap-2 px-2 outline-none flex-shrink-0 min-h-[58px] overflow-hidden transition-all duration-200 sb-item sb-logo-btn'
        >
          <div className='relative flex-shrink-0 flex items-center justify-center w-8 h-8'>
            <img
              src='/images/logo.png'
              alt='Venturekit'
              className='w-full h-full object-contain'
            />
          </div>
          <span className='font-semibold text-[#000] text-[18px] whitespace-nowrap sb-text transition-all duration-200'>
            Venturekit
          </span>
        </Link>
        <SidebarTrigger className='md:hidden h-8 w-8 text-gray-500 hover:bg-gray-100 rounded-md shrink-0 flex items-center justify-center p-0.5' aria-label="Close sidebar">
          <X className="h-5 w-5" />
        </SidebarTrigger>
      </SidebarHeader>

      <SidebarContent className='overflow-x-hidden min-h-0 [scrollbar-width:thin]'>
        <div className='px-2 sb-wrapper transition-all duration-200'>
        {/* Company Switcher Trigger */}
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <button
              className='w-full flex items-center py-2 px-2 rounded-lg bg-transparent hover:bg-[#F3F4F6] data-[state=open]:bg-[#F3F4F6] transition-all duration-200 mt-2 mb-1 focus:outline-none focus:ring-0 gap-2 sb-item overflow-hidden sb-company-btn'
            >
              <div className='flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#111827] text-white text-[15px] font-bold shrink-0'>
                I
              </div>
              <span className='flex-1 text-left text-[14px] font-semibold text-[#1F2937] truncate sb-text transition-all duration-200'>
                Innovatech Academy
              </span>
              <ChevronRight className='h-4 w-4 text-gray-400 font-bold shrink-0 sb-caret sb-company-caret transition-all duration-200' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side='bottom'
            align='start'
            sideOffset={4}
            className='w-64 bg-white shadow-lg rounded-xl z-50 p-2 border border-[#E5E7EB]'
          >
            <DropdownMenuLabel className='text-[10px] text-gray-400 font-semibold px-2 py-1.5 uppercase tracking-widest'>
              CURRENT COMPANY
            </DropdownMenuLabel>
            <DropdownMenuItem className='px-2 py-2 cursor-pointer flex items-center justify-between rounded-lg hover:bg-[#F9FAFB]'>
              <div className='flex items-center min-w-0 gap-2.5'>
                <div className='flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#111827] text-white text-[15px] font-bold shrink-0'>
                  I
                </div>
                <span className='font-bold text-[#111827] text-[14px] whitespace-nowrap'>
                  Innovatech Academy
                </span>
              </div>
              <Check className='h-4 w-4 text-gray-900' />
            </DropdownMenuItem>
            <div className='ml-4 mt-0.5 border-s-[2px] border-[#10B981]'>
              <ScenarioItem initialName={'Initial Scenario'} />
            </div>
            <DropdownMenuSeparator className='my-2' />
            <DropdownMenuItem className='px-2 py-2 cursor-pointer text-[14px] text-[#4B5563] flex items-center gap-2.5 rounded-lg hover:bg-[#F9FAFB]'>
              <PlusCircle className='h-5 w-5 text-gray-400' />
              Add New Company
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>

        <div className='px-2 sb-wrapper mt-4 transition-all duration-200'>
        <SidebarMenu className='gap-0.5'>
          {navItems.map((item) => {
            if (item.items) {
              const groupActive = isGroupActive(href, item.items)
              return (
                <CollapsibleNavItem
                  key={item.key}
                  item={item}
                  isActive={groupActive}
                  href={href}
                  label={item.label}
                  showTooltip={isPlansPage}
                />
              )
            }

            const isActive = checkIsActive(href, item.url)
            return (
              <SidebarMenuItem key={item.key}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={isPlansPage ? item.label : undefined}
                  className={cn(
                    'flex items-center w-full py-[7px] px-2 h-[36px] outline-none border-none ring-0 focus:ring-0 focus:outline-none focus:bg-[#E5E7EB] transition-all duration-200 sb-item overflow-hidden',
                    isActive ? 'bg-[#E5E7EB]' : 'bg-transparent text-[#6b7280]',
                  )}
                >
                  <Link
                    to={item.url}
                    className='flex min-w-0 items-center w-full gap-2 transition-all duration-200'
                  >
                    <div className='w-8 h-8 flex items-center justify-center shrink-0'>
                      <item.icon
                        className={cn(
                          'h-[20px] w-[20px] ml-0 shrink-0 transition-colors',
                          isActive ? 'text-[#000]' : 'text-[#6B7280]',
                          'group-hover/link:text-[#000]'
                        )}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className={cn(
                      'flex-1 min-w-0 overflow-hidden text-ellipsis text-[14px] whitespace-nowrap transition-all duration-200 sb-text',
                      isActive ? 'text-[#000] font-medium' : 'text-[#6B7280] font-normal group-hover/link:text-[#000]',
                    )}>
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className='px-2 sb-wrapper pb-[16px] border-t font-sans mt-auto border-transparent transition-all duration-200'>
        <div className='mb-2 w-full mx-auto'>
          <button
            onClick={openModal}
            className='w-full h-10 px-0 rounded-[22px] bg-[#111827] text-white text-[14px] font-medium flex items-center justify-center hover:bg-[#1e293b] transition-all duration-200 sb-item overflow-hidden sb-upgrade-btn'
          >
            <div className='w-8 h-8 flex items-center justify-center shrink-0 sb-upgrade-crown'>
              <Crown
                className='h-[18px] w-[18px] text-white shrink-0'
                strokeWidth={1.5}
              />
            </div>
            <span className='whitespace-nowrap flex-1 text-center transition-all duration-200 sb-upgrade-text'>
              Upgrade
            </span>
          </button>
        </div>

        <SidebarMenu className='gap-1'>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={isPlansPage ? 'Help Center' : undefined}
              className='flex items-center w-full h-9 rounded-lg py-1.5 px-2 text-sm font-medium text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827] transition-all duration-200 sb-item overflow-hidden'
            >
              <Link
                to='/help-center'
                className='flex items-center w-full gap-2 transition-all duration-200'
              >
                <div className='w-8 h-8 flex items-center justify-center shrink-0'>
                  <HelpCircle className='h-[18px] w-[18px] text-[#6B7280] shrink-0' strokeWidth={1.5} />
                </div>
                <span className='transition-all duration-200 whitespace-nowrap overflow-hidden sb-text'>
                  Help Center
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip={isPlansPage ? 'Account' : undefined}
                  className='h-9 rounded-lg py-1.5 px-2 text-sm font-medium transition-all duration-200 flex items-center w-full bg-transparent hover:bg-[#E5E7EB] data-[state=open]:bg-[#E5E7EB] text-[#111827] sb-item overflow-hidden'
                >
                  <div className='w-8 h-8 flex items-center justify-center shrink-0'>
                    <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#005596] text-white text-[11px] font-bold'>
                      M
                    </div>
                  </div>
                  <span className='transition-all duration-200 whitespace-nowrap overflow-hidden sb-text'>
                    Account
                  </span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side='top'
                align='start'
                sideOffset={12}
                className='w-56 p-0 overflow-hidden rounded-xl border border-[#E5E7EB] shadow-xl bg-white'
              >
                <div className='h-[26px] bg-[#222] w-full' />
                <div className='p-1'>
                  <DropdownMenuItem asChild className='cursor-pointer rounded-lg hover:bg-[#F3F4F6] py-2 px-3 focus:bg-[#F3F4F6] outline-none'>
                    <Link to='/settings/account' className='flex items-center gap-3 w-full'>
                      <Settings className='h-4 w-4 text-[#111827]' strokeWidth={1.5} />
                      <span className='text-[14px] font-medium text-[#111827]'>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className='my-1 bg-[#E5E7EB]' />
                  <DropdownMenuItem className='cursor-pointer rounded-lg hover:bg-[#F3F4F6] py-2 px-3 focus:bg-[#F3F4F6] outline-none flex items-center gap-3'>
                    <LogOut className='h-4 w-4 text-[#111827]' strokeWidth={1.5} />
                    <span className='text-[14px] font-medium text-[#111827]'>Log out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* SidebarRail only on Plans — allows toggling collapse only there */}
      {isPlansPage && <SidebarRail />}
    </Sidebar>
    </>
  )
}
