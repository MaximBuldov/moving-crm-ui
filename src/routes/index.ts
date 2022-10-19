import { FunctionComponent } from 'react';
import Login from 'pages/Login';
import Home from 'pages/Home';
import SalesDashboard from 'pages/sales/SalesDashboard';
import SalesMyLeads from 'pages/sales/SalesMyLeads';
import SalesOpportunities from 'pages/sales/SalesOpportunities';
import EstimatesEdit from 'pages/sales/EstimatesEdit';

import {
  CAL_JOBS_ROUTE,
  CAL_OFFICE_ROUTE,
  CAL_ROUTE,
  CUSTOMER_SERVICE_RATINGS_ROUTE,
  CUSTOMER_SERVICE_ROUTE,
  CUSTOMER_SERVICE_TICKET_ROUTE,
  CUSTOMERS_DETAILS_ROUTE,
  CUSTOMERS_ROUTE,
  ESTIMATES_EDIT_ID_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  SALES_DASHBOARD_ROUTE,
  SALES_FOLLOW_UPS_ROUTE,
  SALES_MY_LEADS_ROUTE,
  SALES_NEW_LEADS_ROUTE,
  SALES_OPPORTUNITIES_ID_ROUTE,
  SALES_ROUTE,
  STORAGE_ACCOUNTS_ROUTE,
  STORAGE_AGING_ROUTE,
  STORAGE_CONTAINERS_ROUTE,
  STORAGE_DASHBOARD_ROUTE,
  STORAGE_INVOICES_ROUTE,
  STORAGE_ROUTE,
  TASKS_ROUTE
} from './consts';
import SalesNewLeads from 'pages/sales/SalesNewLeads';

export interface IRoute {
	path: string,
	Component: FunctionComponent,
	parent?: string,
	name?: string,
	child?: boolean
}

export const public_routes: IRoute[] = [
  {
    path: LOGIN_ROUTE,
    Component: Login
  },
  {
    path: HOME_ROUTE,
    Component: Home
  }
];
export const private_routes: IRoute[] = [
//   {
//     path: PROFILE_ROUTE,
//     Component: Profile
//   },
  {
    path: SALES_DASHBOARD_ROUTE,
    Component: SalesDashboard,
    parent: SALES_ROUTE,
    name: 'Dashboard'
  },
  {
    path: SALES_NEW_LEADS_ROUTE,
    Component: SalesNewLeads,
    parent: SALES_ROUTE,
    name: 'New leads'
  },
  {
    path: SALES_MY_LEADS_ROUTE,
    Component: SalesMyLeads,
    parent: SALES_ROUTE,
    name: 'My leads'
  },
  {
    path: SALES_FOLLOW_UPS_ROUTE,
    Component: SalesMyLeads,
    parent: SALES_ROUTE,
    name: 'Follow-ups'
  },
  {
    path: SALES_OPPORTUNITIES_ID_ROUTE,
    Component: SalesOpportunities
  },
  {
    path: ESTIMATES_EDIT_ID_ROUTE,
    Component: EstimatesEdit
  }
//   {
//     path: CAL_JOBS_ROUTE,
//     Component: CalendarJobs,
//     parent: CAL_ROUTE,
//     name: 'Job calendar'
//   },
//   {
//     path: CAL_OFFICE_ROUTE,
//     Component: CalendarOffice,
//     parent: CAL_ROUTE,
//     name: 'Office calendar'
//   },
  // {
  //   path: TASKS_ROUTE,
  //   Component: SalesMyLeads,
  //   name: 'Tasks'
  // },
//   {
//     path: CUSTOMERS_ROUTE,
//     Component: SalesMyLeads,
//     name: 'Customers'
//   },
//   {
//     path: CUSTOMERS_DETAILS_ROUTE,
//     Component: CustomerDetails
//   },
//   {
//     path: CUSTOMER_SERVICE_TICKET_ROUTE,
//     Component: SalesMyLeads,
//     parent: CUSTOMER_SERVICE_ROUTE,
//     name: 'Tickets'
//   },
//   {
//     path: CUSTOMER_SERVICE_RATINGS_ROUTE,
//     Component: SalesMyLeads,
//     parent: CUSTOMER_SERVICE_ROUTE,
//     name: 'Ratings'
//   },
//   {
//     path: STORAGE_DASHBOARD_ROUTE,
//     Component: SalesDashboard,
//     parent: STORAGE_ROUTE,
//     name: 'Dashboard'
//   },
//   {
//     path: STORAGE_ACCOUNTS_ROUTE,
//     Component: SalesMyLeads,
//     parent: STORAGE_ROUTE,
//     name: 'Accounts'
//   },
//   {
//     path: STORAGE_CONTAINERS_ROUTE,
//     Component: SalesMyLeads,
//     parent: STORAGE_ROUTE,
//     name: 'Containers'
//   },
//   {
//     path: STORAGE_AGING_ROUTE,
//     Component: SalesMyLeads,
//     parent: STORAGE_ROUTE,
//     name: 'Aging'
//   },
//   {
//     path: STORAGE_INVOICES_ROUTE,
//     Component: SalesMyLeads,
//     parent: STORAGE_ROUTE,
//     name: 'Invoices'
//   },
];