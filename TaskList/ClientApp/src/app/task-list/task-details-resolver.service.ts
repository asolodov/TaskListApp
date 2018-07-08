import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Task } from '../core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TaskDetailsResolver implements Resolve<number> {
  constructor(
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<number> {

    debugger;
    return route.params['id'];

    //return this.articlesService.get(route.params['slug'])
    //  .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
