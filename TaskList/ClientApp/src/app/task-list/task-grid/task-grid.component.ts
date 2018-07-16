import { Component, OnInit, EventEmitter, Output, Input, ViewChild, OnDestroy } from '@angular/core';
import { Event } from '@angular/router';
import { Task, Status, TaskListFilter, TaskApiService } from '../../core';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule
} from 'devextreme-angular';
import * as AspNetData from "devextreme-aspnet-data-nojquery";

import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { retry } from 'rxjs/operators';
import ODataStore from "devextreme/data/odata/store";
import { Promise } from 'q';

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
  height: string;

  dataSource: any;

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

  private _data = [];

  private _store: ODataStore;

  constructor(private apiService: TaskApiService) {

    //for (var i = 0; i < 1000; i++) {
    //  this._data.push({
    //    id: i,
    //    name: i.toString(),
    //    dateAdded: new Date(),
    //    status: i % 2 == 0 ? Status.Active : Status.Completed
    //  })
    //}

    this.dataSource = new DataSource({
      load: (opts) => {
        console.log(opts);
        return this._data.slice(opts.skip, opts.skip + opts.take);
      },
      totalCount: () => -1,
      remove: key => {
        console.log(key);
        for (var i = 0; i < this._data.length; i++) {
          if (this._data[i].id == key) {
            this._data.splice(i, 1);
          }
        }
        return Promise.resolve();
      },
      key: "id"
    });

    //this.dataSource = AspNetData.createStore({
    //  key: "id",
    //  loadUrl: "http://localhost:5000/api/Tasks",
    //  deleteUrl: "http://localhost:5000/api/Tasks",
    //  updateUrl: "http://localhost:5000/api/Tasks"
    //});

    //this.dataSource = new DataSource({
    //  load: (options: any) => {
    //    return this.apiService.getTasksRange(options.skip, options.take).toPromise();
    //  },
    //  remove: (key) => {
    //    return Promise.resolve();
    //    //this.apiService.deleteTask(options);
    //  },
    //  totalCount: (options) => -1
    //});

    //===== or inside the DataSource =====
    this._store = new ODataStore({
      url: "http://localhost:5000/api/Task",
      key: "id",
      keyType: "Int32",
      version: 4,
      onRemoved: (options) => {
        console.log(options)
      }
      // Other ODataStore options go here
    });

    this.dataSource = new DataSource({
      store: this._store
    });
  }
  test(data: any) {
    console.log(data);
  }
  onRowSelected(event) {
    //this.dataGrid.instance.getSelectedRowsData().then((data) => {
    //  this.onSelectionChanged.emit(data);
    //})
    this.onSelectionChanged.emit(this.dataGrid.instance.getSelectedRowsData()[0]);
  }

  public completeTask(task: Task) {
    this.onTaskCompleted.emit(task);
  }

  public removeTask(task: Task) {
    this.onTaskDeleted.emit(task);
  }

  public refreshGrid() {
    this.dataGrid.instance.refresh();
    this._setupFilter();
  }

  public deleteRow(id: number) {
    const key = this.dataGrid.instance.getRowIndexByKey(id)
    this.dataGrid.instance.deleteRow(key);
  }

  public updateRow(key, values) {
    return this._store.update(key, values);
  }

  ngOnInit() {
    this._intervalId = setInterval(() => {
      this.currentDate = new Date();
    }, this.TIMER_INTERVAL);

    this.dataGrid.onInitialized.subscribe(() => {
      this.dataGrid.editing.texts.confirmDeleteMessage = '';
    });
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
          this.dataGrid.instance.filter(["status", "=", `${Status.Active}`]);
          break;
        case TaskListFilter.Completed:
          this.dataGrid.instance.filter(["status", "=", `${Status.Completed}`]);
          break;
      }
    }
  }
}
