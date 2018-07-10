import { Component, OnInit, EventEmitter, Output, Input, ViewChild, OnDestroy } from '@angular/core';
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
export class TaskGridComponent implements OnInit, OnDestroy {
  private readonly TIMER_INTERVAL: number = 1000;
  Status = Status;

  @Input()
  tasks: Task[];
  @Input()
  selectedTaskId: number;
  @Input()
  height: string;

  @Input()
  set filter(filter: TaskListFilter) {
    this._filter = filter;
    this._setupFilter();
  }
  get filter() {
    return this._filter;
  }
  private _filter: TaskListFilter;

  @Output()
  onSelectionChanged: EventEmitter<Task> = new EventEmitter();
  @Output()
  onTaskCompleted: EventEmitter<Task> = new EventEmitter();
  @Output()
  onTaskDeleted: EventEmitter<Task> = new EventEmitter();

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  currentDate: Date = new Date();

  private _intervalId: any;

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
    this._setupFilter()
  }

  ngOnInit() {
    this._intervalId = setInterval(() => {
      this.currentDate = new Date();
    }, this.TIMER_INTERVAL);
  }

  ngOnDestroy() {
    clearInterval(this._intervalId);
  }

  private _setupFilter() {
    if (this.dataGrid && this.dataGrid.instance) {
      switch (this.filter) {
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
}
