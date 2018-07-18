import { Injectable, Inject } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from "@aspnet/signalr";
import { Task } from '../..';
import { from, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserCommunicationService {

  private _connection: HubConnection;

  private _taskAddedSubject: Subject<Task> = new Subject();
  private _taskUpdatedSubject: Subject<Task> = new Subject();
  private _taskDeletedSubject: Subject<Task> = new Subject();

  public taskAdded$: Observable<Task> = this._taskAddedSubject.asObservable();
  public taskUpdated$: Observable<Task> = this._taskUpdatedSubject.asObservable();
  public taskDeleted$: Observable<Task> = this._taskDeletedSubject.asObservable();

  constructor(@Inject('TASK_HUB_URL') private taskHubUrl) {
    this._connection = new HubConnectionBuilder()
      .withUrl(taskHubUrl)
      .build();

    this._connection.on('TaskAdded', (task) => this._taskAddedSubject.next(task));
    this._connection.on('TaskUpdated', (task) => this._taskUpdatedSubject.next(task));
    this._connection.on('TaskDeleted', (task) => this._taskDeletedSubject.next(task));
    this._connection.start();
  }
}
