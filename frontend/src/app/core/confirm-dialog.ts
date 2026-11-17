import Swal from 'sweetalert2';

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
    customClass: {
      popup: 'swal-clinic',
      title: 'swal-clinic-title',
      htmlContainer: 'swal-clinic-text',
      actions: 'swal-clinic-actions',
      confirmButton: 'swal-clinic-confirm',
      cancelButton: 'swal-clinic-cancel',
      icon: 'swal-clinic-icon',
    },
  });

  return result.isConfirmed;
}
