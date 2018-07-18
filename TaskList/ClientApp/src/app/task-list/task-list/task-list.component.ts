import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Task, TaskApiService, Status, TaskListFilter } from '../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TaskRoutingService } from '../task-routing.service';
import { TaskGridComponent } from '../task-grid/task-grid.component';
import { UserNotificationService } from '../../shared';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  TaskListFilter = TaskListFilter;

  taskDetails: Task;
  taskFilter: TaskListFilter = TaskListFilter.All;
  selectedTaskId: number;

  @ViewChild(TaskGridComponent) taskGrid: TaskGridComponent;

  constructor(
    private apiService: TaskApiService,
    private taskRoutingService: TaskRoutingService,
    private activatedRoute: ActivatedRoute,
    private notificationService: UserNotificationService) {
  }

  ngOnInit(){
    const routeId = this.activatedRoute.snapshot.params['id'];
    if (routeId) {
      this.selectedTaskId = parseInt(routeId);
    }
  }

  onTaskSelected(task: Task) {
    this.taskDetails = task;
    this.taskRoutingService.setTaskListRoute(task);
  }

  refresh() {
    this.taskGrid.refreshGrid();
  }

  onTaskCompleted(task: Task) {
    this.taskGrid.updateRow(task.id, { ...task, status: Status.Completed })
      .subscribe(
        () => this.notificationService.showSuccessNotification("Task has been completed"),
        (err) => this.notificationService.showErrorNotification(err)
      );
  }

  onTaskDeleted(task: Task) {
    this.taskGrid.deleteRow(task.id).subscribe(
      () => this.notificationService.showSuccessNotification("Task has been deleted"),
      (err) => this.notificationService.showErrorNotification(err));
  }

  onFilterChange(value: TaskListFilter) {
    this.taskFilter = value;
  }
}
