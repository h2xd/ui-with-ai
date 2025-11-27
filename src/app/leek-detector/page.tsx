'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type ZeroShotImagePipeline = {
  (
    image: HTMLImageElement | HTMLCanvasElement | ImageData | string | Blob,
    candidate_labels: string[]
  ): Promise<Array<{ label: string; score: number }>>
}

export default function LeekDetectorPage() {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [status, setStatus] = useState<string>('Idle')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [results, setResults] = useState<Array<{ label: string; score: number }>>([])
  const pipelineRef = useRef<ZeroShotImagePipeline | null>(null)

  const devicePreference = useMemo(() => {
    // Prefer WebGPU when available
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hasWebGPU = typeof navigator !== 'undefined' && (navigator as any).gpu
    return hasWebGPU ? 'webgpu' : 'wasm'
  }, [])

  const loadPipeline = useCallback(async () => {
    if (pipelineRef.current) return pipelineRef.current
    setStatus('Loading model (first run may take a bit)...')

    // Runtime dynamic import from CDN to avoid TS module resolution issues
    // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
    const dynamicImport = new Function('u', 'return import(u)')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mod: any = await dynamicImport('https://cdn.jsdelivr.net/npm/@xenova/transformers')
    const pipelineFactory =
      (mod && typeof mod.pipeline === 'function' && mod.pipeline) ||
      (mod?.default && typeof mod.default.pipeline === 'function' && mod.default.pipeline)
    if (typeof pipelineFactory !== 'function') {
      throw new Error('Transformers.js pipeline export not found from CDN module')
    }

    const dtype = devicePreference === 'webgpu' ? 'fp16' : 'q8'
    const pipe = await pipelineFactory(
      'zero-shot-image-classification',
      'Xenova/clip-vit-base-patch32',
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

  const loadImageElement = useCallback(async (src: string | Blob): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = typeof src === 'string' ? src : URL.createObjectURL(src)
    })
  }, [])

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setImageUrl('') // clear URL input if file chosen
      setResults([])
      setStatus('Ready')
    },
    []
  )

  const onUrlApply = useCallback(() => {
    if (!imageUrl.trim()) return
    setPreviewUrl(imageUrl.trim())
    setResults([])
    setStatus('Ready')
  }, [imageUrl])

  const handleDetect = useCallback(async () => {
    if (!previewUrl) {
      setStatus('Please select an image (file or URL).')
      return
    }
    setIsLoading(true)
    setStatus('Preparing…')
    try {
      const pipe = await loadPipeline()
      setStatus('Classifying…')
      // Ensure the image is loadable (throws early if not), but pass URL directly to pipeline
      await loadImageElement(previewUrl)

      const labels = ['leek', 'not leek']
      const out = await pipe(previewUrl, labels)
      setResults(out || [])
      setStatus('Done')
    } catch (err) {
      setStatus('Error')
      setResults([])
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [previewUrl, loadPipeline, loadImageElement])

  const leekScore = useMemo(() => {
    const v = results.find((r) => r.label.toLowerCase() === 'leek')?.score ?? 0
    return v
  }, [results])

  const verdict = useMemo(() => {
    if (!results.length) return ''
    const notScore = results.find((r) => r.label.toLowerCase().includes('not'))?.score ?? 0
    if (leekScore >= 0.5 && leekScore >= notScore) return 'Likely a Leek'
    return 'Likely Not a Leek'
  }, [results, leekScore])

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Leek Detector</CardTitle>
          <CardDescription>
            Check if an image contains a leek using zero-shot image classification (Transformers.js running in your browser).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm font-medium">Upload Image</div>
              <Input type="file" accept="image/*" onChange={onFileChange} />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Or Image URL</div>
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com/leek.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Button type="button" onClick={onUrlApply}>
                  Use
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleDetect} disabled={isLoading || !previewUrl}>
              {isLoading ? 'Detecting…' : 'Detect Leek'}
            </Button>
            <span className="text-sm text-muted-foreground">{status}</span>
          </div>

          {previewUrl ? (
            <div className="mt-2">
              <div className="text-sm font-medium mb-2">Preview</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-80 w-auto rounded-md border"
              />
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
          <CardDescription>Model decision and confidence</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-lg font-semibold">
            {results.length ? verdict : 'No result yet'}
          </div>
          {results.length ? (
            <div className="text-sm text-muted-foreground">
              Leek confidence: {(leekScore * 100).toFixed(1)}%
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Provide an image and click Detect.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


