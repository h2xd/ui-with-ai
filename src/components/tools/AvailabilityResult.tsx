"use client"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AvailabilityResult({ output }: { output: any }) {
  if (!output?.productName) return null
  return (
    <div className="space-y-3 rounded-lg p-3 bg-white shadow-md animate-in slide-in-from-left-4 fade-in-0 duration-300">
      <div className="flex items-center gap-2 text-green-800 font-medium">
        <span className="text-lg">📦</span>
        <span>Availability Check</span>
      </div>
      <div className="rounded-lg p-3 bg-muted/30 animate-in slide-in-from-left-4 fade-in-0 duration-300">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900 text-base">{output.productName}</div>
            <div className="text-sm text-gray-600">Product ID: {output.productId}</div>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
              output.inStock
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              <span className="text-lg">{output.inStock ? '✅' : '❌'}</span>
              <span>{output.availability}</span>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3">
          <div className="text-sm text-gray-600">{output.message}</div>
        </div>
      </div>
    </div>
  )
}