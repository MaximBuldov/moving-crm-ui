import { Space } from 'antd';
import Heading from 'layouts/Heading';

const SalesDashboard = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Heading parent="/sales"/>
      {/* <Row gutter={[8, 8]}>
        <DashboardCard title="Moves" icon={<CheckOutlined />} span={6} color="#65c87a" />
        <DashboardCard title="Booked" icon={<UnorderedListOutlined />} span={6} color="#74d5c8" />
        <DashboardCard title="Moves Not Booked" icon={<MinusOutlined />} span={6} color="#9b59b6" />
        <DashboardCard title="Avg. Move Value" icon={<PieChartOutlined />} span={6} color="#306eba" data={{ value: 1892 }} />
        <DashboardContainer span={12} title="Actions Taken">
          <DashboardActions />
        </DashboardContainer>
        <DashboardContainer span={12} title="Open Items">
          <OpenItems />
        </DashboardContainer>
        <DashboardContainer span={12} title="Job Revenue - Last 30 days">
          <JobRevenue />
        </DashboardContainer>
        <DashboardContainer span={12} title="Top Referral Sources">
          <Referral />
        </DashboardContainer>
      </Row> */}
    </Space>
  );
};

export default SalesDashboard;
