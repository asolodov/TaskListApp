import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task/add-task.component';
import { SharedModule } from '../shared/shared.module';
import { AddTaskRoutingModule } from './add-task-routing.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AddTaskRoutingModule
  ],
  declarations: [
    AddTaskComponent
  ],
  providers: [
  ]
})
export class AddTaskModule { }
