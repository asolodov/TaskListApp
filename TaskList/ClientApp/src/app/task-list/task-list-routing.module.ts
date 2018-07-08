import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsResolver } from './task-details-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent
  },
  {
    path: ':id',
    component: TaskListComponent,
    resolve: {
      taskId: TaskDetailsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskListRoutingModule { }
