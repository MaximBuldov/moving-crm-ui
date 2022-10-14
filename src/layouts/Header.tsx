import React, { FC, useCallback, useState } from 'react';
import { Avatar, Badge, Col, Layout, List, Menu, Modal, Popover, Row, MenuProps } from 'antd';
import {
  AimOutlined,
  BellOutlined,
  FileAddOutlined,
  InboxOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { SALES_NEW_LEADS_ROUTE } from 'routes/consts';

const inboxData = [
  {
    title: 'John'
  },
  {
    title: 'Mike'
  },
  {
    title: 'Marry'
  },
  {
    title: 'Max'
  }
];

const inboxContent = (
  <List
    itemLayout="horizontal"
    dataSource={inboxData}
    style={{ width: 400 }}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar style={{ backgroundColor: '#f56a00' }}>{item.title[0]}</Avatar>}
          title={<Link to="/">{item.title}</Link>}
          description="Proin eget tortor risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;"
        />
      </List.Item>
    )} />
);

const Header: FC = () => {
  const [modal, setModal] = useState('');
  const [popover, setPopover] = useState(false);

  let ModalComponent;
  // switch (modal) {
  // case 'search':
  //   ModalComponent = FormSearch;
  //   break;
  // case 'opportunity':
  //   ModalComponent = FormCreateOpportunity;
  //   break;
  // case 'lead':
  //   ModalComponent = FormCreateLead;
  //   break;
  // case 'task':
  //   ModalComponent = FormSearch;
  //   break;
  // case 'follow-up':
  //   ModalComponent = FormSearch;
  //   break;
  // default:
  //   ModalComponent = Empty;
  //   break;
  // }

  const createMenuAction = (type: string) => {
    setModal(type);
    setPopover(false);
  };

  const closeModal = useCallback(() => {
    setModal('');
  }, []);

  //TODO: переделать все меню и header под ts
  const items: MenuProps['items'] = [
    {
      label: 'New Opportunity',
      key: 'opportunity',
      icon: <FileAddOutlined />,
      onClick: () => createMenuAction('opportunity')
    },
    {
      label: 'New Lead',
      key: 'lead',
      icon: <AimOutlined />,
      onClick: () => createMenuAction('lead')
    },
    {
      label: 'New Task',
      key: 'task',
      icon: <UnorderedListOutlined />,
      onClick: () => createMenuAction('task')
    },
    {
      label: 'New Follow-up',
      key: 'follow-up',
      icon: <BellOutlined />,
      onClick: () => createMenuAction('follow-up')
    }
  ];

  const createContent = (
    <Menu mode="inline" items={items} />
  );

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  return (
    <Layout.Header className="header">
      <Row align="middle" justify="space-between">
        <Col><div className="logo">CRM</div></Col>
        <Col>
          <Row align="middle" className="header-buttons" gutter={24}>
            <Col>
              <SearchOutlined className="header-icons" onClick={() => setModal('search')} />
            </Col>
            <Col>
              <Link to={SALES_NEW_LEADS_ROUTE}><BellOutlined className="header-icons" /></Link>
            </Col>
            <Col>
              <Popover title="Inbox" content={inboxContent} trigger="click" placement="bottomRight">
                <Badge size="small" count={4}>
                  <InboxOutlined className="header-icons" />
                </Badge>
              </Popover>
            </Col>
            <Col>
              <Popover trigger="click" visible={popover} content={createContent} onVisibleChange={(visible) => setPopover(visible)} placement="bottomRight">
                <PlusCircleOutlined className="header-icons" />
              </Popover>
            </Col>
            <Col>
              <Popover content={content} trigger="click" placement="bottomRight">
                <Badge count={1}>
                  <Avatar style={{ backgroundColor: '#00a2ae' }}>JZ</Avatar>
                </Badge>
              </Popover>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal width={900} visible={!!modal} destroyOnClose={true} onCancel={closeModal} footer={null}>
        {/* <ModalComponent closeModal={closeModal} /> */}
      </Modal>

    </Layout.Header>
  );
};

export default Header;
