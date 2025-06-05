import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil, tap } from 'rxjs/operators';
import { getEndpoints } from '~core/constants/endpoints.constants';
import { EndpointService } from '~core/services/endpoint.service';
import type { User } from '~features/user/types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly endpoints = getEndpoints();
  private readonly endpointService = inject(EndpointService);
  private stop$: Subject<void> = new Subject<void>();

  addNewUser(
    data: User,
    paramsArr?: any[],
    headerOptions?: any[]
  ): Observable<any> {
    return this.endpointService.addEndpoint(
      this.endpoints.user.v1.user,
      paramsArr || [],
      data,
      headerOptions
    );
  }

  createUser(
    data: User,
    paramsArr?: any[],
    headerOptions?: any[]
  ): Observable<any> {
    return this.endpointService.addEndpoint(
      this.endpoints.user.v1.createUser,
      paramsArr || [],
      data,
      headerOptions
    );
  }

  getListOfUsers(paramsArr?: any[], headerOptions?: any[]): Observable<User[]> {
    return this.endpointService
      .fetchEndpoint(
        this.endpoints.user.v1.userList,
        paramsArr || [],
        headerOptions
      )
      .pipe(
        map((res) => res['data']),
        takeUntil(this.stop$),
        shareReplay()
      );
  }

  getListOfUserNames(
    paramsArr?: any[],
    headerOptions?: any[]
  ): Observable<User[]> {
    return this.endpointService
      .fetchEndpoint(
        this.endpoints.user.v1.userNamesList,
        paramsArr || [],
        headerOptions
      )
      .pipe(
        map((res) => res['data']),
        takeUntil(this.stop$)
      );
  }

  getUser(
    userId: string,
    paramsArr?: any[],
    headerOptions?: any[]
  ): Observable<User> {
    return this.endpointService
      .fetchEndpoint(
        `${this.endpoints.user.v1.user}/${userId}`,
        paramsArr || [],
        headerOptions
      )
      .pipe(
        map((res) => res['data']),
        takeUntil(this.stop$)
      );
  }

  updateUser(
    userId: string,
    userInfo: User,
    paramsArr?: any[],
    headerOptions?: any[]
  ): Observable<any> {
    return this.endpointService
      .updateEndpoint(
        `${this.endpoints.user.v1.user}/${userId}`,
        paramsArr || [],
        userInfo,
        headerOptions
      )
      .pipe(takeUntil(this.stop$));
  }

  changePassword(
    userId: string,
    newPass: string,
    paramsArr?: any[],
    headerOptions?: any[]
  ): Observable<void> {
    return this.endpointService
      .addEndpoint(
        `${this.endpoints.user.v1.user}/${userId}`,
        paramsArr || [],
        { newPass },
        headerOptions
      )
      .pipe(takeUntil(this.stop$));
  }

  // stop subcriptions
  stop() {
    this.stop$.next();
    this.stop$.complete();
  }
}
