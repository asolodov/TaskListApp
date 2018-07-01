import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Service, Employee } from '../../services/app.service';
import { Task } from '../../models/app.models';
import { TaskApiService } from '../../services/api/task-api.service';
import { Event } from '@angular/router';

@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css'],
  providers: [Service]
})
export class TaskGridComponent {

  @Input()
  tasks: Task[];

  @Output()
  onSelectionChange: EventEmitter<Task> = new EventEmitter();

  dataSource: any;

  constructor(service: Service) {
    this.dataSource = {
      store: service.generateData(100000)
    };
  }

  customizeColumns(columns) {
    columns[0].width = 70;
  }

  onRowSelected(event) {
    this.onSelectionChange.emit(event.currentSelectedRowKeys[0]);
  }
}
