import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil, tap } from 'rxjs/operators';
import type { Contact } from '~features/contact/types/contact.type';
import { getEndpoints } from '~core/constants/endpoints.constants';
import { EndpointService } from '~core/services/endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly endpoints = getEndpoints();
  private readonly endpointService = inject(EndpointService);
  private stop$: Subject<void> = new Subject<void>();

  addContact(
    data: Contact,
    paramsArr?: any[],
    headerOptions?: any[]
  ): Observable<any> {
    return this.endpointService.addEndpoint(
      this.endpoints.contact.v1.contact,
      paramsArr || [],
      data,
      headerOptions
    );
  }

  getListOfContacts(
    paramsArr?: any[],
    headerOptions?: any[]
  ): Observable<Contact[]> {
    return this.endpointService
      .fetchEndpoint(
        this.endpoints.contact.v1.contactList,
        paramsArr || [],
        headerOptions
      )
      .pipe(
        map((res) => res['data']),
        takeUntil(this.stop$),
        shareReplay()
      );
  }

  getContact(
    contactId: string,
    paramsArr?: any[],
    headerOptions?: any[]
  ): Observable<Contact> {
    return this.endpointService
      .fetchEndpoint(
        `${this.endpoints.contact.v1.contact}/${contactId}`,
        paramsArr || [],
        headerOptions
      )
      .pipe(
        map((res) => res['data']),
        takeUntil(this.stop$)
      );
  }

  updateContact(
    contactId: string,
    contactInfo: Contact,
    paramsArr?: any[],
    headerOptions?: any[]
  ): Observable<any> {
    return this.endpointService
      .updateEndpoint(
        `${this.endpoints.contact.v1.contact}/${contactId}`,
        paramsArr || [],
        contactInfo,
        headerOptions
      )
      .pipe(takeUntil(this.stop$));
  }

  deleteContact(
    contactId: string,
    paramsArr?: any[],
    headerOptions?: any[]
  ): Observable<any> {
    return this.endpointService
      .deleteEndpoint(
        `${this.endpoints.contact.v1.contact}/${contactId}`,
        paramsArr || [],
        headerOptions
      )
      .pipe(takeUntil(this.stop$));
  }

  searchContacts(
    subject: string,
    paramsArr?: any[],
    headerOptions?: any[]
  ): Observable<any> {
    return this.endpointService.fetchEndpoint(
      `${this.endpoints.contact.v1.searchContact}/${subject}`,
      paramsArr || [],
      headerOptions
    );
  }
}
