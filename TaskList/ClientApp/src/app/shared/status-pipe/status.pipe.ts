import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../../core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: Status, args?: any): string {

    switch (value) {
      case Status.Active:
        return "Active";
      case Status.Completed:
        return "Completed"
      default: return '';
    }
  }
}
