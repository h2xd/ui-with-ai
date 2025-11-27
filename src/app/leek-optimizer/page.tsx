'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type Pipeline = {
  (input: string, options?: Record<string, unknown>): Promise<Array<{ generated_text?: string; summary_text?: string }>>
  model?: unknown
}

export default function LeekOptimizerPage() {
  const [inputText, setInputText] = useState<string>('I wrote some product copy but it feels bland. Make it funnier.')
  const [outputText, setOutputText] = useState<string>('')
  const [status, setStatus] = useState<string>('Idle')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const pipelineRef = useRef<Pipeline | null>(null)

  const devicePreference = useMemo(() => {
    // Prefer WebGPU when available
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hasWebGPU = typeof navigator !== 'undefined' && (navigator as any).gpu
    return hasWebGPU ? 'webgpu' : 'wasm'
  }, [])

  const loadPipeline = useCallback(async () => {
    if (pipelineRef.current) return pipelineRef.current
    setStatus('Loading model (first run may take a bit)...')

    // Load Transformers.js from CDN ESM in the browser
    // Standard dynamic import of remote ESM (executed client-side)
    // Dynamically import via runtime indirection to avoid TS/ bundler static resolution
    // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
    const dynamicImport = new Function('u', 'return import(u)')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mod: any = await dynamicImport('https://cdn.jsdelivr.net/npm/@xenova/transformers')
    // Handle both named and default exports gracefully
    const pipelineFactory =
      (mod && typeof mod.pipeline === 'function' && mod.pipeline) ||
      (mod?.default && typeof mod.default.pipeline === 'function' && mod.default.pipeline)
    if (typeof pipelineFactory !== 'function') {
      throw new Error('Transformers.js pipeline export not found from CDN module')
    }

    const dtype = devicePreference === 'webgpu' ? 'fp16' : 'q4'
    // Use a small instruction-tuned T5 for text2text
    const pipe = await pipelineFactory(
      'text2text-generation',
      'Xenova/LaMini-Flan-T5-77M',
      {
        device: devicePreference,
        dtype,
        progress_callback: (data: { status?: string; loaded?: number; total?: number }) => {
          if (!data) return
          if (data.status === 'progress' && data.total && data.loaded !== undefined) {
            const pct = Math.round((data.loaded / data.total) * 100)
            setStatus(`Downloading weights… ${pct}%`)
          } else if (typeof data.status === 'string') {
            setStatus(data.status)
          }
        },
      }
    )

    pipelineRef.current = pipe
    setStatus('Model ready')
    return pipe
  }, [devicePreference])

  const handleOptimize = useCallback(async () => {
    if (!inputText.trim()) {
      setOutputText('Please enter some text to optimize.')
      return
    }
    setIsLoading(true)
    setStatus('Preparing…')
    try {
      const pipe = await loadPipeline()
      setStatus('Generating…')

      const prompt = [
        'Rewrite the following text to be funnier and more engaging.',
        'Keep it concise, add a tasteful pun, and weave in one or two quirky insights about leeks (the vegetable).',
        'Avoid being cringey; keep it witty, friendly, and brand-safe.',
        '',
        `Text: """${inputText.trim()}"""`,
        '',
        'Output:',
      ].join('\n')

      const result = await pipe(prompt, {
        max_new_tokens: 128,
        temperature: 0.7,
        top_p: 0.95,
      })

      const text =
        result?.[0]?.generated_text ??
        result?.[0]?.summary_text ??
        'No output was generated. Try again with a shorter input.'
      setOutputText(text)
      setStatus('Done')
    } catch (err) {
      setStatus('Error')
      setOutputText('Something went wrong generating the text. Please try again.')
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [inputText, loadPipeline])

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Leek Optimizer</CardTitle>
          <CardDescription>
            Make any text funnier and sneak in a clever leek tidbit — right in your browser using Transformers.js.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your text here…"
            className="min-h-[140px]"
          />
          <div className="flex items-center gap-3">
            <Button onClick={handleOptimize} disabled={isLoading}>
              {isLoading ? 'Optimizing…' : 'Make it funnier (with leeks!)'}
            </Button>
            <span className="text-sm text-muted-foreground">{status}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Suggestion</CardTitle>
          <CardDescription>A playful rewrite, garnished with leek lore.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap text-sm leading-6">
            {outputText || 'Your optimized text will appear here.'}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


