import { ref, provide, inject, type Ref } from 'vue'
import type { Toast, ToastOptions } from '@/types/app'
import { uniqueId } from 'lodash'

export interface ToasterContext {
  pushToast: (toast: ToastOptions) => string
  closeToast: (toastId: string) => void
  toasts: Ref<Toast[]>
}

const TOASTER_KEY = Symbol('toaster')

export function provideToasterContext() {
  const toastDuration = 5000
  const toasts = ref<Toast[]>([])

  const pushToast = (toastData: ToastOptions): string => {
    const toast: Toast = {
      ...toastData,
      id: uniqueId()
    }

    if (toast.autoClose) {
      toast.timeout = setTimeout(() => {
        toasts.value = toasts.value.filter((currentToast) => currentToast.id !== toast.id)
      }, toastDuration)
    }

    toasts.value.push(toast)
    return toast.id
  }

  const closeToast = (toastId: string) => {
    const toast = toasts.value.find((toast) => toast.id === toastId)
    if (!toast) return
    if (toast.timeout) {
      clearTimeout(toast.timeout)
    }
    toasts.value = toasts.value.filter((toastItem) => toastItem.id !== toast.id)
  }

  const context: ToasterContext = { pushToast, closeToast, toasts }
  provide(TOASTER_KEY, context)
  return context
}

export const useToasterContext = (): ToasterContext => {
  const context = inject<ToasterContext>(TOASTER_KEY)
  if (!context) throw new Error('Toaster context not provided')
  return context
}
