import { environment } from '~environments/environment';

export const getEndpoints = () => {
  return {
    auth: {
      v1: {
        authentication: `${environment.apiBaseUrl}/v1/authentication`,
        signin: `${environment.apiBaseUrl}/v1/authentication/signin`,
      }
    },
    user: {
      v1: {
        user: `${environment.apiBaseUrl}/v1/user`,
        userList: `${environment.apiBaseUrl}/v1/user/list`,
        userNamesList: `${environment.apiBaseUrl}/v1/user/list/name`,
        createUser: `${environment.apiBaseUrl}/v1/user/create`,
      }
    },
    contact: {
      v1: {
        contact: `${environment.apiBaseUrl}/v1/contact`,
        contactList: `${environment.apiBaseUrl}/v1/contact/list`,
        contactNameList: `${environment.apiBaseUrl}/v1/contact/list/contact-name`,
        bulkDeleteContacts: `${environment.apiBaseUrl}/v1/contact/delete`,
        searchContact: `${environment.apiBaseUrl}/v1/contact/search`,
        countContact: `${environment.apiBaseUrl}/v1/contact/count`
      }
    },
    salesOrder: {
      v1: {
        salesOrder: `${environment.apiBaseUrl}/v1/sales-order`,
        salesOrderList: `${environment.apiBaseUrl}/v1/sales-order/list`,
        bulkDeleteSalesOrders: `${environment.apiBaseUrl}/v1/sales-order/delete`,
        searchSalesOrder: `${environment.apiBaseUrl}/v1/sales-order/search`,
        countSalesOrder: `${environment.apiBaseUrl}/v1/sales-order/count`,
      }
    }
  } as const;
}