import Swal from 'sweetalert2';

export class Util {
    public static showLoading(): void {
        Swal.fire({
          title: 'Espere',
          imageUrl: '/assets/images/others/loading.gif',
          imageAlt: 'processing',
          showConfirmButton: false,
          allowOutsideClick: false
        });
      }
}