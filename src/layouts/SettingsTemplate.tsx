import React from 'react';
import { Layout } from 'antd';
import { Heading, SettingsMenu } from 'layouts';
import { Outlet } from 'react-router';
import styles from 'layouts/layouts.module.scss';
import { settings_routes } from 'routes';

export function SettingsTemplate() {
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
