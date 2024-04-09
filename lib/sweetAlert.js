import swal from 'sweetalert2'

export const deleteConfirmation = (message) =>
  swal.fire({
    title: 'Are you sure?',
    text: message || 'you will not be able to retrieve this.',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  })
