'use client'

import { ChatSection as ChatSectionUI } from '@llamaindex/chat-ui'
import { UseChatHelpers } from 'ai/react'

import '@llamaindex/chat-ui/styles/markdown.css'
import '@llamaindex/chat-ui/styles/pdf.css'
import '@llamaindex/chat-ui/styles/editor.css'

interface ChatSectionProps {
  handler: UseChatHelpers
}

export function ChatSection({ handler }: ChatSectionProps) {
  return (
    <div className="flex max-h-[80vh] flex-col gap-6 overflow-y-auto p-4">
      <ChatSectionUI handler={handler} />
    </div>
  )
}
