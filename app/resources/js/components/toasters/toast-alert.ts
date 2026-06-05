import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../../../css/sweetalert.css';
class Toaster {
  private swalInstance = withReactContent(Swal);

  // 1. Alerta de Sucesso
  createSuccess(title: string, message: string) {
    return this.swalInstance.fire({
      title: title,
      text: message,
      icon: 'success',
      iconColor: '#10B981',
      customClass: {
        title: 'title',
        confirmButton: `confirm-button-success`,
      },
    });
  }

  // 2. Alerta de Erro
  createError(title: string, message: string) {
    return this.swalInstance.fire({
      title: title,
      text: message,
      icon: 'error',
      iconColor: '#EF4444',
      customClass: {
        confirmButton: `confirm-button-error`,
      },
    });
  }

  // 3. Alerta de Aviso/Confirmação
  createInfo(title: string, message: string) {
    return this.swalInstance.fire({
      title: title,
      text: message,
      icon: 'info',
      iconColor: '#1558D6',
      customClass: {
        confirmButton: `confirm-button-info`,
      },
    });
  }
}

// Exportamos uma única instância para ser usada na aplicação inteira (Singleton)
export const toaster = new Toaster();
