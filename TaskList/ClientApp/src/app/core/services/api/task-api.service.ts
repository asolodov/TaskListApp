import { Injectable, Inject } from '@angular/core';
import { Task, ApiResponse, Status } from '../../models/app.models';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  constructor(@Inject('TASK_URL') private taskUrl: string, private http: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<ApiResponse<Task[]>>(this.taskUrl).pipe(map(data => data.data));
  }

  createTask(task: Task) {
    return this.http.post<Task>(this.taskUrl, task).subscribe();
  }

  updateTask(task: Task) {
    return this.http.put(`${this.taskUrl}/${task.id}`, task);
  }

  completeTask(task: Task) {
    let updatedTask = Object.assign(task, { status: Status.Completed });
    return this.http.put(`${this.taskUrl}/${task.id}`, updatedTask);
  }

  deleteTask(task: Task) {
    return this.http.delete(`${this.taskUrl}/${task.id}`);
  }
}
