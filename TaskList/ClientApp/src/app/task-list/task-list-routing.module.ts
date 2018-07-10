import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent
  },
  {
    path: ':id',
    component: TaskListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskListRoutingModule { }
