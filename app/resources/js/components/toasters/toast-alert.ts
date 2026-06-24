import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import type { MessageCode } from '@/lib/messages'
import { getMessage } from '@/lib/messages'
import '../../../css/sweetalert.css'

class Toaster {
  private swalInstance = withReactContent(Swal)

  // 1. Alerta de Sucesso
  createSuccess(title: string, message: string)
  createSuccess(message: string)
  createSuccess(titleOrMessage: string, message?: string) {
    const title = message ? titleOrMessage : 'Sucesso!'
    const text = message ?? titleOrMessage
    return this.swalInstance.fire({
      title,
      text,
      icon: 'success',
      iconColor: '#10B981',
      customClass: {
        title: 'title',
        confirmButton: 'confirm-button-success',
      },
    })
  }

  // 2. Alerta de Erro
  createError(title: string, message: string)
  createError(message: string)
  createError(titleOrMessage: string, message?: string) {
    const title = message ? titleOrMessage : 'Erro!'
    const text = message ?? titleOrMessage
    return this.swalInstance.fire({
      title,
      text,
      icon: 'error',
      iconColor: '#EF4444',
      customClass: {
        confirmButton: 'confirm-button-error',
      },
    })
  }

  // 3. Alerta de Aviso/Confirmação
  createInfo(title: string, message: string)
  createInfo(message: string)
  createInfo(titleOrMessage: string, message?: string) {
    const title = message ? titleOrMessage : 'Atenção!'
    const text = message ?? titleOrMessage
    return this.swalInstance.fire({
      title,
      text,
      icon: 'info',
      iconColor: '#1558D6',
      customClass: {
        confirmButton: 'confirm-button-info',
      },
    })
  }

  showFromCode(code: MessageCode) {
    const entry = getMessage(code)
    switch (entry.type) {
      case 'success':
        return this.createSuccess(entry.text)
      case 'error':
        return this.createError(entry.text)
      case 'warning':
        return this.createInfo(entry.text)
      case 'info':
        return this.createInfo(entry.text)
    }
  }
}

export const toaster = new Toaster()
