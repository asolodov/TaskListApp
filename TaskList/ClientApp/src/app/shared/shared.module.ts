import { NgModule } from '@angular/core';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatChipsModule,
  MatButtonToggleModule,
  MatIconModule,
  MatSnackBarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StatusPipe } from './status.pipe';
import { DateDiffDirective } from './date-diff/date-diff.directive';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSnackBarModule
  ],
  declarations: [
    NavMenuComponent,
    StatusPipe,
    DateDiffDirective,
    SnackBarComponent
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    NavMenuComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSnackBarModule,
    StatusPipe,
    DateDiffDirective
  ],
  entryComponents: [
    SnackBarComponent
  ]
})
export class SharedModule { }
