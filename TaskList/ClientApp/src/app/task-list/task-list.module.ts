import { NgModule } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskGridComponent } from './task-grid/task-grid.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { DxDataGridModule } from 'devextreme-angular';
import { SharedModule } from '../shared/shared.module';
import { TaskListRoutingModule } from './task-list-routing.module';
import { TaskDetailsResolver } from './task-details-resolver.service';
import { TaskRoutingService } from './task-routing.service';
import { UserNotificationService } from '../shared/user-notification/user-notification.service';


@NgModule({
  imports: [
    SharedModule,
    DxDataGridModule,
    TaskListRoutingModule
  ],
  declarations: [
    TaskListComponent,
    TaskGridComponent,
    TaskDetailsComponent
  ],
  providers: [
    TaskDetailsResolver,
    TaskRoutingService,
    UserNotificationService
  ]
})
export class TaskListModule { }
