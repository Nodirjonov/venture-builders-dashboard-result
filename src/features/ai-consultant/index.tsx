

import { useEffect, useRef, useState } from 'react'
import {
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  Lightbulb,
  Pencil,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import {
  promptsData,
  questionsData,
  type PromptCategory,
} from './data/prompts-data'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

type ActiveDropdown = 'prompts' | 'questions' | null

export function AiConsultant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const promptsScrollRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null)
        setSearchQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Hardcoded static AI responses — no real API calls needed
  const STATIC_RESPONSES = [
    "Great question! Based on your business context, I'd recommend focusing on your core value proposition first. Define what makes your product or service unique and build your strategy around that.",
    "For Innovatech Academy, the key growth drivers are curriculum quality, student outcomes, and word-of-mouth referrals. Consider investing in showcasing student success stories.",
    "A strong go-to-market strategy starts with identifying your ideal customer profile. For STEM education, your primary audience is parents of K-12 students aged 8-18 in urban areas.",
    "Financial forecasting for an education business should account for enrollment seasonality. Expect higher sign-ups in August-September and January-February.",
    "To improve your marketing ROI, focus on the channels where your target audience spends time: parent Facebook groups, school community boards, and local community events.",
  ]

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setActiveDropdown(null)
    setSearchQuery('')

    // Static hardcoded reply after short delay
    setTimeout(() => {
      const reply: Message = {
        id: crypto.randomUUID(),
        text: STATIC_RESPONSES[Math.floor(Math.random() * STATIC_RESPONSES.length)],
        sender: 'ai',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, reply])
    }, 800)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handlePromptClick = (text: string) => {
    handleSendMessage(text)
  }

  const toggleDropdown = (type: ActiveDropdown) => {
    if (activeDropdown === type) {
      setActiveDropdown(null)
      setSearchQuery('')
    } else {
      setActiveDropdown(type)
      setSearchQuery('')
    }
  }

  const currentData: PromptCategory[] =
    activeDropdown === 'prompts' ? promptsData : questionsData

  const filteredData = currentData
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0)

  const scrollPromptsBar = (direction: 'left' | 'right') => {
    if (promptsScrollRef.current) {
      const scrollAmount = 200
      promptsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      {/* Header */}
      <Header>
        <div className='flex items-center gap-3'>
          <button className='flex items-center gap-1.5 text-[14px] font-medium text-[#1F2937] hover:text-[#111827]'>
            Select chat
            <ChevronDown className='h-4 w-4 text-[#6B7280]' />
          </button>
        </div>
        <button className='ml-2 text-[#6B7280] hover:text-[#111827]'>
          <Pencil className='h-4 w-4' />
        </button>
        <div className='ms-auto flex items-center space-x-4' />
      </Header>

      <Main fixed className='!p-0'>
        <div className='flex h-full flex-col bg-white'>
          {/* Chat area */}
          <div className='flex flex-1 flex-col items-center overflow-y-auto overflow-x-hidden'>
            {messages.length === 0 ? (
              /* Empty state */
              <div className='flex flex-1 flex-col items-center justify-center px-4'>
                <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-[7px]  bg-blue-50'>
                  <svg
                    width='28'
                    height='28'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z'
                      stroke='#3B82F6'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M8 9H16'
                      stroke='#3B82F6'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                    />
                    <path
                      d='M8 13H13'
                      stroke='#3B82F6'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                    />
                  </svg>
                </div>
                <h1 className='mb-3 text-[22px] font-bold text-[#111827]'>
                  Venturekit Chat
                </h1>
                <p className='mb-4 max-w-md text-center text-[14px] leading-relaxed text-[#6B7280]'>
                  Your AI consultant, powered by ChatGPT. Ask it anything –
                  from generating content to getting business advice. Start by
                  sending a message or selecting an idea below.
                </p>
                <button className='flex items-center gap-1.5 text-[14px] font-medium text-[#059669] hover:text-[#047857]'>
                  <CircleCheckBig className='h-4 w-4' />
                  Your company brief
                </button>
              </div>
            ) : (
              /* Messages — justify-end pushes messages to bottom like real chats */
              <div className='w-full max-w-2xl flex-1 flex flex-col justify-end space-y-4 px-4 pt-6 pb-4'>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex w-full min-w-0',
                      message.sender === 'user'
                        ? 'justify-end'
                        : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed',
                        message.sender === 'user'
                          ? 'bg-[#F3F4F6]/80 text-[#1F2937]'
                          : 'bg-[#F3F4F6]/80 text-[#1F2937]'
                      )}
                      style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Bottom input area */}
          <div className='relative bg-white px-4 pt-3 pb-3'>
            {/* Dropdown panel */}
            {activeDropdown && (
              <div
                ref={dropdownRef}
                className='absolute bottom-full left-4 right-4 sm:right-auto z-50 mb-1 sm:w-[420px] rounded-xl border border-[#E5E7EB] bg-white shadow-lg'
              >
                {/* Search */}
                <div className='flex items-center gap-2 border-b border-[#E5E7EB] px-3 py-2.5'>
                  <Search className='h-4 w-4 text-[#9CA3AF]' />
                  <input
                    type='text'
                    placeholder='Search Prompts...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='flex-1 bg-transparent text-[14px] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none'
                    autoFocus
                  />
                </div>

                {/* Content */}
                <div className='max-h-[320px] overflow-y-auto py-1'>
                  {filteredData.length > 0 ? (
                    filteredData.map((category) => (
                      <div key={category.title}>
                        <div className='px-3 pt-3 pb-1 text-[13px] font-semibold text-[#111827]'>
                          {category.title}
                        </div>
                        {category.items.map((item) => (
                          <button
                            key={item.text}
                            onClick={() => handlePromptClick(item.text)}
                            className='w-full px-3 py-1.5 text-left text-[13px] text-[#4B5563] hover:bg-[#F9FAFB]'
                          >
                            {item.text}
                          </button>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className='px-3 py-6 text-center text-[13px] text-[#9CA3AF]'>
                      No results found
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Input row */}
            <div className='mx-auto flex w-full max-w-2xl items-center gap-2'>
              <div className='flex flex-1 items-center rounded-full bg-[#F9FAFB] px-4 py-2.5 shadow-[0_1px_6px_rgba(0,0,0,0.08)]'>
                <input
                  type='text'
                  placeholder='Ask your AI consultant anything...'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className='flex-1 min-w-0 bg-transparent text-[14px] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none'
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className={cn(
                    'ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors',
                    inputValue.trim()
                      ? 'bg-[#111827] text-white hover:bg-[#1F2937]'
                      : 'bg-[#E5E7EB] text-[#9CA3AF]'
                  )}
                >
                  <ArrowUp className='h-4 w-4' />
                </button>
              </div>
            </div>

            {/* Prompts / Questions bar */}
            <div className='mt-2 flex items-center gap-1'>
              <button
                onClick={() => scrollPromptsBar('left')}
                className='flex h-6 w-6 shrink-0 items-center justify-center text-[#9CA3AF] hover:text-[#6B7280]'
              >
                <ChevronLeft className='h-4 w-4' />
              </button>

              <div
                ref={promptsScrollRef}
                className='flex flex-1 items-center gap-1 overflow-x-auto scrollbar-none'
              >
                <button
                  onClick={() => toggleDropdown('prompts')}
                  className={cn(
                    'flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors',
                    activeDropdown === 'prompts'
                      ? 'bg-[#F3F4F6] text-[#111827]'
                      : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]'
                  )}
                >
                  <Lightbulb className='h-3.5 w-3.5' />
                  Prompts
                </button>
                <button
                  onClick={() => toggleDropdown('questions')}
                  className={cn(
                    'flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors',
                    activeDropdown === 'questions'
                      ? 'bg-[#F3F4F6] text-[#111827]'
                      : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]'
                  )}
                >
                  <Lightbulb className='h-3.5 w-3.5' />
                  Questions
                </button>
              </div>

              <button
                onClick={() => scrollPromptsBar('right')}
                className='flex h-6 w-6 shrink-0 items-center justify-center text-[#9CA3AF] hover:text-[#6B7280]'
              >
                <ChevronRight className='h-4 w-4' />
              </button>
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}
