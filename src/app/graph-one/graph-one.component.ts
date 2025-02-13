import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-graph-one',
  standalone: true,
  imports: [],
  templateUrl: './graph-one.component.html',
  styleUrls: ['./graph-one.component.css']
})
export class GraphOneComponent implements OnInit, OnDestroy {
  private chart: am4charts.XYChart | undefined;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chart = am4core.create('chartdiv', am4charts.XYChart);
      am4core.useTheme(am4themes_animated);

      // Add data
      chart.data = [
        
        
       
        { category: 'Side A Claims', value: 256.68, color: am4core.color('#000080') },
        { category: 'Side B Claims', value: 344.60, color: am4core.color('#87CEEB') },
        { category: 'Side C Claims', value: 198.47, color: am4core.color('#02b8a7') },
        { category: 'Dismissed Claims', value: 31.86, color: am4core.color('#B0C4DE') },
        
      ];

      // Create axes
      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'category';
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.minGridDistance = 30;

      const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.title.text = 'Severity (A$)';
      valueAxis.min = 0;
      valueAxis.max = 400;
      valueAxis.strictMinMax = true;

      valueAxis.numberFormatter = new am4core.NumberFormatter();
      valueAxis.numberFormatter.numberFormat = 'A$#K';
      valueAxis.renderer.minGridDistance = 200;
      // Create series
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = 'value';
      series.dataFields.categoryY = 'category';
      series.columns.template.propertyFields.fill = 'color';
      series.columns.template.strokeWidth = 0;
      series.columns.template.tooltipText = '{categoryY}: A${valueX}K';

      // Create a container for all the dashed line legends
      const legendContainer = chart.chartContainer.createChild(am4core.Container);
      legendContainer.layout = 'horizontal';
      legendContainer.align = 'center';
      legendContainer.valign = 'bottom';
      legendContainer.marginTop = 20; // Add spacing between the chart and the legend

      // Function to create a dashed line and its legend
      const createDashedLine = (position: number, lineColor: string, label: string) => {
        const range = valueAxis.axisRanges.create();
        range.value = position;
        range.grid.stroke = am4core.color(lineColor);
        range.grid.strokeDasharray = '10,10';
        range.grid.strokeOpacity = 1;
        range.grid.above = true;
        range.grid.strokeWidth = 3; // line
        // Create the colored bar for the legend
        const colorBar = legendContainer.createChild(am4core.Rectangle);
        colorBar.width = 50;
        colorBar.height = 5;
        colorBar.fill = am4core.color(lineColor);
        colorBar.strokeWidth = 0;  // Remove the border

        // Add some space between each legend element by adding marginRight
        colorBar.marginRight = 10; // Adjust the margin as needed

        // Create the label next to the color bar
        const legendLabel = legendContainer.createChild(am4core.Label);
        legendLabel.text = label;
        legendLabel.fontSize = 12;
        legendLabel.marginLeft = 5;  // Add some space between the bar and the label

        // Add some space after each label by adding marginRight to the label
        legendLabel.marginRight = 10; // Adjust the margin as needed
      };

      // Add all four dashed lines to the chart with their legends
      createDashedLine(120, '#FFDE21', 'Current ABC Retention');
      createDashedLine(250, '#00FF00', 'Current ABC Limit');
      createDashedLine(150, '#f5b02d', 'Current AB Limit');
      createDashedLine(130, '#FF5733', 'Current A Limit');

      this.chart = chart;
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
