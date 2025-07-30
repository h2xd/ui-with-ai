'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChatSection } from '@/components/chat'
import { useChat } from 'ai/react'

export function AIAgent() {
  const [isOpen, setIsOpen] = useState(false)
  
  const handler = useChat({
    api: '/api/chat',
  })

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg bg-green-600 hover:bg-green-700"
        >
          {isOpen ? '✕' : '🤖'}
        </Button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-end p-6 pointer-events-none">
          <div className="w-full max-w-md h-[600px] bg-background border border-border rounded-lg shadow-xl pointer-events-auto">
            <div className="p-4 border-b border-border bg-green-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🥬</span>
                  <div>
                    <h3 className="font-semibold text-green-800">LeekShop AI Assistant</h3>
                    <p className="text-sm text-muted-foreground">Ask me about leeks!</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </Button>
              </div>
            </div>
            <div className="h-[500px] overflow-hidden">
              <ChatSection handler={handler} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}