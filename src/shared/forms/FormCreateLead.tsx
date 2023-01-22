import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import GoogleAutocomplete from 'shared/maps/GoogleAutocomplete';
import { RangePickerProps } from 'antd/lib/date-picker';
import { fieldsStore } from 'stores';
import { JobsStatus } from 'models/fields';
import useJobCustomerApi from 'hooks/useJobCustomerApi';
import { fieldNames } from 'stores/fieldsStore';

import CustomersAutocomplete from './fields/CustomersAutocomplete';
import Phones from './fields/Phones';

const { Item, List } = Form;

interface FormCreateLeadProps {
  closeModal: () => void
}

const FormCreateLead = ({ closeModal }: FormCreateLeadProps) => {
  const [form] = Form.useForm();
  const { onFinish, setUser, isLoading } = useJobCustomerApi(JobsStatus.NEW_LEAD, closeModal);

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().subtract(1, 'days');
  };

  return (
    <Form
      name="new-lead"
      form={form}
      size="large"
      layout="vertical"
      className="formItemWithoutPadding"
      onFinish={onFinish}
      initialValues={{
        phones: [{}]
      }}
    >
      <Typography.Title level={3}>Create New Lead</Typography.Title>
      <Divider />
      <Row gutter={16}>
        <Col span={16}>
          <Item
            label="Customer Name"
            name="name"
            rules={[{ required: true }]}
          >
            <CustomersAutocomplete 
              placeholder="Customer name"
              setUser={(customer) => setUser(customer)}
            />
          </Item>
        </Col>
        <Col span={8}>
          <Item
            label="Email"
            name="email"
          >
            <Input placeholder="Email"/>
          </Item>
        </Col>
        <Col span={24}>
          <List name="phones">
            {(fields, actions) => <Phones form={form} fields={fields} actions={actions} />}
          </List>
        </Col>
        <Col span={8}>
          <Item
            label="Sales Person"
            name="manager"
            rules={[{ required: true }]}
          >
            <Select placeholder={'Sales Person'} fieldNames={{ label: 'fullName', value: 'id' }} options={fieldsStore.managers}/>
          </Item>
        </Col>
        <Col span={8}>
          <Item
            label="Branch"
            name="branch"
            rules={[{ required: true }]}
          >
            <Select placeholder={'Branch'} options={fieldsStore.branches} />
          </Item>
        </Col>
        <Col span={8}>
          <Item
            label="Referral Source"
            name="source"
          >
            <Select placeholder={'Referral Source'} fieldNames={fieldNames} options={fieldsStore.data?.source}/>
          </Item>
        </Col>
        <Col span={8}>
          <Item
            label="Move Date"
            name="moveDate"
            rules={[{ required: true }]}
          >
            <DatePicker 
              disabledDate={disabledDate}
              style={{ width: '100%' }}
              format={'MM/DD/YYYY'}
              placeholder="Move Date"
            />
          </Item>
        </Col>
        <Col span={8}>
          <Item
            label="Move Size"
            name="moveSize"
          >
            <Select placeholder={'Move Size'} fieldNames={fieldNames} options={fieldsStore.data?.moveSize} />
          </Item>
        </Col>
        <Col span={8}>
          <Item
            label="Service Type"
            name="serviceType"
          >
            <Select placeholder={'Service Type'} fieldNames={fieldNames} options={fieldsStore.data?.serviceType} />
          </Item>
        </Col>
        <Col span={12}>
          <GoogleAutocomplete field="origin" />
        </Col>
        <Col span={12}>
          <GoogleAutocomplete field="destination" />
        </Col>
        <Col span={24}>
          <Item label={'Notes'} name={'notes'}>
            <Input.TextArea rows={3} placeholder={'Notes'}/>
          </Item>
        </Col>
        <Col>
          <Button onClick={closeModal} style={{ marginRight: 16 }}>Cancel</Button>
          <Button loading={isLoading} type={'primary'} htmlType={'submit'}>Save</Button>
        </Col>

      </Row>
    </Form>
  );
};

export default FormCreateLead;
