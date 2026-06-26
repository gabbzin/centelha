import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import { MESSAGES, type MessageCode } from '@/lib/messages'
import type { SharedData } from '@/types'
import { toaster } from './toast-alert'

export function FlashListener() {
  const { flash } = usePage<SharedData>().props

  useEffect(() => {
    if (flash.msg) {
      const entry = Object.values(MESSAGES).find((m) => m.text === flash.msg)

      if (entry) {
        switch (entry.type) {
          case 'success':
            toaster.createSuccess(entry.text)
            break
          case 'error':
            toaster.createError(entry.text)
            break
          case 'info':
            toaster.createInfo(entry.text)
            break
          case 'warning':
            toaster.createInfo(entry.text)
            break
        }
      } else if (flash.msgType === 'success') {
        toaster.createSuccess(flash.msg)
      } else if (flash.msgType === 'error') {
        toaster.createError(flash.msg)
      } else {
        toaster.createInfo(flash.msg)
      }
    }

    if (flash.success) {
      toaster.createSuccess(flash.success)
    }

    if (flash.error) {
      toaster.createError(flash.error)
    }
  }, [flash.msg, flash.success, flash.error, flash.msgType])

  return null
}
