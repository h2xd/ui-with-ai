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
      <ChatSectionUI 
        handler={handler}
        // Enable annotations for tool rendering
        showAnnotations={true}
        // Custom annotation renderer if needed
        annotationRenderers={{
          events: ({ data }: { data: Array<{ type: string; name?: string; args?: unknown; result?: unknown; error?: string; duration?: number; timestamp: string }> }) => {
            // Custom rendering for tool events
            const toolUseEvents = data.filter((event) => event.type === 'tool_use')
            if (toolUseEvents.length === 0) return null
            
            return (
              <div className="border rounded-lg p-3 mt-2 bg-muted/50">
                <div className="text-sm font-medium mb-2">🛠️ Tool Usage</div>
                {toolUseEvents.map((event, index: number) => (
                  <div key={index} className="text-xs space-y-1">
                    <div><strong>Tool:</strong> {event.name}</div>
                    {event.args && (
                      <div><strong>Args:</strong> {JSON.stringify(event.args, null, 2)}</div>
                    )}
                    {event.result && (
                      <div><strong>Result:</strong> {JSON.stringify(event.result).substring(0, 100)}...</div>
                    )}
                    {event.error && (
                      <div className="text-destructive"><strong>Error:</strong> {event.error}</div>
                    )}
                    {event.duration && (
                      <div><strong>Duration:</strong> {event.duration}ms</div>
                    )}
                    <div className="text-muted-foreground">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            )
          }
        }}
      />
    </div>
  )
}
