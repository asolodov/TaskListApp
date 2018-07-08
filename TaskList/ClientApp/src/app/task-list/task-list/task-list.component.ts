import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Task, TaskApiService, Status } from '../../core';
import { debug } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TaskRoutingService } from '../task-routing.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  taskList: Task[];
  taskDetails: Task;
  selectedTaskId?: number;

  constructor(private apiService: TaskApiService, private taskRoutingService: TaskRoutingService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.uploadTasks().add(() => {
      if (this.activatedRoute.snapshot.data.taskId) {
        this.taskDetails = this.taskList.find(t => t.id == this.activatedRoute.snapshot.data.taskId);
        this.selectedTaskId = this.taskDetails.id;
      }
    });
  }

  onTaskSelected(task: Task) {
    this.taskDetails = task;
    this.taskRoutingService.setTaskListRoute(task);
  }

  refresh() {
    this.uploadTasks();
  }

  onTaskCompleted(task: Task) {
    this.apiService.completeTask(task).subscribe((data) => {
      task.status = Status.Completed;
    });
  }

  onTaskDeleted(task: Task) {
    this.apiService.deleteTask(task).subscribe((data) => {
      this.removeTask(task);
    });
  }

  private uploadTasks(): Subscription {

    return this.apiService.getTasks().subscribe(result => {
      this.taskList = result;
    })
  }

  private removeTask(task: Task) {
    for (var i = 0; i < this.taskList.length; i++) {
      if (this.taskList[i].id == task.id) {
        this.taskList.splice(i, 1);
      }
    }
  }
}
