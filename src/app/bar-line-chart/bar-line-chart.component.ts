import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-bar-line-chart',
  templateUrl: './bar-line-chart.component.html',
  styleUrls: ['./bar-line-chart.component.css']
})
export class BarLineChartComponent implements OnInit, OnDestroy {
  private chart!: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      am4core.useTheme(am4themes_animated);

      // Create chart
      this.chart = am4core.create('chartdiv10', am4charts.XYChart);

      // Updated data with the industry categories
      this.chart.data = [
        { category: 'Consumer Durables and Non-Durables', percentOfPublicCompanies: 4.7, claimFrequency: 7.5, projectedClaims: 16.56 },
        { category: 'Commercial and Industrial Services', percentOfPublicCompanies: 3.13, claimFrequency: 6.5, projectedClaims: 14.53 },
        { category: 'Finance / Real Estate', percentOfPublicCompanies: 12.94, claimFrequency: 5.6, projectedClaims: 12.37 },
        { category: 'Retail Trade', percentOfPublicCompanies: 3.13, claimFrequency: 4.6, projectedClaims: 10.28 },
        { category: 'Consumer and Distribution Services', percentOfPublicCompanies: 2.58, claimFrequency: 4.1, projectedClaims: 9.17 },
        { category: 'Product and Other Manufacturing', percentOfPublicCompanies: 3.99, claimFrequency: 3.8, projectedClaims: 8.35 },
        { category: 'Energy and Non-Energy Minerals', percentOfPublicCompanies: 40.48, claimFrequency: 2.7, projectedClaims: 6.1 },
        { category: 'Health Technology and Services', percentOfPublicCompanies: 8.95, claimFrequency: 2.6, projectedClaims: 5.69 },
        { category: 'Process Industries', percentOfPublicCompanies: 2.17, claimFrequency: 2.4, projectedClaims: 5.36 },
        { category: ' Communications ', percentOfPublicCompanies: 3.34, claimFrequency: 2.0, projectedClaims: 4.45 },
        { category: 'Electronics Technology and Technology Services', percentOfPublicCompanies: 9.4, claimFrequency: 1.8, projectedClaims: 3.99 },
        { category: 'Transportation and Utilities', percentOfPublicCompanies: 2.17, claimFrequency: 1.4, projectedClaims: 3.16 }
      ];

      // Create the main category axis (X-axis)
      // the categories related data and that have to display below X axis
      let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'category';
      categoryAxis.title.text = 'Industry Category';
      categoryAxis.renderer.grid.template.strokeOpacity = 0.0;
      categoryAxis.renderer.labels.template.rotation = -10;
      categoryAxis.renderer.labels.template.verticalCenter = 'top';
      categoryAxis.renderer.labels.template.horizontalCenter = 'right';
      categoryAxis.renderer.labels.template.fontSize = 10; // Smaller font size for better fit
      categoryAxis.renderer.labels.template.wrap = true; // Enable label wrapping
      categoryAxis.renderer.minGridDistance = 30; // Minimum distance between grid lines
     // Add space between categories (values from 0 to 1)

     categoryAxis.renderer.cellStartLocation = 0.2;  
     categoryAxis.renderer.cellEndLocation = 0.8;
      // Create the vertical value axis (Y-axis)
      let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = 'Percentage';
      valueAxis.renderer.grid.template.stroke = am4core.color('#DCDCDC');
      valueAxis.renderer.grid.template.strokeOpacity = 0.0;
      valueAxis.renderer.grid.template.strokeWidth = 1;
      valueAxis.renderer.labels.template.fontSize = 12; // Moderate font size

      // Create the bar series for '% of Public Companies'
      let barSeries1 = this.chart.series.push(new am4charts.ColumnSeries());
      barSeries1.dataFields.valueY = 'percentOfPublicCompanies';
      barSeries1.dataFields.categoryX = 'category';
      barSeries1.name = '% of Public Companiess';
      barSeries1.columns.template.fill = am4core.color('#0079C2');
      barSeries1.columns.template.stroke = am4core.color('#0079C2');
      barSeries1.columns.template.width = am4core.percent(100); // Adjust width for spacing

      // Add label bullet for the '% of Public Companies' bar series
      let barLabelBullet1 = new am4charts.LabelBullet();
      barSeries1.bullets.push(barLabelBullet1);
      barLabelBullet1.label.text = '{valueY.value.formatNumber("#.0")}%';
      barLabelBullet1.dy = -10;
      barLabelBullet1.label.fontSize = 10; // Moderate font size for label

      // Create the bar series for 'Projected % of Claims'
      let barSeries2 = this.chart.series.push(new am4charts.ColumnSeries());
      barSeries2.dataFields.valueY = 'projectedClaims';
      barSeries2.dataFields.categoryX = 'category';
      barSeries2.name = 'Projected % of Claims';
      barSeries2.columns.template.fill = am4core.color('#95D6FD');
      barSeries2.columns.template.stroke = am4core.color('#95D6FD');
      barSeries2.columns.template.width = am4core.percent(100); // Adjust width for spacing

      // Add label bullet for the 'Projected % of Claims' bar series
      let barLabelBullet2 = new am4charts.LabelBullet();
      barSeries2.bullets.push(barLabelBullet2);
      barLabelBullet2.label.text = '{valueY.value.formatNumber("#.0")}%';
      barLabelBullet2.dy = -10;
      barLabelBullet2.label.fontSize = 10; // Moderate font size for label

      // Create the line series for 'Claim Frequency'
      let lineSeries = this.chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.valueY = 'claimFrequency';
      lineSeries.dataFields.categoryX = 'category';
      lineSeries.name = 'Claim Frequency';
      lineSeries.stroke = am4core.color('#E10000');
      lineSeries.strokeWidth = 2;
      lineSeries.strokeDasharray = '5,5'; // Makes the line dotted

      // Add label bullet for the line series
      let lineLabelBullet = new am4charts.LabelBullet();
      lineSeries.bullets.push(lineLabelBullet);
      lineLabelBullet.label.text = '{valueY.value.formatNumber("#.0")}%';
      lineLabelBullet.label.fontSize = 15; // Moderate font size for label

      // Change the legend marker to a diamond symbol
      lineSeries.legendSettings.labelText = '♦ {name}'; // Add the diamond symbol to the legend label
      lineSeries.legendSettings.itemValueText = '{valueY.value.formatNumber("#.0")}%'; // Show the value in the legend

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
}
