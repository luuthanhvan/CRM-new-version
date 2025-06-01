import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';
import { HttpClient, HttpContext, HttpParams, httpResource } from '@angular/common/http';
import type { Contact } from '~features/contact/types/contact.type';
import { } from '~core/constants/endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

}