import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Event } from '@angular/router';
import { Task } from '../../core';

@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css']
  //providers: [Service]
})
export class TaskGridComponent {

  @Input()
  tasks: Task[];

  @Output()
  onSelectionChange: EventEmitter<Task> = new EventEmitter();

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
    this.onSelectionChange.emit(event.currentSelectedRowKeys[0]);
  }
}
