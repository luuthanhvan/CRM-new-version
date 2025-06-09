import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil, tap } from 'rxjs/operators';
import type { Contact } from '~features/contact/types/contact.type';
import { getEndpoints } from '~core/constants/endpoints.constants';
import { EndpointService } from '~core/services/endpoint.service';
import { paramObj, headerObj } from '~core/services/endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly endpoints = getEndpoints();
  private readonly endpointService = inject(EndpointService);
  private stop$: Subject<void> = new Subject<void>();

  addContact(
    data: Contact,
    paramsArr?: paramObj[],
    headerOptions?: headerObj[]
  ): Observable<any> {
    return this.endpointService.addEndpoint(
      this.endpoints.contact.v1.contact,
      paramsArr || [],
      data,
      headerOptions
    );
  }

  getListOfContacts(
    paramsArr?: paramObj[],
    headerOptions?: headerObj[]
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

  getListOfContactNames(
    paramsArr?: paramObj[],
    headerOptions?: headerObj[]
  ): Observable<Contact[]> {
    return this.endpointService
      .fetchEndpoint(
        this.endpoints.contact.v1.contactNameList,
        paramsArr || [],
        headerOptions
      )
      .pipe(
        map((res) => res['data']),
        takeUntil(this.stop$)
      );
  }

  getContact(
    contactId: string,
    paramsArr?: paramObj[],
    headerOptions?: headerObj[]
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
    paramsArr?: paramObj[],
    headerOptions?: headerObj[]
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
    paramsArr?: paramObj[],
    headerOptions?: headerObj[]
  ): Observable<any> {
    return this.endpointService
      .deleteEndpoint(
        `${this.endpoints.contact.v1.contact}/${contactId}`,
        paramsArr || [],
        headerOptions
      )
      .pipe(takeUntil(this.stop$));
  }

  bulkDeleteContacts(
    contactIds: string[],
    paramsArr?: paramObj[],
    headerOptions?: headerObj[]
  ): Observable<any> {
    return this.endpointService
      .addEndpoint(
        this.endpoints.contact.v1.bulkDeleteContacts,
        paramsArr || [],
        contactIds,
        headerOptions
      )
      .pipe(takeUntil(this.stop$));
  }

  searchContacts(
    paramsArr?: paramObj[],
    headerOptions?: headerObj[]
  ): Observable<any> {
    return this.endpointService
      .fetchEndpoint(
        this.endpoints.contact.v1.searchContact,
        paramsArr || [],
        headerOptions
      )
      .pipe(takeUntil(this.stop$));
  }

  countContacts(
    countBy: string,
    paramsArr?: paramObj[],
    headerOptions?: headerObj[]
  ): Observable<any> {
    return this.endpointService
      .fetchEndpoint(
        `${this.endpoints.contact.v1.countContact}/${countBy}`,
        paramsArr || [],
        headerOptions
      )
      .pipe(
        map((res) => res['data']),
        takeUntil(this.stop$)
      );
  }
}
