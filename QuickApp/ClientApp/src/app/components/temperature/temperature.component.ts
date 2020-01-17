import { Component, OnInit } from '@angular/core';
import { Data } from '../../models/data.model'
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { TemperatureEndpointService } from '../../services/http/temperature-endpoint.service'

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 71, 70, 56, 55, 10, 20], label: 'Series A' },
    { data: [59, 71, 50, 50, 55, 10, 20, 54], label: 'Series B' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', '2', '3'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,annotation: ''
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(
    private temperatureService: TemperatureEndpointService
  ) { }

  ngOnInit() {

    var adata = this.temperatureService.getTemperatures();
    adata.subscribe(data => { this.processData( data) } );
  }

  processData(d: Data){
    console.info('test ', d);

    this.lineChartData = [
      { data: d.Humidity, label: 'humidity'},
      { data: d.Temperature, label: 'temperature'}
    ]

    this. lineChartLabels = d.Labels
  }

}
