import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'add-task',
    pathMatch: 'full'
  },
  {
    path: 'add-task',
    loadChildren: './add-task/add-task.module#AddTaskModule'
  },
  {
    path: 'task-list',
    loadChildren: './task-list/task-list.module#TaskListModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
