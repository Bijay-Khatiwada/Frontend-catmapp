import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { TasksComponent } from './tasks.component';

import { AuthModule } from '@auth0/auth0-angular';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { AddTaskComponent } from './add-task/add-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
// import { PieChartLabelComponent } from './pie-chart-label/pie-chart-label.component';
import { NgChartsModule } from 'ng2-charts';
import { PieChartStatusComponent } from './pie-chart-status/pie-chart-status.component';
import { PieChartPriorityComponent } from './pie-chart-priority/pie-chart-priority.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { PieChartLabelsComponent } from './pie-chart-labels/pie-chart-labels.component';
import { LineChartLabelComponent } from './line-chart-label/line-chart-label.component';
 var routes: any = [
  {
    path: '', // Updated to 'tasks'
    component: TasksComponent, // Updated to TasksComponent
  },
  {
    path: 'tasks', // Updated to 'tasks'
    component: TasksComponent, // Updated to TasksComponent
  },
  {
    path: 'tasks/:id', // Updated to 'tasks/:id'
    component: TasksComponent, // Updated to TaskComponent
  },
  {
    path: 'tasks/:id/update', // New route for UpdateComponent
    component: UpdateTaskComponent,
  },
  {
    path: 'add-task', // New route for UpdateComponent
    component: AddTaskComponent,
  },
  {
    path: 'analytics', // New route for UpdateComponent
    component: AnalyticsComponent,
  }

];
@NgModule({
  declarations: [
    AppComponent, TasksComponent, NavbarComponent, FooterComponent, AddTaskComponent, UpdateTaskComponent, PieChartStatusComponent, PieChartPriorityComponent, AnalyticsComponent, PieChartLabelsComponent, LineChartLabelComponent
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule, HttpClientModule,FormsModule,ReactiveFormsModule,NgChartsModule,
    RouterModule.forRoot(routes),
    AuthModule.forRoot({
      domain:'dev-wpg1wrqw6h5lsxci.us.auth0.com',
      clientId:'VJLwM3EJnjg97IWEKF8V4TrhriDyjkNb',
      authorizationParams:{
        redirect_uri:window.location.origin
      }
    })
  ],

  providers: [WebService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
