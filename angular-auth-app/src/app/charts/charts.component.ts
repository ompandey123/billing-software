// charts.component.ts

import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, LinearScale, CategoryScale, BarController, BarElement, Title, Tooltip } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  @ViewChild('categoryCountChart') categoryCountChart!: ElementRef;
  @ViewChild('billCountChart') billCountChart!: ElementRef;
  @ViewChild('revenueChart') revenueChart!: ElementRef;
  @ViewChild('productCountChart') productCountChart!: ElementRef;

  ngAfterViewInit() {
    this.createChart(this.categoryCountChart, 'Category Count', [10, 20, 30, 40]);
    this.createChart(this.billCountChart, 'Bill Count', [5, 15, 25, 35]);
    this.createChart(this.revenueChart, 'Revenue', [1000, 2000, 1500, 3000]);
    this.createChart(this.productCountChart, 'Product Count', [50, 70, 90, 60]);
  }

  createChart(chartRef: ElementRef, label: string, data: number[]) {
    const ctx = chartRef.nativeElement.getContext('2d');

    Chart.register(LinearScale, CategoryScale, BarController, BarElement, Title, Tooltip);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Label1', 'Label2', 'Label3', 'Label4'],
        datasets: [{
          label: label,
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            type: 'category',
            labels: ['Label1', 'Label2', 'Label3', 'Label4'],
            position: 'bottom'
          },
          y: {
            type: 'linear',
            position: 'left',
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
      
    });
  }
}
