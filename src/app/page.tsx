'use client';

import { ChatSection } from '@/components/chat';
import { useChat } from 'ai/react';

export default function Home() {
  const handler = useChat({
    api: '/api/chat',
  });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4">
        <h1 className="text-2xl font-bold">UI with AI Chat</h1>
        <p className="text-muted-foreground">Powered by LlamaIndex and Anthropic Claude</p>
      </header>
      
      <main className="flex-1 container mx-auto max-w-4xl">
        <ChatSection handler={handler} />
      </main>
    </div>
  );
}
