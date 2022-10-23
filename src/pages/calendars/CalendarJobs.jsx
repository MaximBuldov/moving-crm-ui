import { useState } from 'react';
import { Button, Calendar, Drawer, Progress, Space } from 'antd';
import { CalendarOutlined, CoffeeOutlined, SettingOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { getRandomInt } from 'utils/getRandomInt';
import Heading from 'layouts/Heading';
import DrawerPrices from 'components/calendars/DrawerPrices';
import DrawerJobs from 'components/calendars/DrawerJobs';

const CalendarJobs = () => {
  const [drawerData, setDrawerData] = useState(null);
  const dateCellRender = () => {
    const morning = getRandomInt(4);
    const afternoon = getRandomInt(4);
    const sum = morning + afternoon;
    return (
      <div style={{ fontSize: '13px' }}>
        <div><CalendarOutlined /> {sum} jobs</div>
        <div><CoffeeOutlined /> {morning} morning</div>
        <div><SettingOutlined /> {afternoon} afternoon</div>
        <div><Progress size="small" percent={Math.floor(sum * 100 / 8)} /></div>
      </div>
    );
  };
  const onSelect = (date) => {
    setDrawerData({
      date: moment(date).format('MMMM DD YYYY')
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Heading parent="/calendars"/>
      <Calendar onSelect={onSelect} dateCellRender={dateCellRender} />
      {!!drawerData && (
        <Drawer
          size="large"
          title={drawerData.date}
          placement="right" onClose={() => setDrawerData(null)}
          visible={!!drawerData}
          extra={
            <Button type="primary">
              <Link to="/calendars/job">View details</Link>
            </Button>
          }
          bodyStyle={{ backgroundColor: '#f0f2f5' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <DrawerPrices title="San Diego" />
            <DrawerPrices title="Los Angeles" />
            <DrawerJobs />
          </Space>
        </Drawer>
      )}

    </Space>
  );
};

export default CalendarJobs;
