"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MessageCircle, Bot } from 'lucide-react'
import { useChat } from "ai/react"
import { ChatSection as ChatSectionUI } from '@llamaindex/chat-ui'

import '@llamaindex/chat-ui/styles/markdown.css'
import '@llamaindex/chat-ui/styles/pdf.css'
import '@llamaindex/chat-ui/styles/editor.css'

export function AIAgent() {
  const [isOpen, setIsOpen] = useState(false)

  const chatHandler = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "Hi! I'm LeekBot 🥬 How can I help you with your leek shopping today? I can help you find the perfect leek, answer questions about our products, or just chat about the wonderful world of leeks!",
      },
    ],
  })

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          data-ai-toggle
          className="fixed bottom-4 right-4 z-50 rounded-full w-14 h-14 bg-green-600 hover:bg-green-700 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0 flex flex-col">
        <SheetHeader className="bg-green-600 text-white p-6 rounded-none">
          <SheetTitle className="text-xl flex items-center text-white">
            <Bot className="w-6 h-6 mr-3" />
            🥬 LeekBot Assistant
          </SheetTitle>
          <p className="text-green-100 text-sm">Your friendly leek shopping companion</p>
        </SheetHeader>

        {/* LlamaIndex Chat UI */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatSectionUI handler={chatHandler} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
