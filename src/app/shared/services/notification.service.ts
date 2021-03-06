import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /* #region  methods */
  fireErrorNotification(title: string, message: string): void {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      customClass: {
        confirmButton: "d-flex btn-primary"
      },
      confirmButtonText:
        'U redu',
      showClass: {
        popup: 'animated fadeInDown'
      },
      hideClass: {
        popup: 'animated fadeOutUp'
      },
      heightAuto: false
    })
  }

  fireSuccessMessage(title: string, message: string): void {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      showConfirmButton: true,
      customClass: {
        confirmButton: "d-flex btn-primary"
      },
      confirmButtonText:
        ' U redu',
      showClass: {
        popup: 'animated fadeInDown'
      },
      hideClass: {
        popup: 'animated fadeOutUp'
      },
      heightAuto: false
    });
  }

  fireWarningMessage(title: string, message: string) {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      customClass: {
        confirmButton: "d-flex btn-primary"
      },
      confirmButtonText:
        ' U redu',
      showClass: {
        popup: 'animated fadeInDown'
      },
      hideClass: {
        popup: 'animated fadeOutUp'
      },
      heightAuto: false
    });
  }
  /* #endregion */

}
