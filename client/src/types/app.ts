export interface ToastOptions {
  type: 'success' | 'error'
  title: string
  description?: string
  autoClose?: boolean
  hideClose?: boolean
}

export interface Toast extends ToastOptions {
  id: string
  timeout?: number
}
