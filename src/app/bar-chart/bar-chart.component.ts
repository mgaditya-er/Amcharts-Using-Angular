import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnDestroy {
  private chart!: am4charts.XYChart;


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    
    am4core.useTheme(am4themes_animated);

    // Create chart
    this.chart = am4core.create('chartdiv1', am4charts.XYChart);

    // Data for the chart
    this.chart.data = [
      { category: 'Small Cap', loss23: 6.9, loss15to23: 3.4, loss15toFlat: 2.4, flatTo14: 2.4, gain14: 4.8 },
      { category: 'Mid Cap', loss23: 10.4, loss15to23: 5.7, loss15toFlat: 5.2, flatTo14: 5.2, gain14: 7.8 },
      { category: 'Large Cap', loss23: 13.0, loss15to23: 8.7, loss15toFlat: 7.5, flatTo14: 5.8, gain14: 8.9 },
      { category: 'Mega Cap', loss23: 21.5, loss15to23: 12.4, loss15toFlat: 10.7, flatTo14: 7.4, gain14: 13.2 }
    ];

    // Create the main category axis (X-axis)
    let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.title.text = 'Market Cap Categories';

    // Add spacing between the categories
    categoryAxis.renderer.cellStartLocation = 0.1; // Adjust to create space at the start of each category
    categoryAxis.renderer.cellEndLocation = 0.9; // Adjust to create space at the end of each category

    // Create the vertical value axis (Y-axis)
    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Percentage';
    valueAxis.renderer.grid.template.stroke = am4core.color('#DCDCDC');
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.renderer.grid.template.strokeWidth = 1;

    // Set the y-axis interval (step) and start/end range
    valueAxis.renderer.minGridDistance = 20; // Ensures grid lines are spaced apart
    valueAxis.strictMinMax = true;
    valueAxis.min = 0;
    valueAxis.max = 24; // Adjust as needed to show up to 22%
    // valueAxis.step = 2; // Display labels every 2%

    // Format the value axis labels as percentages
    valueAxis.renderer.labels.template.adapter.add('text', (text, target) => {
      return `${text}%`;
    });

    // Create series for each data range with label bullets
    const seriesData = [
      { field: 'loss23', color: '#a90a59', name: '>23% Sstock Loss' },
      { field: 'loss15to23', color: '#e1a9c5', name: '-15% to -23%' },
      { field: 'loss15toFlat', color: '#c6c3c1', name: '-15% to Flat' },
      { field: 'flatTo14', color: '#b5d3be', name: 'Flat to +14%' },
      { field: 'gain14', color: '#a6e2bc', name: '14% Stock Gain' }
    ];

    seriesData.forEach(data => {
      let series = this.chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = data.field;
      series.dataFields.categoryX = 'category';
      series.name = data.name;
      series.yAxis = valueAxis;
      series.xAxis = categoryAxis;
      series.columns.template.fill = am4core.color(data.color);
      series.columns.template.stroke = am4core.color(data.color);

      // Add label bullet
      var labelBullet = new am4charts.LabelBullet();
      series.bullets.push(labelBullet);
      labelBullet.label.text = '{valueY.value.formatPercent("0.0")}%'; // Shows whole number percentage (e.g., 10%)
      labelBullet.strokeOpacity = 0;
      labelBullet.stroke = am4core.color('#dadada');
      labelBullet.dy = -10; // Position the label above the bar
    });

    // Enable chart cursor for interaction
    this.chart.cursor = new am4charts.XYCursor();
    this.chart.cursor.xAxis = categoryAxis;

    // Add a legend to the chart
    this.chart.legend = new am4charts.Legend();
  }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  // Define the seriesMap with an index signature
 seriesMap: Record<string, number> = {
  'loss23': 0,
  'loss15to23': 1,
  'loss15toFlat': 2,
  'flatTo14': 3,
  'gain14': 4
};

// Method to handle color changes
onColorChange(event: any, seriesId: string): void {
  const selectedColor = event.target.value;
  const seriesIndex = this.seriesMap[seriesId];
  const series = this.chart.series.getIndex(seriesIndex) as am4charts.ColumnSeries;
  series.columns.template.fill = am4core.color(selectedColor);
  series.columns.template.stroke = am4core.color(selectedColor);
}

}
