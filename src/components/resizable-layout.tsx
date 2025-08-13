"use client"

import { ReactNode, useEffect, useState, useRef } from 'react'
import { useChatContext } from '@/contexts/chat-context'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { ChatPanel } from '@/components/chat-panel'
import { ImperativePanelHandle } from 'react-resizable-panels'

interface ResizableLayoutProps {
  children: ReactNode
}

export function ResizableLayout({ children }: ResizableLayoutProps) {
  const { isOpen, setIsOpen } = useChatContext()
  const [isMobile, setIsMobile] = useState(false)
  const chatPanelRef = useRef<ImperativePanelHandle>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle chat panel expansion/collapse
  useEffect(() => {
    if (chatPanelRef.current && !isMobile) {
      if (isOpen) {
        chatPanelRef.current.expand()
      } else {
        chatPanelRef.current.collapse()
      }
    }
  }, [isOpen, isMobile])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // ESC to close chat
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
      // Ctrl/Cmd + K to toggle chat
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        setIsOpen(!isOpen)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, setIsOpen])

  // On mobile, use a simpler overlay approach
  if (isMobile) {
    return (
      <div className="h-full w-full relative">
        <div className="h-full overflow-auto">
          {children}
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                // Close chat when clicking outside on mobile
                setIsOpen(false)
              }
            }}
          >
            <div className="absolute right-0 top-0 h-full w-[90vw] max-w-md animate-in slide-in-from-right-2 duration-300">
              <ChatPanel />
            </div>
          </div>
        )}
      </div>
    )
  }

  // Desktop resizable layout
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel
        defaultSize={100}
        minSize={50}
        className="transition-all duration-500 ease-in-out"
      >
        <div className="h-full overflow-auto">
          {children}
        </div>
      </ResizablePanel>

      <ResizableHandle
        withHandle
        className="bg-border/60 hover:bg-border transition-all duration-200"
      />

      <ResizablePanel
        ref={chatPanelRef}
        defaultSize={0}
        minSize={35}
        maxSize={60}
        collapsible
        collapsedSize={0}
        className="transition-all duration-300 ease-in-out"
      >
        <ChatPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}