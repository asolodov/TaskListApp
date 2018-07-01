import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/app.models';
import { TaskApiService } from '../../services/api/task-api.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  taskList: Task[];
  taskDetails: Task;

  constructor(private apiService: TaskApiService) {
  }

  ngOnInit() {
    this.uploadTasks();
  }

  onTaskSelected(task: Task) {
    console.log(task);
    this.taskDetails = task;
  }

  refresh() {
    this.uploadTasks();
  }

  private uploadTasks() {

    this.apiService.getTasks().subscribe(result => {
      this.taskList = result;
    })
  }

}
