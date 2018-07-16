import { Component, OnInit, EventEmitter, Output, Input, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Event } from '@angular/router';
import { Task, Status, TaskListFilter, TaskApiService } from '../../core';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule
} from 'devextreme-angular';
import { from, Observable, Observer } from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store'
import { StoreProviderService } from '../store-provider/store-provider.service';

@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css']
})
export class TaskGridComponent implements OnInit, OnDestroy {
  private readonly TIMER_INTERVAL: number = 1000;
  Status = Status;

  currentDate: Date = new Date();
  dataSource: DataSource;

  private _intervalId: any;
  private _store: CustomStore;
  private _deleteObserversMap: Map<number, Observer<number>> = new Map();

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
  onInitialized: EventEmitter<void> = new EventEmitter();
  @Output()
  onSelectionChanged: EventEmitter<Task> = new EventEmitter();
  @Output()
  onTaskCompleted: EventEmitter<Task> = new EventEmitter();
  @Output()
  onTaskDeleted: EventEmitter<Task> = new EventEmitter();

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;


  constructor(@Inject('TASK_URL') private taskUrl: string, private storeProvider: StoreProviderService) {

    this._store = this.storeProvider.configureStore({
      url: this.taskUrl,
      key: "id",
      keyType: "Int32",
      version: 4,
      onRemoved: (key) => {
        if (this._deleteObserversMap.has(key)) {
          const observable = this._deleteObserversMap.get(key);
          observable.next(key);
          observable.complete();
          this._deleteObserversMap.delete(key);
        }
      },
      errorHandler: (options) => {
        this._deleteObserversMap.forEach((data) => {
          data.error(options.message);
        });
        this._deleteObserversMap.clear();
      },
      deserializeDates: false
    });

    this.dataSource = new DataSource({
      store: this._store
    });
  }

  ngOnInit() {
    this.dataGrid.onInitialized.subscribe(() => {
      this.onInitialized.emit();
      this.dataGrid.editing.texts.confirmDeleteMessage = '';
    });

    this._intervalId = setInterval(() => {
      this.currentDate = new Date();
    }, this.TIMER_INTERVAL);
  }

  ngOnDestroy() {
    clearInterval(this._intervalId);
  }

  onRowSelected(event) {
    this.onSelectionChanged.emit(this.dataGrid.instance.getSelectedRowsData()[0]);
  }

  completeTask(task: Task) {
    this.onTaskCompleted.emit(task);
  }

  removeTask(task: Task) {
    this.onTaskDeleted.emit(task);
  }

  public refreshGrid() {
    this.dataGrid.instance.refresh();
  }

  public deleteRow(id: number) {
    return Observable.create((observer) => {
      this._deleteObserversMap.set(id, observer);
      const index = this.dataGrid.instance.getRowIndexByKey(id)
      this.dataGrid.instance.deleteRow(index);
    });
  }

  public updateRow(key, values): Observable<any> {
    return from(this._store.update(key, values).then(() => this.refreshGrid()));
  }

  public selectRow(key) {
    this.dataGrid.instance.selectRows([key], false);
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
