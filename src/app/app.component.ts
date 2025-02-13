import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { BarLineChartComponent } from './bar-line-chart/bar-line-chart.component';
import { GraphOneComponent } from "./graph-one/graph-one.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChartComponent, BarChartComponent, BarLineChartComponent, GraphOneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'amcharts-angular';
}
