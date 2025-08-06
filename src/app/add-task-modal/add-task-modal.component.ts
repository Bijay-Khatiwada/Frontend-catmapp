import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from '../web.service'; 
@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.css'] // optional
})
export class AddTaskModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() taskAdded = new EventEmitter<void>(); // ✅ Added this

  angForm!: FormGroup;
  showSuccessMessage = false;

  constructor(private fb: FormBuilder, private webService: WebService) {}

  ngOnInit(): void {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      label: ['', Validators.required],
      time: ['', Validators.required],
      status: ['Not Started', Validators.required],
      description: ['', Validators.required],
      priority: ['Low', Validators.required],
      date: ['', Validators.required]
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.angForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isIncomplete(): boolean {
    return this.angForm.invalid;
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.angForm.valid) {
      const formData = this.angForm.value;
      // TODO: Add logic to save task to backend (e.g., call a service)

      this.webService.addTask(formData).subscribe(
      () => {
        this.showSuccessMessage = true;
        this.taskAdded.emit(); // Notify parent to refresh
        this.angForm.reset({
          status: 'Not Started',
          priority: 'Low'
        });

      // Close the modal after short delay
      setTimeout(() => {
        this.showSuccessMessage = false;
        this.close.emit();
      }, 1500);
    },
     (error) => {
        console.error('Error creating task:', error);
      }
    );
  } else {
    this.angForm.markAllAsTouched();
  }
  }

  onCancel(): void {
    this.close.emit();
  }
}
