import { Component } from '@angular/core';
import { WebService } from './web.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks_list: any[] = [];
  allTasks: any[] = [];
  sortOption: string = 'priority';
  layout: string = 'grid';

  constructor(public webService: WebService, authService: AuthService) {}

  ngOnInit() {
    // Subscribe to get tasks and store in allTasks, then apply sorting
    this.webService.getTasksObservable().subscribe((tasks: any[]) => {
      this.allTasks = tasks;
      this.applySorting();
    });
  }

  applySorting() {
    this.tasks_list = [...this.allTasks];
    const priorityOrder: { [key: string]: number } = { High: 1, Medium: 2, Low: 3 };

    this.tasks_list.sort((a, b) => {
      if (this.sortOption === 'priority') {
          const priorityA = priorityOrder[a.priority] ?? 99;
          const priorityB = priorityOrder[b.priority] ?? 99;
          return priorityA - priorityB;
        }
      if (this.sortOption === 'date') {
        const dateA = new Date(a.date.split('-').reverse().join('-'));
        const dateB = new Date(b.date.split('-').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      }
      if (this.sortOption === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });
  }

  isTaskOverdue(task: any): boolean {
    const taskDate = new Date(task.date.split('-').reverse().join('-'));
    const currentDate = new Date();
    return task.status !== 'Completed' && taskDate < currentDate;
  }

  isTaskStartWarning(task: any): boolean {
    const taskDate = new Date(task.date.split('-').reverse().join('-'));
    const currentDate = new Date();
    return task.status !== 'Completed' &&
      taskDate.getFullYear() === currentDate.getFullYear() &&
      taskDate.getMonth() === currentDate.getMonth() &&
      taskDate.getDate() === currentDate.getDate();
  }

  isTaskCompleted(task: any): boolean {
    return task.status === 'Completed';
  }

  delete_data(TaskId: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.webService.deleteTask(TaskId).subscribe(
        () => {
          // Remove deleted task from allTasks then re-apply sorting
          this.allTasks = this.allTasks.filter(task => task._id !== TaskId);
          this.applySorting();
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }
}
