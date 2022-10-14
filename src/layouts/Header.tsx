import React, { FC, useState } from 'react';
import { Avatar, Badge, Col, Layout, List, Menu, Modal, Popover, Row, MenuProps, Empty } from 'antd';
import {
  AimOutlined,
  BellOutlined,
  CloudTwoTone,
  FileAddOutlined,
  InboxOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { SALES_NEW_LEADS_ROUTE } from 'routes/consts';
import { userStore } from 'stores';
import FormSearch from 'shared/forms/FormSearch';
import FormCreateOpportunity from 'shared/forms/FormCreateOpportunity';
import FormCreateLead from 'shared/forms/FormCreateLead';
import styles from 'layouts/layouts.module.scss';

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

enum ModalTypes {
  SEARCH = 'search',
  OPPORTUNITY = 'opportunity',
  LEAD = 'lead',
  TASK = 'task',
  FOLLOW_UP = 'follow-up',
}

const Header: FC = () => {
  const [modal, setModal] = useState<ModalTypes | null>(null);
  const [popover, setPopover] = useState<boolean>(false);

  let ModalComponent;
  switch (modal) {
  case ModalTypes.SEARCH:
    ModalComponent = FormSearch;
    break;
  case ModalTypes.OPPORTUNITY:
    ModalComponent = FormCreateOpportunity;
    break;
  case ModalTypes.LEAD:
    ModalComponent = FormCreateLead;
    break;
  case ModalTypes.TASK:
    ModalComponent = FormSearch;
    break;
  case ModalTypes.FOLLOW_UP:
    ModalComponent = FormSearch;
    break;
  default:
    ModalComponent = Empty;
    break;
  }

  const createMenuAction = (type: ModalTypes) => {
    setModal(type);
    setPopover(false);
  };

  const closeModal = () => {
    setModal(null);
  };

  //TODO: переделать все меню и header под ts
  const items: MenuProps['items'] = [
    {
      label: 'New Opportunity',
      key: ModalTypes.OPPORTUNITY,
      icon: <FileAddOutlined />,
      onClick: () => createMenuAction(ModalTypes.OPPORTUNITY)
    },
    {
      label: 'New Lead',
      key: ModalTypes.LEAD,
      icon: <AimOutlined />,
      onClick: () => createMenuAction(ModalTypes.LEAD)
    },
    {
      label: 'New Task',
      key: ModalTypes.TASK,
      icon: <UnorderedListOutlined />,
      onClick: () => createMenuAction(ModalTypes.TASK)
    },
    {
      label: 'New Follow-up',
      key: ModalTypes.FOLLOW_UP,
      icon: <BellOutlined />,
      onClick: () => createMenuAction(ModalTypes.FOLLOW_UP)
    }
  ];

  const createContent = (
    <Menu mode="inline" items={items} />
  );

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
      <p onClick={() => userStore.logout()}>Logout</p>
    </div>
  );

  return (
    <Layout.Header className={styles['header']}>
      <Row align="middle" justify="space-between">
        <Col>
          <div className={styles['logo-box']}>
            <CloudTwoTone className={styles['logo']}/>
            <span>CRM</span>
          </div>
        </Col>
        <Col>
          <Row align="middle" className={styles['header-buttons']} gutter={24}>
            <Col>
              <SearchOutlined className={styles['header-icons']} onClick={() => setModal(ModalTypes.SEARCH)} />
            </Col>
            <Col>
              <Link to={SALES_NEW_LEADS_ROUTE}>
                <BellOutlined className={styles['header-icons']} />
              </Link>
            </Col>
            <Col>
              <Popover title="Inbox" content={inboxContent} trigger="click" placement="bottomRight">
                <Badge size="small" count={4}>
                  <InboxOutlined className={styles['header-icons']} />
                </Badge>
              </Popover>
            </Col>
            <Col>
              <Popover trigger="click" open={popover} content={createContent} onOpenChange={(visible) => setPopover(visible)} placement="bottomRight">
                <PlusCircleOutlined className={styles['header-icons']}  />
              </Popover>
            </Col>
            <Col>
              <Popover content={content} trigger="click" placement="bottomRight">
                <Badge count={1}>
                  <Avatar style={{ backgroundColor: '#00a2ae' }}>{userStore.initials}</Avatar>
                </Badge>
              </Popover>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal width={900} open={!!modal} destroyOnClose={true} onCancel={closeModal} footer={null}>
        <ModalComponent closeModal={closeModal} />
      </Modal>

    </Layout.Header>
  );
};

export default Header;
