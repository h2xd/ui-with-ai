import { NextRequest } from 'next/server';
import { Message, streamText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

// Environment variables schema
const envSchema = z.object({
  ANTHROPIC_API_KEY: z.string().min(1, 'ANTHROPIC_API_KEY is required').startsWith('sk-ant-', 'Invalid Anthropic API key format'),
  ANTHROPIC_MODEL: z.string().default('claude-3-5-haiku-20241022'),
  ANTHROPIC_MAX_TOKENS: z.coerce.number().int().positive().default(2048),
});

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Processing chat request...');
    
    // Validate environment variables with Zod
    const envResult = envSchema.safeParse(process.env);
    if (!envResult.success) {
      console.error('❌ Environment validation failed:', envResult.error.format());
      return Response.json(
        { 
          error: 'Environment configuration error',
          details: envResult.error.format()
        },
        { status: 500 }
      );
    }
    
    const env = envResult.data;
    console.log('🔑 API Key validated:', `${env.ANTHROPIC_API_KEY.substring(0, 20)}...`);
    console.log('🤖 Model:', env.ANTHROPIC_MODEL);
    console.log('🔢 Max tokens:', env.ANTHROPIC_MAX_TOKENS);
    
    const { messages }: { messages: Message[] } = await request.json();

    // Initialize Anthropic client
    const anthropic = createAnthropic({
      apiKey: env.ANTHROPIC_API_KEY,
    });

    // Stream the response using AI SDK
    const result = await streamText({
      model: anthropic(env.ANTHROPIC_MODEL),
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant powered by LlamaIndex and Anthropic Claude.',
        },
        ...messages,
      ],
      temperature: 0.7,
      maxTokens: env.ANTHROPIC_MAX_TOKENS,
    });

    console.log('✅ Successfully created streaming response from Anthropic');

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    return Response.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}