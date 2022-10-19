import React, { FC, useMemo } from 'react';
import { Menu, MenuProps, Typography } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { private_routes } from 'routes';

interface HeadingProps {
	parent: boolean | string
}

const Heading: FC<HeadingProps> = ({ parent = false }) => {
  const location = useLocation();
  const sortedRoutes: MenuProps['items'] = useMemo(() => parent ? private_routes.filter(el => el.parent === parent).map(el => ({
    label: <NavLink to={el.path}>{el.name}</NavLink>,
    key: el.path
  })) : [], [parent]);
  const title: string = useMemo(() => {
    const name = private_routes.find(el => el.path === location.pathname)?.name;
    return name ? name : 'Error in heading';
  }, [location.pathname]);
  return (
    <>
      <Typography.Title level={2}>{title}</Typography.Title>
      {parent && <Menu mode="horizontal" defaultSelectedKeys={['0']} selectedKeys={[location.pathname]} items={sortedRoutes} />}
    </>
  );
};

export default Heading;
