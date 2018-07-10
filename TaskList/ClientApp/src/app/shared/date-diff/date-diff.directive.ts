import { Directive, Input, ElementRef, OnInit, SimpleChanges } from '@angular/core';
import { retry } from 'rxjs/operators';

@Directive({
  selector: '[appDateDiff]'
})
export class DateDiffDirective implements OnInit {

  @Input('appDateFrom') dateFrom: string;
  @Input('appDateTo') dateTo: string;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.el.nativeElement.innerHTML = this._getDateDiff();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dateFrom || changes.dateTo) {
      this.el.nativeElement.innerHTML = this._getDateDiff();
    }
  }

  private _getDateDiff() {

    let delta = (<any>new Date(this.dateTo) - <any>new Date(this.dateFrom)) / 1000;
    if (delta <= 0 || isNaN(delta)) {
      return '0 sec';
    }

    const weeks = Math.floor(delta / 604800);
    delta -= weeks * 604800;

    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    const seconds = Math.floor(delta % 60);

    return this._format(weeks, days, hours, minutes, seconds);
  }

  private _format(weeks: number, days: number, hours: number, minutes: number, seconds: number) {
    if (weeks > 0) {
      return weeks + (weeks == 1 ? ' week' : ' weeks');
    };

    const ds = days != 0 ? `${days}d` : '';
    const hrs = hours != 0 ? ` ${hours}h` : '';
    const mins = minutes != 0 ? ` ${minutes} min` : '';
    const secs = seconds != 0 ? ` ${seconds} s` : '';

    if (days > 0) {
      return ds + (hours != 0 ? `${hrs}` : '');
    }

    const res = hrs + (minutes != 0 ? mins : '') + (seconds != 0 ? secs : '');
    return res.trim();
  }
}
