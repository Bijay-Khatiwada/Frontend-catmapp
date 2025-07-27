import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { TasksComponent } from './tasks.component';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
  {path: 'add-task', component: AddTaskComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'navbar', component: TasksComponent},
  {path: 'tasks', component: TasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
