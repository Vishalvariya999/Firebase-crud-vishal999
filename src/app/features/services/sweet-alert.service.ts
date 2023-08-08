import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { from } from 'rxjs';
type ToastType = 'success' | 'error' | 'warning';
type ToastColor = { [type in ToastType]: string };

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  private colors: ToastColor = {
    success: '#e6efe9',
    error: '#efe6e6',
    warning: '#efeee6',
  };
  private readonly primaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--theme-primary');

  private toast(type: ToastType) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      showCloseButton: true,
      background: this.colors[type],
    });
    return Toast;
  }

  success(title: string) {
    this.toast('success').fire({
      icon: 'success',
      title: title,
    });
  }

  warning(title: string) {
    this.toast('warning').fire({
      icon: 'warning',
      title: title,
    });
  }

  error(title: string) {
    this.toast('error').fire({
      icon: 'error',
      title: title,
    });
  }

  /**
*
* @param body Pass body with type of `SweetAlertOptions`
* @returns By default it returns promise with value but we have converted
to observable with from operator to use easily in global level.
*/
  confirm(body?: SweetAlertOptions) {
    return from(
      Swal.fire({
        title: body?.title || 'Are you sure?',
        text: body?.text || "You won't be able to revert this!",
        icon: body?.icon || 'warning',
        showCancelButton: body?.showCancelButton || true,
        confirmButtonColor: body?.confirmButtonColor || this.primaryColor,
        confirmButtonText: body?.confirmButtonText || 'Continue',
        allowOutsideClick: body?.allowOutsideClick || false,
      })
    );
  }
}
