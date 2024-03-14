import React, { FC, useMemo } from 'react';
import { Menu, MenuProps, Typography } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { IRoute } from 'routes';

interface HeadingProps {
	parent?: boolean | string;
  routes: IRoute[];
  route?: IRoute;
}

export const Heading: FC<HeadingProps> = ({ routes, parent = false, route }) => {
  const location = useLocation();
  const sortedRoutes: MenuProps['items'] = useMemo(() => parent ? routes.filter(el => el.parent === parent).map(el => ({
    label: <NavLink to={el.path}>{el.name}</NavLink>,
    key: el.path
  })) : [], [parent, routes]);

  const title = useMemo(() => {
    if(route) {
      return route.name;
    }
    const name = routes.find(el => el.path === location.pathname)?.name;

    return name || 'Error in heading';
  }, [location.pathname, route, routes]);

  return (
    <>
      {title && <Typography.Title level={2}>{title}</Typography.Title>}
      {parent && <Menu mode="horizontal" defaultSelectedKeys={['0']} selectedKeys={[route ? route.path : location.pathname]} items={sortedRoutes} />}
    </>
  );
};

