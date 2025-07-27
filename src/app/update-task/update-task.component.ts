import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent {
  angForm!: FormGroup;
  taskId: string = '';
  tasks_list: any;
  taskDetails: any = {};
  task: any;

  isInvalid(control: any) {
    return this.angForm.controls[control].invalid && this.angForm.controls[control].touched;
  }

  isUntouched() {
    return this.angForm.controls['name'].pristine || this.angForm.controls['label'].pristine;
  }

  isIncomplete() {
    return this.isInvalid('name') || this.isInvalid('label')|| this.isInvalid('time') || this.isInvalid('description') || this.isInvalid('date');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private webService: WebService,
    private fb: FormBuilder,
    private datePipe: DatePipe
    ) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.params['id'];
    this.angForm = this.fb.group({
        name: ['', Validators.required],
        label: ['', Validators.required],
        time: ['', Validators.required],
        description: ['', Validators.required],
        date: ['', Validators.required],
        status: ['', Validators.required],
        priority: ['', Validators.required]
    });
    this.webService.getTask(this.taskId).subscribe(
      (response: any) => {
        this.taskDetails = response[0];
        const date = new Date(this.taskDetails.date.split('-').reverse().join('-'));
        const formatedDate = new DatePipe('en-UK').transform(date, 'yyyy-MM-dd');
        this.angForm.patchValue({
          name: this.taskDetails.name,
          label: this.taskDetails.label,
          time: this.taskDetails.time,
          description: this.taskDetails.description,
          date: formatedDate,
          status: this.taskDetails.status,
          priority: this.taskDetails.priority
        });
      },
      (error:any) => {
        console.error('Error fetching task details:', error);
      }
    );
    
  }

  onSubmit() {
    this.webService.updateTask(this.taskId, this.angForm.value).subscribe(
      (response: any) => {
        console.log('Task updated successfully:', response);
        // Redirect to tasks page or perform any other action
        this.router.navigate(['/tasks']);
      },
      (error: any) => {
        console.error('Error updating task:', error);
        // Handle error appropriately, e.g., show an error message to the user
      }
    );
  }
  onCancel() {
    this.router.navigate(['/tasks']);
  }
}

