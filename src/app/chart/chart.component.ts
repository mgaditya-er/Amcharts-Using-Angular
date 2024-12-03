import { Component, OnInit, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent  implements OnInit, OnDestroy  {
  
  private chart: am4charts.XYChart | undefined;


  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      // Apply theme
      am4core.useTheme(am4themes_animated);
  
      // Create chart instance
      const chart = am4core.create('chartdiv', am4charts.XYChart);
  
      // Add data
      chart.data = [
        { category: 'A', value: 50 },
        { category: 'B', value: 40 },
        { category: 'C', value: 60 },
        { category: 'D', value: 90 },
        
      ];
  
      // Create axes
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'category';
  
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  
      // Create series
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = 'value';
      series.dataFields.categoryX = 'category';
      series.name = 'Values';
      series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
      series.columns.template.fillOpacity = 0.8;
  
      this.chart = chart;
    }
  }
  


  ngOnDestroy(): void {
    // Dispose of the chart when the component is destroyed
    if (this.chart) {
      this.chart.dispose();
    }
  }

}
