import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ChartOptions, ChartType } from 'chart.js';
import { tap } from 'rxjs';


@Component({
  selector: 'app-line-chart-label',
  templateUrl: './line-chart-label.component.html',
  styleUrl: './line-chart-label.component.css'
})
export class LineChartLabelComponent {
  public lineChartLabels: string[] = [];
  public lineChartData: any[] = [{ data: [] }];
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;
  public lineChartPlugins = [];

  constructor(public webService: WebService) {
  }
   getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }
   ngOnInit(): void { 
   this.webService.getLabelMultilineSummary().pipe(
    tap((data: any[]) => {
      console.log("here is getLabelMultilineSummary ",data)
    })
  ).subscribe((data: any[]) => {
    const labels:any[] = [];
    console.log("here is getLabelMultilineSummary ",data)

    Object.keys(data).forEach((key:any )=> {
      data[key].forEach((item: any) => {
        if (!labels.includes(item.date)) {
          labels.push(item.date);
        }
      });
    });
    console.log("labels",{labels})
    this.lineChartLabels = labels;
    // this.lineChartData = data.map((item: any) => item.total_time);
    const datasets:any = [];

    Object.keys(data).forEach((key: any) => {
      const dataset = {
        label: key,
        // data: data[key].map((item: any) => item.total_time),
        data:labels.map((label: any) => {
          const item = data[key].find((i: any) => i.date === label);
          return item ? item.total_time : 0;
        }),
        borderColor: this.getRandomColor(),
        backgroundColor: this.getRandomColor()
      };

      datasets.push(dataset);
    });
    console.log("datasets",{datasets})
    this.lineChartData = datasets;
  });
}
}
