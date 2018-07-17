import { Component, Input } from '@angular/core';
import { Task } from '../../core';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {

  @Input()
  task: Task;

  constructor() { }
}
