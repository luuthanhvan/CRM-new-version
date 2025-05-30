import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';
import * as environment from '../../assets/environment.json';
import { ENDPOINT } from '../constant';
import { EndpointFactoryService } from './endpoint-factory.service';

@Injectable({
  providedIn: 'root',
})
export class EndpointService extends EndpointFactoryService {
  get getBaseUrl() {
    return environment.baseUrl;
  }

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  signin(
    username: string,
    password: string,
    paramsArr?: any[]
  ): Observable<any> {
    const endpoint = this.getBaseUrl + ENDPOINT.SIGN_IN;
    const headerOptions = [{ name: 'NoAuth', value: 'True' }];
    return this.addEndpoint(
      endpoint,
      paramsArr || [],
      { username, password },
      headerOptions
    );
  }

  getContact(contactId: string, paramsArr?: any[]) {
    const endpoint = this.getBaseUrl + `${ENDPOINT.CONTACT}/${contactId}`;
    this.fetchEndpoint(endpoint, paramsArr || []);
  }

  fetchEndpoint(
    endpoint: string,
    paramsArr: any[],
    headerOptions?: any[]
  ): Observable<any> {
    let params = new HttpParams();
    paramsArr.forEach((param) => {
      if (param.paramName) {
        params = params.append(param.paramName, param.paramVal);
      }
    });
    return this.httpClient
      .get(endpoint, {
        headers: this.getRequestHeaders(headerOptions),
        params: params,
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  addEndpoint(
    endpoint: string,
    paramsArr: any[],
    reqBody: {},
    headerOptions?: any[]
  ): Observable<any> {
    let params = new HttpParams();
    paramsArr.forEach((param) => {
      if (param.paramName) {
        params = params.append(param.paramName, param.paramVal);
      }
    });
    return this.httpClient
      .post(endpoint, reqBody, {
        headers: this.getRequestHeaders(headerOptions),
        params: params,
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  updateEndpoint(
    endpoint: string,
    paramsArr: any[],
    reqBody: {},
    headerOptions?: any[]
  ): Observable<any> {
    let params = new HttpParams();
    paramsArr.forEach((param) => {
      if (param.paramName) {
        params = params.append(param.paramName, param.paramVal);
      }
    });
    return this.httpClient
      .put(endpoint, reqBody, {
        headers: this.getRequestHeaders(headerOptions),
        params: params,
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  deleteEndpoint(
    endpoint: string,
    paramsArr: any[],
    headerOptions?: any[]
  ): Observable<any> {
    let params = new HttpParams();
    paramsArr.forEach((param) => {
      if (param.paramName) {
        params = params.append(param.paramName, param.paramVal);
      }
    });
    return this.httpClient
      .delete(endpoint, {
        headers: this.getRequestHeaders(headerOptions),
        params: params,
      })
      .pipe(catchError((error) => this.handleError(error)));
  }
}
