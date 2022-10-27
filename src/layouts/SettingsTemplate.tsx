import React from 'react';
import { Layout } from 'antd';
import SettingsMenu from 'layouts/SettingsMenu';
import { Outlet } from 'react-router';
import styles from 'layouts/layouts.module.scss';
import { settings_routes } from 'routes';

import Heading from './Heading';

export default function SettingsTemplate() {
  return (
    <Layout className={styles['settings-container']}>
      <SettingsMenu />
      <Layout.Content className={styles['settings-content']}>
        <Heading routes={settings_routes} />
        <Outlet />
      </Layout.Content>
    </Layout>
  );
}
