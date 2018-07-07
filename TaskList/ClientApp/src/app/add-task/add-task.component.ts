import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { Task, Status } from '../../models/app.models'
import { TaskApiService } from '../../services/api/task-api.service';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  public taskForm: FormGroup;

  constructor(private apiService: TaskApiService) {
  }

  ngOnInit() {
    //let ttc = new Date();
    //ttc.setDate(ttc.getDate() + 1);
    //let ttcVal = `${ttc.toJSON().slice(0, 10)}T00:00:00`;
    //let ttcVal = this.getDateTimeFormat(1);

    this.taskForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl(),
      priority: new FormControl(1, [
        Validators.required,
        Validators.pattern("[1-9]")
      ]),
      timeToComplete: new FormControl('', [
        Validators.required,
        this.timeToCompleteValidation()
      ])
    });
  }

  timeToCompleteValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = new Date(control.value) < new Date();
      return forbidden ? { 'timeToComplete': { value: control.value } } : null;
    };
  }

  //private getDateTimeFormat(addDays: number): string {
  //  let ttc = moment().add(1, 'days');
  //  return ttc.toJSON().slice(0, 19);
  //}

  save() {
    if (this.taskForm.valid) {
      this.apiService.createTask(this.taskForm.value);
    }
  }
}
