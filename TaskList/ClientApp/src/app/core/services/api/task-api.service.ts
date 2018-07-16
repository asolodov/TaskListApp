import { Injectable, Inject } from '@angular/core';
import { Task, ApiResponse, Status } from '../../models/app.models';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  constructor(@Inject('TASK_URL') private taskUrl: string, private http: HttpClient) {
  }

  getTasksRange(skip: number, top: number): Observable<Task[]> {
    return this.http.get<ApiResponse<Task[]>>(`${this.taskUrl}?$skip=${skip}&top=${top}`)
      .pipe(map(data => data.value), catchError(err => this._handleError(err)));
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<ApiResponse<Task[]>>(this.taskUrl)
      .pipe(map(data => data.value), catchError(err => this._handleError(err)));
  }

  createTask(task: Task) {
    return this.http.post<Task>(this.taskUrl, {
      ...task,
      timeToComplete: task.timeToComplete.toISOString()
    }).pipe(data => data, catchError(err => this._handleError(err)));
  }

  updateTask(task: Task) {
    debugger;
    return this.http.put(`${this.taskUrl}(${task.id})`, {
      ...task,
      status: Status[task.status]
    }).pipe(data => data, catchError(err => this._handleError(err)));
  }

  completeTask(task: Task) {
    let updatedTask = Object.assign(task, { status: Status[Status.Completed] });
    return this.http.put(`${this.taskUrl}(${task.id})`, updatedTask)
      .pipe(data => data, catchError(err => this._handleError(err)));
  }

  deleteTask(task: Task) {
    return this.http.delete(`${this.taskUrl}(${task.id})`)
      .pipe(data => data, catchError(err => this._handleError(err)));
  }

  private _handleError(err) {
    console.error(err);
    return throwError(err.error && err.error.errors[0].message);
  }
}
