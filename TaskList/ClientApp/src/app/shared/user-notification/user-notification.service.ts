import { Injectable, } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Injectable()
export class UserNotificationService {
  constructor(private snackBar: MatSnackBar) {
  }

  showSuccessNotification(message: string, duration: number = 1000) {
    this._showNotification(message, duration, false);
  }

  showErrorNotification(message: string, duration: number = 3000) {
    this._showNotification(message, duration, true);
  }

  private _showNotification(message: string, diration: number = 1000, isError: boolean) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: diration,
      data: {
        message: message
      },
      panelClass: isError ? 'background-red' : ''
    });
  }
}
