import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from '../configuration.service';
import { Data } from '../../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class TemperatureEndpointService extends EndpointBase {


  //get endpointUrl() { return this.configurations.baseUrl + '/data/1/temperature' }
  get endpointUrl() { return 'https://private-293278-angulartutorial1.apiary-mock.com' + '/data/1/temperature' }
  get endpointDataUrl() { return 'http://localhost:5000' + '/api/temperature' }

  constructor(http: HttpClient, authService: AuthService, private configurations: ConfigurationService) {
    super(http, authService);
  }

  getTemperaturesEndpoint<T>(): Observable<T> {
    return this.http.get<T>(this.endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getTemperaturesEndpoint());
      }));
  }



  getTemperatures(userId?: string) {
    return this.getTemperaturesEndpoint<Data>();
  }

  getTemperaturesData(fromDate?: Date, toDate?: Date) {
    return this.getTemperaturesDataEndpoint(fromDate);
  }

  getTemperaturesDataEndpoint(fromDate?: Date, toDate?: Date): Observable<Data> {
    var url = this.endpointDataUrl
    if (fromDate)
      url += `?from=${fromDate.toJSON()}`
    if (toDate)
      url += `&to=${toDate.toJSON()}`

 
    return this.http.get<Data>(url, this.requestHeaders).pipe<Data>(
      catchError(error => {
        return this.handleError(error, () => this.getTemperaturesEndpoint());
      }));
  }



}
