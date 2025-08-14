"use client"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CategoriesResult({ output }: { output: any }) {
  if (!output?.categories) return null
  return (
    <div className="space-y-3 rounded-lg p-3 bg-white shadow-md">
      <div className="flex items-center gap-2 text-green-800 font-medium">
        <span className="text-lg">📁</span>
        <span>{output.message}</span>
        <span className="px-2 py-1 bg-muted/50 text-green-700 rounded-full text-xs">
          {output.categories.length} categories
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {output.categories.map((category: string, index: number) => (
          <div key={index} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
            <span className="text-green-600">📂</span>
            <span className="text-sm font-medium text-gray-900">{category}</span>
          </div>
        ))}
      </div>
    </div>
  )
}