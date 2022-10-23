import React from 'react';
import { Layout } from 'antd';
import SettingsMenu from 'layouts/SettingsMenu';
import { Outlet } from 'react-router';
import styles from 'layouts/layouts.module.scss';

export default function SettingsTemplate() {
  return (
    <Layout className={styles['settings-container']}>
      <SettingsMenu />
      <Layout.Content className={styles['settings-content']}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
}
