import { DeleteTwoTone, DollarCircleOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Popconfirm, Table } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { SETTINGS_BRANCHES_ROUTE, SETTINGS_BRANCH_CREW_RATES_ROUTE } from 'routes/consts';
import branchesService from 'services/collections/branches.service';
import { formattedPhone } from 'utils/formattedPhone';

export default function Branches() {
  const getBranches = useQuery(['branches'], branchesService.fetchMany);
  const deleteBranch = useMutation(['branches'], branchesService.deleteOne);

  const columns = [
    {
      title: 'Name',
      dataIndex: ['attributes', 'label'],
      key: 'name',
      render: (label: string, record: { id: any; }) => <Link to={`${SETTINGS_BRANCHES_ROUTE}/${record.id}`}>{label}</Link>
    },
    {
      title: 'Is primary',
      dataIndex: ['attributes', 'isPrimary'],
      key: 'isPrimary',
      render: (bool: boolean) => bool && 'Yes'
    },
    {
      title: 'Sales tax rate',
      dataIndex: ['attributes', 'salesTaxRate'],
      key: 'salesTaxRate',
      render: (tax: number) => `${tax}%`
    },
    {
      title: 'Phone',
      dataIndex: ['attributes', 'phone'],
      key: 'phone',
      render: (phone: string) => formattedPhone(phone)
    },
    {
      title: 'Sms number',
      dataIndex: ['attributes', 'smsPhone'],
      key: 'smsPhone',
      render: (phone: string) => formattedPhone(phone)
    },
    {
      title: 'Dispatch location',
      dataIndex: ['attributes', 'dispatchLocation'],
      key: 'dispatchLocation'
    },
    {
      title: 'Crew rates',
      dataIndex: 'id',
      key: 'crewRates',
      render: (id: number) => <Link to={`${SETTINGS_BRANCH_CREW_RATES_ROUTE}/${id}`}>Add Overrides</Link> 
    },
    {
      dataIndex: 'id',
      key: 'action',
      render: (id: number) => <Dropdown placement="bottom" trigger={['click']} overlay={<Menu items={renderMenuItems(id)}/>}><MoreOutlined /></Dropdown>
    }
  ];

  return <Table
    dataSource={getBranches.data.data}
    columns={columns}
    pagination={false}
    rowKey={(record) => record.id}
    loading={getBranches.isLoading || deleteBranch.isLoading}
  />;

  function renderMenuItems(id: number) {
    return [
      { label: <Link to={`${SETTINGS_BRANCHES_ROUTE}/${id}`}>Edit</Link>, key: 'edit', icon: <EditOutlined /> },
      { label: <Link to={`${SETTINGS_BRANCH_CREW_RATES_ROUTE}/${id}`}>Crew rates</Link>, key: 'crewRates', icon: <DollarCircleOutlined /> },
      { 
        label: <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => deleteBranch.mutate(id) }>Delete</Popconfirm>, 
        key: 'delete', 
        icon: <DeleteTwoTone twoToneColor="#FF0000" />
      }
    ];
  }
}
