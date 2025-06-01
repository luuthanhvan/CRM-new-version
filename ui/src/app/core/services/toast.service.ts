import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';

export enum SNACK_BAR_MESSAGE_TYPE {
  success = 'green-success-snackbar',
  warning = 'yellow-warning-snackbar',
  error = 'red-error-snackbar',
  default = 'default-snackbar'
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private snackBar = inject(MatSnackBar);
  label: string = '';
  setAutoHide: boolean = true;
  duration: number = 1500;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  showSnackbar(context: string, message: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.duration : 0;
    config.panelClass = [context || SNACK_BAR_MESSAGE_TYPE.default];
    this.snackBar.open(message, this.label, config);
  }

  public showSuccessMessage(message: string) {
    this.showSnackbar(SNACK_BAR_MESSAGE_TYPE.success, message);
  }

  public showErrorMessage(message: string) {
    this.showSnackbar(SNACK_BAR_MESSAGE_TYPE.error, message);
  }

  public showWarningMessage(message: string) {
    this.showSnackbar(SNACK_BAR_MESSAGE_TYPE.warning, message);
  }
}
