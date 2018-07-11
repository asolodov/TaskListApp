import { NgModule } from '@angular/core';
import { NavMenuComponent, DateDiffDirective, SnackBarComponent, StatusPipe } from '.';
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
