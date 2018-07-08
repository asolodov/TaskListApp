import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Event } from '@angular/router';
import { Task, Status } from '../../core';

@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css']
  //providers: [Service]
})
export class TaskGridComponent {

  @Input()
  tasks: Task[];

  @Input()
  selectedTaskId?: number;

  @Output()
  onSelectionChanged: EventEmitter<Task> = new EventEmitter();
  @Output()
  onTaskCompleted: EventEmitter<Task> = new EventEmitter();
  @Output()
  onTaskDeleted: EventEmitter<Task> = new EventEmitter();

  Status = Status;

  dataSource: any;

  constructor(/*service: Service*/) {
    //this.dataSource = {
    //  store: service.generateData(100000)
    //};
  }

  customizeColumns(columns) {
    columns[0].width = 70;
  }

  onRowSelected(event) {
    this.onSelectionChanged.emit(event.currentSelectedRowKeys[0]);
  }

  public completeTask(task: Task) {
    this.onTaskCompleted.emit(task);
  }

  public removeTask(task: Task) {
    this.onTaskDeleted.emit(task);
  }
}
