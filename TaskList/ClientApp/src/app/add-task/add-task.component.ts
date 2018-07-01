import { Component, OnInit } from '@angular/core';
import { Task, Status } from '../../models/app.models'
import { TaskApiService } from '../../services/api/task-api.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  public Task: Task;

  constructor(private apiService: TaskApiService) {
    this.Task = {
      name: '',
      dateAdded: null,
      priority: 0,
      status: Status.Actvie,
      timeToComplete: null
    };
  }

  save() {
    this.apiService.createTask(this.Task);
  }
}
