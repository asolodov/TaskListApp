import { Component, OnInit, EventEmitter, Output, Input, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Event } from '@angular/router';
import { Task, Status, TaskListFilter, TaskApiService, AdaptiveDataStore } from '../../core';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule
} from 'devextreme-angular';
import { from, Observable, Observer } from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import Store from 'devextreme/data/abstract_store';
import { StoreProviderService} from '../store-provider/store-provider.service';
import { UserCommunicationService } from '../../core/services/api/user-communication.service';

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
  private _store: Store | AdaptiveDataStore;
  private _deleteObserversMap: Map<number, Observer<number>> = new Map();

  @Input()
  height: string;
  @Input()
  selectedTaskId: number;
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


  constructor(@Inject('TASK_URL') private taskUrl: string, private storeProvider: StoreProviderService,
    private communicationService: UserCommunicationService) {

    this._store = this.storeProvider.configureStore({
      url: this.taskUrl,
      key: "id",
      keyType: "Int32",
      version: 4,
      onRemoved: (key) => {
        if (this._deleteObserversMap.has(key)) {
          const observer = this._deleteObserversMap.get(key);
          observer.next(key);
          observer.complete();
          this._deleteObserversMap.delete(key);
        }
      },
      errorHandler: (options) => {
        this._deleteObserversMap.forEach((observer) => {
          observer.error(options.message);
          observer.complete();
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
      this.dataGrid.editing.texts.confirmDeleteMessage = '';

      this.communicationService.taskAdded$.subscribe((task) =>
        this._executeOnLocalSource(() => this._store.insert(task)));

      this.communicationService.taskUpdated$.subscribe((task) =>
        this._executeOnLocalSource(() =>
          this._isTaskInDataSource(task) ? this._store.update(task.id, task) : this._store.insert(task)
        ));

      this.communicationService.taskDeleted$.subscribe((task) =>
        this._isTaskInDataSource(task)
        && this._executeOnLocalSource(() => this._store.remove(task.id)));
    });

    this.dataGrid.onContentReady.subscribe(() => {
      const idx = this.dataGrid.instance.getRowIndexByKey(this.selectedTaskId);
      if (idx >= 0) {
        this.dataGrid.instance.selectRowsByIndexes([idx])
      }
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
    return this.dataGrid.instance.refresh();
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

  private _setupFilter(clearBefore: boolean = false) {
    if (this.dataGrid && this.dataGrid.instance) {
      if (clearBefore) {
        this.dataGrid.instance.clearFilter();
      }
      switch (this.filter) {
        case TaskListFilter.All:
          this.dataGrid.instance.clearFilter();
          break;
        case TaskListFilter.Active:
          this.dataGrid.instance.filter(["status", "=", Status.Active ]);
          break;
        case TaskListFilter.Completed:
          this.dataGrid.instance.filter(["status", "=", Status.Completed ]);
          break;
      }
    }
  }

  private _isTaskInDataSource(task: Task) {
    return !!this.dataSource.items().find((item) => item.id == task.id);
  }

  private _executeOnLocalSource(action: Function) {
    this._store.useLocalSource();
    action();
    this.refreshGrid()
      .then(() => this._store.useRemoteSource())
      .catch(() => this._store.useRemoteSource());
  }
}
