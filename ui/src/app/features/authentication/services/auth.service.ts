import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { getEndpoints } from '~core/constants/endpoints.constants';
import { EndpointService } from '~core/services/endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly endpoints = getEndpoints();
  private readonly endpointService = inject(EndpointService);
  private user$ = new BehaviorSubject<any | null>(null);

  login(username: string, password: string, paramsArr?: any[]) {
    const headerOptions = [{ name: 'NoAuth', value: 'True' }];
    return this.endpointService.addEndpoint(
      this.endpoints.auth.v1.signin,
      paramsArr || [],
      { username, password },
      headerOptions
    );
  }

  me(paramsArr?: any[]): Observable<any> {
    return this.endpointService
      .fetchEndpoint(this.endpoints.user.v1.user, paramsArr || [])
      .pipe(
        map((res) => res['data']),
        tap((res) => this.user$.next(res))
      );
  }

  getUser(): Observable<any | null> {
    return this.user$.asObservable();
  }

  setToken(token: string): void {
    window.localStorage.setItem('token', token);
  }

  removeToken(): void {
    window.localStorage.removeItem('token');
  }

  getToken() {
    const token = window.localStorage.getItem('token');
    if (!token) {
      return;
    }
    return token;
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
