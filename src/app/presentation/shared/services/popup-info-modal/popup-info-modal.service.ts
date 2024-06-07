import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PopupInfoModalService {

  displayErrorModal(error:string){
    Swal.fire('Error',error,'error')
  }

  displayInfoModal(message:string){
    Swal.fire('Info',message,'info')
  }

  displayBelowModal(title:string,icon:SweetAlertIcon){
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon,
      title,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  }
  constructor() { }
}
