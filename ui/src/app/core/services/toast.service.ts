import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackbarComponent } from '~core/components/snackbar/snackbar.component';

export enum SNACK_BAR_MESSAGE_TYPE {
  success = 'green-success-snackbar',
  warning = 'yellow-warning-snackbar',
  error = 'red-error-snackbar',
  info = 'blue-error-snackbar',
  default = 'default-snackbar',
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private snackBar = inject(MatSnackBar);
  setAutoHide: boolean = true;
  duration: number = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  showSnackbar(context: string, data: {}) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data,
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition,
      duration: this.setAutoHide ? this.duration : 0,
      panelClass: [context || SNACK_BAR_MESSAGE_TYPE.default],
    });
  }

  public showSuccessMessage(message: string) {
    this.showSnackbar(SNACK_BAR_MESSAGE_TYPE.success, {
      label: 'Success',
      message,
      icon: 'check_circle',
    });
  }

  public showErrorMessage(message: string) {
    this.showSnackbar(SNACK_BAR_MESSAGE_TYPE.error, {
      label: 'Error',
      message,
      icon: 'error',
    });
  }

  public showWarningMessage(message: string) {
    this.showSnackbar(SNACK_BAR_MESSAGE_TYPE.warning, {
      label: 'Warning',
      message,
      icon: 'warning',
    });
  }

  public showInfoMessage(message: string) {
    this.showSnackbar(SNACK_BAR_MESSAGE_TYPE.info, {
      label: 'Info',
      message,
      icon: 'info',
    });
  }
}
