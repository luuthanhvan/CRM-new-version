import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import * as environment from '../../assets/environment.json';
import { ENDPOINT } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  private user$ = new BehaviorSubject<User | null>(null);

  constructor(private httpClient: HttpClient) {}

  me(): Observable<any> {
    const url = environment.baseUrl + ENDPOINT.AUTHENTICATION;
    return this.httpClient.get<any>(url).pipe(
      map((res) => res['data']),
      tap((res) => this.user$.next(res))
    );
  }

  getUser(): Observable<User | null> {
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
