import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { Task, Status, TaskApiService } from '../../core';
import { MatSnackBar } from '@angular/material';
import { UserNotificationService } from '../../shared';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  taskForm: FormGroup;
  minDate: Date = new Date();

  constructor(private apiService: TaskApiService, private notificationService: UserNotificationService) {
  }

  ngOnInit() {
    this.taskForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl(),
      priority: new FormControl(1, [
        Validators.required,
        Validators.pattern("^[1-9][0-9]?$|^100$")
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

  getError = (ctrl: FormControl, name: string, message: string) => ctrl.hasError(name) ? message : null;
  getRequiredError = (ctrl: FormControl) => this.getError(ctrl, 'required', 'This is required field');
  getPriorityError = (ctrl: FormControl) =>
    this.getRequiredError(ctrl)
    || this.getError(ctrl, 'pattern', 'Value should be in range from 1 to 100 ');
  getTimeToCompleteError = (ctrl: FormControl) =>
    this.getError(ctrl, 'owlDateTimeParse', 'Value should has date format')
    || this.getRequiredError(ctrl)
    || this.getError(ctrl, 'timeToComplete', 'Value should be a date in future');

  save() {
    if (this.taskForm.valid) {
      this.apiService.createTask(this.taskForm.value).subscribe(() => {
        this.notificationService.showSuccessNotification("Task has been successfully created");
        this.taskForm.reset();
      }, err => this.notificationService.showErrorNotification(err));
    }
  }
}
