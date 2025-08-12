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
              <div className="border rounded-lg p-3 mt-2 bg-muted/50 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                <div className="text-sm font-medium mb-2">🛠️ Tool Usage</div>
                {toolUseEvents.map((event, index: number) => {
                  // More robust completion detection
                  const hasResult = event.result !== undefined && event.result !== null
                  const hasError = event.error !== undefined && event.error !== null
                  const isCompleted = hasResult || hasError
                  
                  return (
                    <div 
                      key={`${event.name}-${index}-${event.timestamp}`}
                      className={`text-xs space-y-1 transition-all duration-500 ease-in-out ${
                        isCompleted 
                          ? 'opacity-60 scale-95' 
                          : 'opacity-100 scale-100 animate-pulse'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">🛠️ {event.name}</span>
                        {isCompleted ? (
                          <span className="text-green-600 text-xs">✓ completed</span>
                        ) : (
                          <div className="inline-flex items-center gap-1">
                            <div className="animate-spin rounded-full h-3 w-3 border border-primary border-t-transparent"></div>
                            <span className="text-yellow-600 text-xs">running...</span>
                          </div>
                        )}
                      </div>
                      {event.args && (
                        <div className="bg-gray-100 dark:bg-gray-800 rounded p-2">
                          <strong>Parameters:</strong> 
                          <pre className="text-xs mt-1 overflow-x-auto">{JSON.stringify(event.args, null, 2)}</pre>
                        </div>
                      )}
                      {hasResult && (
                        <div className="animate-in fade-in-0 slide-in-from-left-2 duration-300 bg-green-50 dark:bg-green-900/20 rounded p-2 border-l-2 border-green-500">
                          <strong className="text-green-700 dark:text-green-300">✓ Result:</strong>
                          <pre className="text-xs mt-1 overflow-x-auto max-h-32 overflow-y-auto">{typeof event.result === 'string' ? event.result : JSON.stringify(event.result, null, 2)}</pre>
                        </div>
                      )}
                      {hasError && (
                        <div className="animate-in fade-in-0 slide-in-from-left-2 duration-300 bg-red-50 dark:bg-red-900/20 rounded p-2 border-l-2 border-red-500">
                          <strong className="text-red-700 dark:text-red-300">✗ Error:</strong>
                          <pre className="text-xs mt-1">{event.error}</pre>
                        </div>
                      )}
                      {event.duration && (
                        <div className="text-muted-foreground text-xs">
                          <strong>Duration:</strong> {event.duration}ms
                        </div>
                      )}
                      <div className="text-muted-foreground text-xs">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          }
        }}
      />
    </div>
  )
}
