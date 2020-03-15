import { Component, OnInit } from '@angular/core';
import { Data } from '../../models/data.model'
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { TemperatureEndpointService } from '../../services/http/temperature-endpoint.service'
import { from } from 'rxjs';
import { DataResponse } from 'src/app/models/dataResponse.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
    maintainAspectRatio: false, responsive: true, annotation: ''
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

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  samplinginterval;
  filterAll = true;
  columns: any[] = [];
  rows: any[] = [];
  loadingIndicator: boolean;

  constructor(
    private temperatureService: TemperatureEndpointService
  ) { }

  ngOnInit() {

    this.columns = [
      { prop: 'dateTime', name: 'Date ' },
      { prop: 'temperature', name: 'Temperature' },
      { prop: 'humidity', name: 'Humidity' },
    ];

    var dd = new Date(Date.now()); 

    this.fromDate = {
      "year": dd.getFullYear(),
      "month": dd.getMonth()+1,
      "day": dd.getDate()
    }
    this.toDate = {
      "year": dd.getFullYear(),
      "month": dd.getMonth()+1,
      "day": dd.getDate()
    }

   this.reloadData();
  }

  processData(d: DataResponse[]) {
    console.info('test ', d);

    var data: Data = new Data();
    data.Temperature = [];
    data.Humidity = [];
    data.Labels = [];
    d.forEach(e => {
      data.Temperature.push(e.temperature);
      data.Humidity.push(e.humidity);
      let date = new Date(e.dateTime)
      
      var dateFormat = require('dateformat');
      let a  = dateFormat(date, "dd.mm HH:MM");

      data.Labels.push(a);
    });

    this.lineChartData = [
      { data: data.Humidity, label: 'humidity' },
      { data: data.Temperature, label: 'temperature' }
    ]

    this.lineChartLabels = data.Labels

    this.rows = d;



  }

  reloadData() {
    let sampling = this.samplinginterval;
    if(this.samplinginterval == 'All' || this.samplinginterval === undefined)  {
      sampling = null;
    }

    let fromDateModel = null;
    if (this.fromDate !== undefined) {
      fromDateModel = new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day,0,0,0);
    }

    let toDateModel = null;
    if (this.toDate !== undefined)
      toDateModel = new Date(this.toDate.year, this.toDate.month-1, this.toDate.day,23,59,59);

    var adata = this.temperatureService.getTemperaturesDataEndpoint(fromDateModel, toDateModel, sampling);
    adata.subscribe(data => { this.processData(data) });
  }

  filter() {
    console.info('filter ', this.fromDate, this.toDate, this.samplinginterval);

    this.reloadData();

  }

}
