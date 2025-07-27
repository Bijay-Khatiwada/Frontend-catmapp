import { Component,OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { WebService } from '../web.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {
  // private toast: ToastComponent;
  angForm!: FormGroup;
  tasks_list: any;
  newTask: any = [];
  showSuccessMessage = false;
  date = new Date();

  isInvalid(control: any) {
    return this.angForm.controls[control].invalid && this.angForm.controls[control].touched;
  }

  isUntouched() {
    return this.angForm.controls['name'].pristine || this.angForm.controls['label'].pristine ;
  }

   isIncomplete() {
    return this.isInvalid('name') || this.isInvalid('label')|| this.isInvalid('time') || this.isInvalid('description') || this.isInvalid('date');
  }


  constructor(private webService: WebService, 
    private route: ActivatedRoute, 
   private router: Router,
    private fb: FormBuilder
    ) {}

  // ngOnInit() {
  //   this.angForm = this.fb.group({
  //       name: ['', Validators.required],
  //       email: ['', Validators.required],
  //       age: ['', Validators.required],
  //       position: ['', Validators.required]
  //   });
  ngOnInit() {
  this.angForm = new FormGroup({
    name: new FormControl(),
    label: new FormControl(),
    time: new FormControl(),
    description: new FormControl(),
    date: new FormControl(new Date()),
    status: new FormControl(),
    priority: new FormControl()
  });
    this.angForm=this.fb.group({
        name: ['', Validators.required],
        label: ['', Validators.required],
        time: ['', Validators.required],
        description: ['', Validators.required],
        date: ['', Validators.required],
        status: ['', Validators.required],
        priority: ['', Validators.required]
    });
    this.tasks_list = this.webService.getTasks();
  }

  onSubmit() {
    if (this.angForm.valid){
      this.webService.addTask(this.angForm.value)
      .subscribe(
        (response: any) => {        
          
          this.angForm.reset();
          this.newTask = this.webService.getTasks();
          this.router.navigate(['/tasks']);
        },
        (error) => {
          // this.toast.showToast('Error adding Tasks!', false);
          console.error('Error posting Tasks:', error);
          // Handle error appropriately, e.g., show an error message to the user
        }
      );      
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }

  }
   onCancel() {
     this.router.navigate(['/tasks']);
   }
}