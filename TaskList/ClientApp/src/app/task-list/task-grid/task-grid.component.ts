import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { Event } from '@angular/router';
import { Task, Status, TaskListFilter } from '../../core';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule
} from 'devextreme-angular';

@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css']
})
export class TaskGridComponent {
  Status = Status;

  @Input()
  tasks: Task[];
  @Input()
  selectedTaskId: number;

  @Input()
  set filter(filter: TaskListFilter) {

    if (this.dataGrid && this.dataGrid.instance) {
      switch (filter) {
        case TaskListFilter.All:
          this.dataGrid.instance.clearFilter();
          break;
        case TaskListFilter.Active:
          this.dataGrid.instance.filter(["status", "=", Status.Active]);
          break;
        case TaskListFilter.Completed:
          this.dataGrid.instance.filter(["status", "=", Status.Completed]);
          break;
      }
    }
  }

  @Output()
  onSelectionChanged: EventEmitter<Task> = new EventEmitter();
  @Output()
  onTaskCompleted: EventEmitter<Task> = new EventEmitter();
  @Output()
  onTaskDeleted: EventEmitter<Task> = new EventEmitter();

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  constructor() {
  }

  onRowSelected(event) {
    this.onSelectionChanged.emit(event.currentSelectedRowKeys[0]);
  }

  public completeTask(task: Task) {
    this.onTaskCompleted.emit(task);
  }

  public removeTask(task: Task) {
    this.onTaskDeleted.emit(task);
  }

  public refreshGrid() {
    this.dataGrid.instance.refresh();
  }
}
