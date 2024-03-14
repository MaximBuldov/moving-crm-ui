import React from 'react';
import { Calendar } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Heading } from 'layouts';
import { DISPATCH_ROUTE, DISPATCH_SCHEDULE_ROUTE, private_routes } from 'routes';
import { useNavigate } from 'react-router-dom';

export const DispatchCalendar = () => {
  const navigate = useNavigate();
  const onSelect = (newValue: Dayjs) => {
    navigate(`${DISPATCH_SCHEDULE_ROUTE}/${dayjs(newValue).format('YYYYMMDD')}`);
  };

  return (
    <>
      <Heading routes={private_routes} parent={DISPATCH_ROUTE} />
      <Calendar onSelect={onSelect} />;
    </>
  );
};
