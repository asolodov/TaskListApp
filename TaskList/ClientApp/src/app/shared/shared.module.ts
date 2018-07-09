import { NgModule } from '@angular/core';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatChipsModule,
  MatButtonToggleModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StatusPipe } from './status.pipe';
import { DateDiffDirective } from './date-diff/date-diff.directive';

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
    MatButtonToggleModule
  ],
  declarations: [
    NavMenuComponent,
    StatusPipe,
    DateDiffDirective
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
    StatusPipe,
    DateDiffDirective
  ]
})
export class SharedModule { }
