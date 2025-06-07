import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil, tap } from 'rxjs/operators';
import { getEndpoints } from '~core/constants/endpoints.constants';
import { EndpointService } from '~core/services/endpoint.service';
import { SalesOrder } from '~features/sales-order/types/sales-order.type';
import { paramObj, headerObj } from '~core/services/endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class SalesOrderService {
  private readonly endpoints = getEndpoints();
  private readonly endpointService = inject(EndpointService);
  private stop$: Subject<void> = new Subject<void>();

  addSalesOrder(
    data: SalesOrder,
    paramsArr?: paramObj[],
    headerOptions?: headerObj[]
  ): Observable<any> {
    return this.endpointService.addEndpoint(
      this.endpoints.salesOrder.v1.salesOrder,
      paramsArr || [],
      data,
      headerOptions
    );
  }

  getListOfSalesOrders(
    paramsArr?: paramObj[],
    headerOptions?: headerObj[]
  ): Observable<SalesOrder[]> {
    return this.endpointService
      .fetchEndpoint(
        this.endpoints.salesOrder.v1.salesOrderList,
        paramsArr || [],
        headerOptions
      )
      .pipe(
        map((res) => res['data']),
        takeUntil(this.stop$),
        shareReplay()
      );
  }

  getSalesOrder(
    orderId: string,
    paramsArr?: paramObj[],
    headerOptions?: headerObj[]
  ): Observable<SalesOrder> {
    return this.endpointService
      .fetchEndpoint(
        `${this.endpoints.salesOrder.v1.salesOrder}/${orderId}`,
        paramsArr || [],
        headerOptions
      )
      .pipe(
        map((res) => res['data']),
        takeUntil(this.stop$)
      );
  }

  updateSalesOrder(
    orderId: string,
    orderInfo: SalesOrder,
    paramsArr?: paramObj[],
    headerOptions?: headerObj[]
  ): Observable<any> {
    return this.endpointService
      .updateEndpoint(
        `${this.endpoints.salesOrder.v1.salesOrder}/${orderId}`,
        paramsArr || [],
        orderInfo,
        headerOptions
      )
      .pipe(takeUntil(this.stop$));
  }

  deleteSalesOrder(
    orderId: string,
    paramsArr?: paramObj[],
    headerOptions?: headerObj[]
  ): Observable<any> {
    return this.endpointService
      .deleteEndpoint(
        `${this.endpoints.salesOrder.v1.salesOrder}/${orderId}`,
        paramsArr || [],
        headerOptions
      )
      .pipe(takeUntil(this.stop$));
  }

  bulkDeleteSalesOrder(
    orderIds: string[],
    paramsArr?: paramObj[],
    headerOptions?: headerObj[]
  ): Observable<any> {
    return this.endpointService
      .addEndpoint(
        this.endpoints.salesOrder.v1.bulkDeleteSalesOrders,
        paramsArr || [],
        orderIds,
        headerOptions
      )
      .pipe(takeUntil(this.stop$));
  }

  searchSalesOrder(
    subject: string,
    paramsArr?: paramObj[],
    headerOptions?: headerObj[]
  ): Observable<any> {
    return this.endpointService.fetchEndpoint(
      `${this.endpoints.salesOrder.v1.searchSalesOrder}/${subject}`,
      paramsArr || [],
      headerOptions
    );
  }
}
