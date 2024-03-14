import React, { useState } from 'react';
import { FileAddOutlined, AimOutlined, UnorderedListOutlined, BellOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { MenuProps, Menu, Popover, Modal, Empty } from 'antd';
import styles from 'layouts/layouts.module.scss';
import { FormCreateLead, FormCreateOpportunity, FormSearch } from 'shared';

enum ModalTypes {
  SEARCH = 'search',
  OPPORTUNITY = 'opportunity',
  LEAD = 'lead',
  TASK = 'task',
  FOLLOW_UP = 'follow-up',
}

export function FormMenu() {
  const [modal, setModal] = useState<ModalTypes | null>(null);
  const [popover, setPopover] = useState<boolean>(false);

  const createMenuAction = (type: ModalTypes) => {
    setModal(type);
    setPopover(false);
  };

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

  const closeModal = () => {
    setModal(null);
  };

  const createContent = (
    <Menu mode="inline" items={items} />
  );
  return (
    <>
      <Popover trigger="click" open={popover} content={createContent} onOpenChange={(visible) => setPopover(visible)} placement="bottomRight">
        <PlusCircleOutlined className={styles['header-icons']} />
      </Popover>
      <Modal width={900} open={!!modal} destroyOnClose={true} onCancel={closeModal} footer={null}>
        <ModalComponent closeModal={closeModal} />
      </Modal>
    </>

  );
}
