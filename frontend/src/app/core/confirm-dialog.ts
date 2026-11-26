import Swal from 'sweetalert2';

const clinicClasses = {
  popup: 'swal-clinic',
  title: 'swal-clinic-title',
  htmlContainer: 'swal-clinic-text',
  actions: 'swal-clinic-actions',
  confirmButton: 'swal-clinic-confirm',
  cancelButton: 'swal-clinic-cancel',
  icon: 'swal-clinic-icon',
};

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2800,
  timerProgressBar: true,
  buttonsStyling: false,
  customClass: {
    popup: 'swal-clinic-toast',
    title: 'swal-clinic-toast-title',
    htmlContainer: 'swal-clinic-toast-text',
    timerProgressBar: 'swal-clinic-toast-timer',
    icon: 'swal-clinic-toast-icon',
  },
});

export async function confirmDelete(message: string, title = 'Delete this item?'): Promise<boolean> {
  const result = await Swal.fire({
    title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    focusCancel: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
    buttonsStyling: false,
    customClass: clinicClasses,
  });

  return result.isConfirmed;
}

export function notifySuccess(title: string, text?: string): void {
  void Toast.fire({
    icon: 'success',
    title,
    text: text || undefined,
  });
}

export function notifyError(title: string, text?: string): void {
  void Toast.fire({
    icon: 'error',
    title,
    text: text || undefined,
    timer: 3600,
  });
}

export function notifyInfo(title: string, text?: string): void {
  void Toast.fire({
    icon: 'info',
    title,
    text: text || undefined,
  });
}
