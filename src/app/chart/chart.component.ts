// import { Component, OnInit, OnDestroy } from '@angular/core';
// import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';

// @Component({
//   selector: 'app-chart',
//   standalone: true,
//   imports: [],
//   templateUrl: './chart.component.html',
//   styleUrls: ['./chart.component.css']
// })
// export class ChartComponent implements OnInit, OnDestroy {
  
//   private chart: am4charts.XYChart | undefined;

//   ngOnInit(): void {
//     if (typeof document !== 'undefined') {
//       // Apply theme
//       am4core.useTheme(am4themes_animated);
  
//       // Create chart instance
//       const chart = am4core.create('chartdiv', am4charts.XYChart);
  
//       // Add data
//       chart.data = [
//         { category: 'A', value: 50 },
//         { category: 'B', value: 40 },
//         { category: 'C', value: 60 },
//         { category: 'D', value: 90 },
//         { category: 'E', value: 70 },
//       ];
  
//       // Create axes
//       const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
//       categoryAxis.dataFields.category = 'category';
//       categoryAxis.title.text = 'Categories';
//       categoryAxis.renderer.inversed = true; // Inverts the axis to align with bar positions
  
//       const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
//       valueAxis.title.text = 'Values';
  
//       // Create series
//       const series = chart.series.push(new am4charts.ColumnSeries());
//       series.dataFields.valueX = 'value';
//       series.dataFields.categoryY = 'category';
//       series.name = 'Values';
//       series.columns.template.tooltipText = '{categoryY}: [bold]{valueX}[/]';
//       series.columns.template.fillOpacity = 0.5;
  
//       this.chart = chart;
//     }
//   }
  
//   ngOnDestroy(): void {
//     // Dispose of the chart when the component is destroyed
//     if (this.chart) {
//       this.chart.dispose();
//     }
//   }
// }
// ----------------------------------------------------------------------------------------------------------------
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, isDevMode } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

interface ClaimData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartdiv11', { static: true })
  chartDiv!: ElementRef;

  ngOnInit() {
    // Nothing to do here
  }

  ngAfterViewInit() {
    if (isDevMode() && this.chartDiv && this.chartDiv.nativeElement) {
      // Ensure the chartDiv and its nativeElement exist before creating the chart
      let chart = am4core.create(this.chartDiv.nativeElement, am4charts.XYChart);

      // Add data
      chart.data = [
        { name: "Dismissed Claims", value: 31.86 },
        { name: "Side C Claims", value: 198.47 },
        { name: "Side B Claims", value: 344.60 },
        { name: "Side A Claims", value: 256.68 }
      ];

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "name";
      categoryAxis.title.text = "Severity";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Claims";

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "value";
      series.dataFields.categoryX = "name";
      series.columns.template.fill = am4core.color("#a8b8d8"); // Default color for bars
      series.columns.template.strokeWidth = 0;

      // Add legend
      chart.legend = new am4charts.Legend();
      chart.legend.position = "top";

      // Set colors for each claim type
      series.columns.template.adapter.add("fill", (fill, target) => {
        if (target.dataItem && target.dataItem.dataContext) {
          // Typecast dataContext to ClaimData
          const dataContext = target.dataItem.dataContext as ClaimData;
          switch (dataContext.name) {
            case "Dismissed Claims":
              return am4core.color("#a8b8d8");
            case "Side C Claims":
              return am4core.color("#1e90ff");
            case "Side B Claims":
              return am4core.color("#4da3ff");
            case "Side A Claims":
              return am4core.color("#87d4ff");
          }
        }
        return fill;
      });

      // Add grid and labels
      valueAxis.renderer.grid.template.location = 0;
      valueAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      // Add chart title
      chart.titles.create().text = "Claims Data";
    }
  }
}
