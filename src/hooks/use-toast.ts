// Simple toast implementation
export interface Toast {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

export function toast({ title, description, variant = 'default' }: Toast) {
  // For now, just use console.log - you can replace with a proper toast library
  console.log(`🍞 Toast (${variant}):`, title, description)
  
  // You could integrate with react-hot-toast, sonner, or another toast library here
  if (typeof window !== 'undefined') {
    // Simple browser notification as fallback
    const message = `${title}${description ? ': ' + description : ''}`
    
    // Create a simple toast element
    const toastEl = document.createElement('div')
    toastEl.className = `fixed top-4 right-4 z-50 bg-background border border-border rounded-lg shadow-lg p-4 max-w-sm ${
      variant === 'destructive' ? 'border-red-500 text-red-600' : 'border-green-500 text-green-600'
    }`
    toastEl.innerHTML = `
      <div class="font-semibold">${title || ''}</div>
      ${description ? `<div class="text-sm text-muted-foreground">${description}</div>` : ''}
    `
    
    document.body.appendChild(toastEl)
    
    // Remove after 3 seconds
    setTimeout(() => {
      toastEl.remove()
    }, 3000)
  }
}