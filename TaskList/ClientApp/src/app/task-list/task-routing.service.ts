import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Task } from '../core';

@Injectable()
export class TaskRoutingService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private location: Location) {
  }

  setTaskListRoute(task: Task) {
    if (task) {
      this.location.go(`task-list/${task.id.toString()}`);
    }
  }
}
