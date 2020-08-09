import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  showSuccessToater(msg: string) {
    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>' + msg + '</b></span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-info alert-with-icon",
        positionClass: "toast-top-right"
      }
    );
  }

  showErrorToater(msg: string) {
    this.toastr.error(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>' + msg + '</b></span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-top-right"
      }
    );
  }

  showWarningToater(msg: string) {
    this.toastr.warning(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>' + msg + '</b></span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-warning alert-with-icon",
        positionClass: "toast-top-right"
      }
    );
  }
}
