import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
// import { TaskDataService } from '../task-data.service';
import { WebService } from '../web.service';

import { ChartOptions, ChartType } from 'chart.js';
import { tap } from 'rxjs';

@Component({
  selector: 'app-pie-chart-status',
  templateUrl: './pie-chart-status.component.html',
  styleUrl: './pie-chart-status.component.css'
})
export class PieChartStatusComponent {
 public pieChartLabels: string[] = [];
  public pieChartData: any[] = [{ data: [] }];
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLegend = true;
  public pieChartPlugins = [];

    constructor(public webService: WebService) {
    
  }
  ngOnInit(): void {
 
   this.webService.getStatusSummary().pipe(
    tap((data: any[]) => {
      console.log("here is data for",data)
    })
  ).subscribe((data: any[]) => {
    this.pieChartLabels = data.map((item: any) => item._id);
    // this.pieChartData = data.map((item: any) => item.total_time);
    this.pieChartData = [{
      data: data.map((item: any) => item.total_time)
    }];
  });
}

}
