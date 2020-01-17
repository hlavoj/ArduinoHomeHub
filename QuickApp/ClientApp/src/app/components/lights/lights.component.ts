import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { LightsEndpointService } from '../../services/http/lights-endpoint.service'
import { Light } from '../../models/light.model';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
})
export class LightsComponent implements OnInit {

  
  @ViewChild('colorTemplate', { static: true })
  colorTemplate: TemplateRef<any>;
  
  @ViewChild('turnOnTemplate', { static: true })
  turnOnTemplate: TemplateRef<any>;

  loadingIndicator = false;
  reorderable = true;
  rows = [
    // { id: 5, turnOn: 'Male', intensity: 'Swimlane', color: 'ddd' }
    // { name: 'Dany', gender: 'Male', company: 'KFC' },
    // { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'id' , name : 'neco'},
    { name: 'turnOn' , cellTemplate: this.turnOnTemplate },
    { name: 'intensity' },
    { prop: 'color', name: 'Color' , cellTemplate: this.colorTemplate }
  ];

  constructor(
    private lightsService: LightsEndpointService
  ) { }

  ngOnInit() {
    this.lightsService.getLights().subscribe(lights => 
      this.proccessLights(lights))

      this.columns = [
        { prop: 'id' , name : 'neco'},
        { name: 'turnOn' , cellTemplate: this.turnOnTemplate},
        { name: 'intensity' },
        { prop: 'color', name: 'Color' , cellTemplate: this.colorTemplate }
      ];
  }

  proccessLights(lights: Light[]): void {
    console.info('test 3', lights);

    this.rows = lights;
  }

  turnOnLite(row){
    console.info('turn on lite', row);
  }

  edit(row){
    console.info('edit lite', row);
  }

  delete(row){
    console.info('delete lite', row);
  }

}
