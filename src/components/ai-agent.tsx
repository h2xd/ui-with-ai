"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MessageCircle, Send, Bot } from 'lucide-react'
import { useChat } from "ai/react"

export function AIAgent() {
  const [isOpen, setIsOpen] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
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

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start space-x-2 max-w-[80%]">
                {message.role === "assistant" && (
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">🥬</span>
                  </div>
                )}
                <div
                  className={`p-4 rounded-lg ${
                    message.role === "user" 
                      ? "bg-green-600 text-white rounded-br-sm" 
                      : "bg-white border shadow-sm rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gray-600 text-sm">👤</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🥬</span>
                </div>
                <div className="bg-white border shadow-sm p-4 rounded-lg rounded-bl-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-500">LeekBot is typing...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t bg-white p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-3">
              <Input 
                value={input} 
                onChange={handleInputChange} 
                placeholder="Ask me anything about leeks..." 
                className="flex-1 border-gray-300 focus:border-green-500 focus:ring-green-500" 
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !input.trim()}
                className="bg-green-600 hover:bg-green-700 flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleInputChange({ target: { value: "What's your most popular leek?" } } as any)}
                className="text-xs"
              >
                Popular products
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleInputChange({ target: { value: "How do I care for leeks?" } } as any)}
                className="text-xs"
              >
                Growing tips
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleInputChange({ target: { value: "Tell me about the leek spin meme" } } as any)}
                className="text-xs"
              >
                Leek memes
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
