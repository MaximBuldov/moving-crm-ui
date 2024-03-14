import React, { FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { useNavigate } from 'react-router';
import { SALES_DASHBOARD_ROUTE } from 'routes';
import styles from 'layouts/layouts.module.scss';

import Sider from './Sider';
import Header from './Header';

const Template: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        navigate(SALES_DASHBOARD_ROUTE, { replace: true });
        break;
      case '/sales':
        navigate(SALES_DASHBOARD_ROUTE);
        break;
    }
  }, [location.pathname, navigate]);
  return (
    <Layout>
      <Header />
      <Sider />
      <Layout.Content className={styles['content']}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default Template;
