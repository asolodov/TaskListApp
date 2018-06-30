import { Component, OnInit } from '@angular/core';
import { Service, Employee } from '../app.service';

@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css'],
  providers: [Service]
})
export class TaskGridComponent {

  dataSource: any;

  constructor(service: Service) {
    this.dataSource = {
      store: service.generateData(100000)
    };
  }

  customizeColumns(columns) {
    columns[0].width = 70;
  }
}
