import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Task, TaskApiService, Status, TaskListFilter } from '../../core';
import { debug } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TaskRoutingService } from '../task-routing.service';
import { TaskGridComponent } from '../task-grid/task-grid.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  TaskListFilter = TaskListFilter;

  taskList: Task[];
  taskDetails: Task;
  selectedTaskId: number;
  taskFilter: TaskListFilter = TaskListFilter.All;

  @ViewChild(TaskGridComponent) taskGrid: TaskGridComponent;

  constructor(
    private apiService: TaskApiService,
    private taskRoutingService: TaskRoutingService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this._uploadTasks().add(() => {
      if (this.activatedRoute.snapshot.data.taskId) {
        this.taskDetails = this.taskList.find(t => t.id == this.activatedRoute.snapshot.data.taskId);
        this.selectedTaskId = this.taskDetails.id;
      }
    });
  }

  onTaskSelected(task: Task) {
    this.taskDetails = task;
    this.taskRoutingService.setTaskListRoute(task);
  }

  refresh() {
    this._uploadTasks();
  }

  onTaskCompleted(task: Task) {
    this.apiService.completeTask(task).subscribe((data) => {
      task.status = Status.Completed;
      this.taskGrid.refreshGrid();
    });
  }

  onTaskDeleted(task: Task) {
    this.apiService.deleteTask(task).subscribe((data) => {
      this._removeTask(task);
    });
  }

  onFilterChange(value: TaskListFilter) {
    this.taskFilter = value;
  }

  private _uploadTasks(): Subscription {
    return this.apiService.getTasks().subscribe(result => {
      this.taskList = result;
    })
  }

  private _removeTask(task: Task) {
    for (var i = 0; i < this.taskList.length; i++) {
      if (this.taskList[i].id == task.id) {
        this.taskList.splice(i, 1);
      }
    }
  }
}
