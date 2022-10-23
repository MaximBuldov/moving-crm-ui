import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Template from 'layouts/Template';
import { IRoute, private_routes, public_routes, settings_routes } from 'routes';
import { LOGIN_ROUTE, SALES_DASHBOARD_ROUTE, SETTINGS_ROUTE } from 'routes/consts';
import { userStore } from 'stores';
import { observer } from 'mobx-react-lite';
import SettingsTemplate from 'layouts/SettingsTemplate';

const App = () => {
  const routes = (arr: IRoute[]) => arr.map(({ path, Component }) => <Route path={path} key={path} element={<Component />} />);
  return (
    <Routes>
      {!!userStore.data ? (
        <Route path="/" element={<Template />}>
          {routes(private_routes)}
          <Route path={SETTINGS_ROUTE} key={SETTINGS_ROUTE} element={<SettingsTemplate />}>
            {routes(settings_routes)}
          </Route>
          <Route path="*" element={<Navigate to={SALES_DASHBOARD_ROUTE} />} />
        </Route>
      ) : (
        <>
          {routes(public_routes)}
          <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </>
      )}
    </Routes>
  );
};

export default observer(App);
