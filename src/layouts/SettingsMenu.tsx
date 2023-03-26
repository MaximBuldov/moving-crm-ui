import React, { useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import styles from 'layouts/layouts.module.scss';
import { IRoute, settings_routes } from 'routes';

export function SettingsMenu() {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const items: MenuProps['items'] = React.useMemo(() => {
    return settings_routes
      .filter((route: IRoute) => !!route.child === false)
      .map((route: IRoute) => ({
        label: route.name,
        key: route.path,
        children: settings_routes
          .filter((child: IRoute) => child.parent === route.path)
          .map((child: IRoute) => ({
            label: <NavLink to={child.path}>{child.name}</NavLink>,
            key: child.path
          }))
      }));
  }, []);

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };
  
  return (
    <Layout.Sider className={styles['settings-sider']} width={250}>
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
