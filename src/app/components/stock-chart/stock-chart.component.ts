import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { addMinutes, format, isBefore, set } from 'date-fns';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss'],
})
export class StockChartComponent implements OnInit {
  @Input() values: number[] = [];
  @Input() hours: Date[] = [];

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'BRL',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgb(52, 168, 83)',
        pointBackgroundColor: 'rgb(52, 168, 83)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        tension: 0.1,
      },
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  ngOnInit(): void {
    this.buildChart();
  }

  buildChart() {
    let dateStart = set(new Date(), { hours: 10, minutes: 0, seconds: 0 });
    const dateEnd = set(new Date(), { hours: 17, minutes: 0, seconds: 0 });
    const interval = 5;

    const labels = [];
    const values = [];

    while (isBefore(dateStart, dateEnd)) {
      labels.push(format(dateStart, 'HH:mm'));
      dateStart = addMinutes(dateStart, interval);

      const index = this.hours.findIndex(
        (hour) =>
          hour.getHours() === dateStart.getHours() &&
          hour.getMinutes() === dateStart.getMinutes()
      );

      if (index > -1) {
        values.push(this.values[index]);
      }
    }

    labels.push(format(dateEnd, 'HH:mm'));

    this.lineChartData.datasets[0].data = [...values];
    this.lineChartData.labels = [...labels];
  }
}
