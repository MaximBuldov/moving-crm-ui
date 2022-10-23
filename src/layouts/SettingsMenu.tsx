import { Layout, Menu, MenuProps } from 'antd';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { CAL_JOBS_ROUTE, TASKS_ROUTE, SALES_DASHBOARD_ROUTE, CUSTOMERS_ROUTE, CUSTOMER_SERVICE_TICKET_ROUTE, STORAGE_DASHBOARD_ROUTE, SETTINGS_ROUTE } from 'routes/consts';
import styles from 'layouts/layouts.module.scss';

const items: MenuProps['items'] = [
  {
    label: 	<NavLink to={CAL_JOBS_ROUTE}>Calendar</NavLink>,
    key: CAL_JOBS_ROUTE,
    children: [
      {
        label: <NavLink to={TASKS_ROUTE}>Tasks</NavLink>,
        key: TASKS_ROUTE
      },
      {
        label: 	<NavLink to={SALES_DASHBOARD_ROUTE}>Sales</NavLink>,
        key: SALES_DASHBOARD_ROUTE
      },
      {
        label: 	<NavLink to={CUSTOMERS_ROUTE}>Customers</NavLink>,
        key: CUSTOMERS_ROUTE
      },
      {
        label: 	<NavLink to={CUSTOMER_SERVICE_TICKET_ROUTE}>Customer service</NavLink>,
        key: CUSTOMER_SERVICE_TICKET_ROUTE
      },
      {
        label: 	<NavLink to={STORAGE_DASHBOARD_ROUTE}>Storage</NavLink>,
        key: STORAGE_DASHBOARD_ROUTE
      },
      {
        label: 	<NavLink to={SETTINGS_ROUTE}>Settings</NavLink>,
        key: SETTINGS_ROUTE
      }
    ]
  },
  {
    label: <NavLink to={TASKS_ROUTE}>Tasks</NavLink>,
    key: TASKS_ROUTE,
    children: [
      {
        label: <NavLink to={TASKS_ROUTE}>Tasks</NavLink>,
        key: TASKS_ROUTE
      },
      {
        label: 	<NavLink to={SALES_DASHBOARD_ROUTE}>Sales</NavLink>,
        key: SALES_DASHBOARD_ROUTE
      },
      {
        label: 	<NavLink to={CUSTOMERS_ROUTE}>Customers</NavLink>,
        key: CUSTOMERS_ROUTE
      },
      {
        label: 	<NavLink to={CUSTOMER_SERVICE_TICKET_ROUTE}>Customer service</NavLink>,
        key: CUSTOMER_SERVICE_TICKET_ROUTE
      },
      {
        label: 	<NavLink to={STORAGE_DASHBOARD_ROUTE}>Storage</NavLink>,
        key: STORAGE_DASHBOARD_ROUTE
      },
      {
        label: 	<NavLink to={SETTINGS_ROUTE}>Settings</NavLink>,
        key: SETTINGS_ROUTE
      }
    ]
  },
  {
    label: 	<NavLink to={SALES_DASHBOARD_ROUTE}>Sales</NavLink>,
    key: SALES_DASHBOARD_ROUTE
  },
  {
    label: 	<NavLink to={CUSTOMERS_ROUTE}>Customers</NavLink>,
    key: CUSTOMERS_ROUTE
  },
  {
    label: 	<NavLink to={CUSTOMER_SERVICE_TICKET_ROUTE}>Customer service</NavLink>,
    key: CUSTOMER_SERVICE_TICKET_ROUTE
  },
  {
    label: 	<NavLink to={STORAGE_DASHBOARD_ROUTE}>Storage</NavLink>,
    key: STORAGE_DASHBOARD_ROUTE
  },
  {
    label: 	<NavLink to={SETTINGS_ROUTE}>Settings</NavLink>,
    key: SETTINGS_ROUTE
  }
];

export default function SettingsMenu() {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };
  
  return (
    <Layout.Sider className={styles['settings-sider']}>
      <Menu
        theme="light"
        items={items}
        mode="inline"
        selectedKeys={[location.pathname]} 
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      />
    </Layout.Sider>
  );
}
