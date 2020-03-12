import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from '../configuration.service';
import { Light } from '../../models/light.model';

@Injectable({
  providedIn: 'root'
})
export class LightsEndpointService extends EndpointBase {


  //get endpointUrl() { return this.configurations.baseUrl + '/light' }
  get endpointUrl() { return 'https://private-293278-angulartutorial1.apiary-mock.com' + '/light' }

  constructor(http: HttpClient, authService: AuthService, private configurations: ConfigurationService) {
    super(http, authService);
  }

  getLightsEndpoint<T>(): Observable<T> {
    return this.http.get<T>(this.endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getLightsEndpoint());
      }));
  }

  getLights(){
    return this.getLightsEndpoint<Light[]>();
}


}
