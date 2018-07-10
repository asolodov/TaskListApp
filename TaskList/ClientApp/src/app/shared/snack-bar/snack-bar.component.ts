import { Component, Input, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent {

  message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: any) {
    this.message = data.message;
  }
}
