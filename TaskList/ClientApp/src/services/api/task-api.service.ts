import { Injectable, Inject } from '@angular/core';
import { Task, ApiResponse } from '../../models/app.models';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  constructor(@Inject('TASK_URL') private taskUrl, private http: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<ApiResponse<Task[]>>(this.taskUrl).pipe(map(data => data.data));
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.taskUrl, task);
  }
}
