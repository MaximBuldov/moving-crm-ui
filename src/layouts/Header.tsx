import { FC, useState } from 'react';
import { Badge, Col, Layout, Modal, Row } from 'antd';
import { BellOutlined, CloudTwoTone, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from 'layouts/layouts.module.scss';
import { InboxHeader, FormMenu, ProfileMenu } from 'components';
import { SALES_NEW_LEADS_ROUTE } from 'routes';
import { FormSearch } from 'shared';

const Header: FC = () => {
  const [modal, setModal] = useState<boolean>(false);

  const closeModal = () => {
    setModal(false);
  };

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
            <Col className={styles['header-icon-col']}>
              <SearchOutlined className={styles['header-icons']} onClick={() => setModal(true)} />
            </Col>
            <Col className={styles['header-icon-col']}>
              <Badge size="small" count={1}>
                <Link to={SALES_NEW_LEADS_ROUTE}>
                  <BellOutlined className={styles['header-icons']} />
                </Link>
              </Badge>
            </Col>
            <Col className={styles['header-icon-col']}>
              <InboxHeader />
            </Col>
            <Col className={styles['header-icon-col']}>
              <FormMenu />
            </Col>
            <Col>
              <ProfileMenu />
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal width={1100} open={modal} destroyOnClose={true} onCancel={closeModal} footer={null}>
        <FormSearch />
      </Modal>
    </Layout.Header>
  );
};

export default Header;
