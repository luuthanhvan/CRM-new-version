import { environment } from '~environments/environment';

export const getEndpoints = () => {
  return {
    auth: {
      v1: {
        authentication: `${environment.apiBaseUrl}/v1/authentication`,
        signin: `${environment.apiBaseUrl}/v1/signin`,
      }
    },
    user: {
      v1: {
        user: `${environment.apiBaseUrl}/v1/user`,
        userList: `${environment.apiBaseUrl}/v1/user/list`,
        createUser: `${environment.apiBaseUrl}/v1/user/create`,
      }
    },
    contact: {
      v1: {
        contact: `${environment.apiBaseUrl}/v1/contact`,
        contactList: `${environment.apiBaseUrl}/v1/contact/list`,
        massDeleteContact: `${environment.apiBaseUrl}/v1/contact/delete`,
        searchContact: `${environment.apiBaseUrl}/v1/contact/search`,
      }
    },
    salesOrder: {
      v1: {
        salesOrder: `${environment.apiBaseUrl}/v1/sales-order`,
        salesOrderList: `${environment.apiBaseUrl}/v1/sales-order/list`,
        massDeleteSalesOrder: `${environment.apiBaseUrl}/v1/sales-order/delete`,
        searchSalesOrder: `${environment.apiBaseUrl}/v1/sales-order/search`,
      }
    }
  } as const;
}