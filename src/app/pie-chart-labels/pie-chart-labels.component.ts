import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
// import { TaskDataService } from '../task-data.service';
import { WebService } from '../web.service';

import { ChartOptions, ChartType } from 'chart.js';
import { tap } from 'rxjs';
// import { Label } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart-labels',
  templateUrl: './pie-chart-labels.component.html',
  styleUrls: ['./pie-chart-labels.component.css'],
})
export class PieChartLabelsComponent implements OnInit {
  public pieChartLabels: string[] = [];
  public pieChartData: any[] = [{ data: [] }];
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLegend = true;
  public pieChartPlugins = [];

   @ViewChild('start-date') startDateInput: ElementRef;
  @ViewChild('end-date') endDateInput: ElementRef;
  @ViewChild('apply-button') applyButton: ElementRef;

  @ViewChild('today-button') todayButton: ElementRef;
  @ViewChild('yesterday-button') yesterdayButton: ElementRef;
  @ViewChild('last-7-days-button') last7DaysButton: ElementRef;
  @ViewChild('last-30-days-button') last30DaysButton: ElementRef;

  constructor(public webService: WebService) {
    this.startDateInput=new ElementRef(null);
    this.endDateInput=new ElementRef(null);
    this.applyButton=new ElementRef(null);
    this.todayButton=new ElementRef(null);
    this.yesterdayButton=new ElementRef(null);
    this.last7DaysButton=new ElementRef(null);
    this.last30DaysButton=new ElementRef(null);
  }

  // ngOnInit(): void {
  //   this.webService.getTimeSummary().subscribe((data: any[]) => {
  //   console.log("here is data",data)
  //   this.pieChartLabels = data.map((item: any) => item._id);
  //   this.pieChartData = data.map((item: any) => item.total_time);
  // });
    
  // }
  ngOnInit(): void {
  this.webService.getTimeSummary().pipe(
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
  //  this.webService.getStatusSummary().pipe(
  //   tap((data: any[]) => {
  //     console.log("here is data for",data)
  //   })
  // ).subscribe((data: any[]) => {
  //   this.pieChartLabels = data.map((item: any) => item._id);
  //   // this.pieChartData = data.map((item: any) => item.total_time);
  //   this.pieChartData = [{
  //     data: data.map((item: any) => item.total_time)
  //   }];
  // });
  //  this.webService.getPrioritySummary().pipe(
  //   tap((data: any[]) => {
  //     console.log("here is data for",data)
  //   })
  // ).subscribe((data: any[]) => {
  //   this.pieChartLabels = data.map((item: any) => item._id);
  //   // this.pieChartData = data.map((item: any) => item.total_time);
  //   this.pieChartData = [{
  //     data: data.map((item: any) => item.total_time)
  //   }];
  // });
}
ngAfterViewInit() {
    this.todayButton.nativeElement.addEventListener('click', () => {
      const today = new Date();
      this.startDateInput.nativeElement.value = today.toISOString().split('T')[0];
      this.endDateInput.nativeElement.value = today.toISOString().split('T')[0];
    });

    this.yesterdayButton.nativeElement.addEventListener('click', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      this.startDateInput.nativeElement.value = yesterday.toISOString().split('T')[0];
      this.endDateInput.nativeElement.value = yesterday.toISOString().split('T')[0];
    });

    this.last7DaysButton.nativeElement.addEventListener('click', () => {
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);
      this.startDateInput.nativeElement.value = last7Days.toISOString().split('T')[0];
      this.endDateInput.nativeElement.value = new Date().toISOString().split('T')[0];
    });

    this.last30DaysButton.nativeElement.addEventListener('click', () => {
      const last30Days = new Date();
      last30Days.setDate(last30Days.getDate() - 30);
      this.startDateInput.nativeElement.value = last30Days.toISOString().split('T')[0];
      this.endDateInput.nativeElement.value = new Date().toISOString().split('T')[0];
    });

    this.applyButton.nativeElement.addEventListener('click', () => {
      const startDate = this.startDateInput.nativeElement.value;
      const endDate = this.endDateInput.nativeElement.value;
      // Call the API or update the chart with the selected date range
      console.log(`Selected date range: ${startDate} - ${endDate}`);
    });
  }
}
