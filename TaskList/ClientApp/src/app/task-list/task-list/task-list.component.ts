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

  taskList: Task[];
  taskDetails: Task;
  taskFilter: TaskListFilter = TaskListFilter.All;

  @ViewChild(TaskGridComponent) taskGrid: TaskGridComponent;

  constructor(
    private apiService: TaskApiService,
    private taskRoutingService: TaskRoutingService,
    private activatedRoute: ActivatedRoute,
    private notificationService: UserNotificationService) {
  }

  ngOnInit() {
    this._uploadTasks().add(() => {
      let routeId = this.activatedRoute.snapshot.params['id'];
      if (routeId) {
        this.taskDetails = this.taskList.find(t => t.id == routeId);
      }
    });
  }

  onTaskSelected(task: Task) {
    this.taskDetails = task;
    this.taskRoutingService.setTaskListRoute(task);
  }

  refresh() {
    //this._uploadTasks().add(() => {
    //  setTimeout(() => this.taskGrid.refreshGrid());
    //});

    this.taskGrid.refreshGrid(); ``
  }

  onTaskCompleted(task: Task) {
    this.taskGrid.updateRow(task.id, { ...task, status: `${Status.Completed}` })
      .then(() => this.notificationService.showSuccessNotification("Task has been completed"))
      .catch(err => this.notificationService.showErrorNotification(err));

    //this.apiService.completeTask(task).subscribe((data) => {
    //  task.status = Status.Completed;
    //  this.taskGrid.refreshGrid();
    //  this.notificationService.showSuccessNotification("Task has been completed");
    //}, err => this.notificationService.showErrorNotification(err));
  }

  onTaskDeleted(task: Task) {
    //this.apiService.deleteTask(task).subscribe((data) => {
    //  this._removeTask(task);
    //  this.notificationService.showSuccessNotification("Task has been deleted");
    //}, err => this.notificationService.showErrorNotification(err));

    this.taskGrid.deleteRow(task.id);
  }

  onFilterChange(value: TaskListFilter) {
    this.taskFilter = value;
  }

  private _uploadTasks(): Subscription {
    return this.apiService.getTasks().subscribe(result => {
      this.taskList = result;
    }, err => this.notificationService.showErrorNotification(err))
  }

  private _removeTask(task: Task) {
    for (var i = 0; i < this.taskList.length; i++) {
      if (this.taskList[i].id == task.id) {
        this.taskList.splice(i, 1);
      }
    }
  }
}
