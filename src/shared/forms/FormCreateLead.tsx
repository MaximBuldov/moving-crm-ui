import { useState } from 'react';
import { Button, Col, DatePicker, Divider, Form, Input, message, Row, Select, Typography } from 'antd';
import moment from 'moment';
import GoogleAutocomplete from 'shared/maps/GoogleAutocomplete';
import { RangePickerProps } from 'antd/lib/date-picker';
import { fieldsStore, userStore } from 'stores';
import { useMutation } from 'react-query';
import customersService from 'services/api/customers.service';
import { ICustomer } from 'models/customer';
import jobsService from 'services/api/jobs.service';
import { JobsStatus } from 'models/fields';
import { formatPhoneAction, formattedPhones } from 'utils/formattedPhone';

import CustomersAutocomplete from './fields/CustomersAutocomplete';
import Phones from './fields/Phones';

const { Item, List } = Form;

interface FormCreateLeadProps {
  closeModal: () => void
}

const FormCreateLead = ({ closeModal }: FormCreateLeadProps) => {
  const [form] = Form.useForm();
  const [user, setUser] = useState<ICustomer | null>(null);
  const jobAction = useMutation(jobsService.createOne, {
    onSuccess: () => {
      message.success('New lead created');
      closeModal();
    },
    onError: (error: Error) => {
      message.error(error.message);
    }
  });
  const customerAction = useMutation(customersService.createOne, {
    onSuccess: (customer, data) => createNewJob(customer, data),
    onError: (error: Error) => {
      message.error(error.message);
    }
  });

  function createNewJob({ attributes, id }: ICustomer, data: any) {
    const jobNumber = attributes.jobs ? +attributes.jobs.data.length + 1 : 1;
    jobAction.mutate({
      ...data,
      customer: id,
      jobStatus: JobsStatus.NEW_LEAD,
      jobNumber: `${userStore.data?.company?.id}${id}-${jobNumber}`
    });
  }

  const onFinish = (values: any) => {
    const phones = formattedPhones(values.phones, formatPhoneAction.UNFORMAT);
    const updatedValues = { ...values, phones };
    if (user) {
      createNewJob(user, updatedValues);
    } else {
      customerAction.mutate(updatedValues);
    }
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < moment().subtract(1, 'days');
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
        <Col span={24}>
          <Item
            label="Customer Name"
            name="name"
            rules={[{ required: true }]}
          >
            <CustomersAutocomplete 
              placeholder="Customer name"
              form={form}
              setUser={(customer) => setUser(customer)}
            />
          </Item>
        </Col>
        <Col span={8}>
          <Item
            label="Sales Person"
            name="manager"
            rules={[{ required: true }]}
          >
            <Select placeholder={'Sales Person'} options={fieldsStore.salesPerson}/>
          </Item>
        </Col>
        <Col span={8}>
          <Item
            label="Branch"
            name="branch"
            rules={[{ required: true }]}
          >
            <Select placeholder={'Branch'} options={fieldsStore.data.branches} />
          </Item>
        </Col>
        <Col span={8}>
          <Item
            label="Referral Source"
            name="source"
          >
            <Select placeholder={'Referral Source'} options={fieldsStore.data.source}/>
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
        
        <List name="phones">
          {(fields) => <Phones form={form} fields={fields} />}
        </List>
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
            <Select placeholder={'Move Size'} options={fieldsStore.moveSize} />
          </Item>
        </Col>
        <Col span={8}>
          <Item
            label="Service Type"
            name="serviceType"
          >
            <Select placeholder={'Service Type'} options={fieldsStore.data.serviceType} />
          </Item>
        </Col>
        <Col span={12}>
          <GoogleAutocomplete form={form} field="origin" />
        </Col>
        <Col span={12}>
          <GoogleAutocomplete form={form} field="destination" />
        </Col>
        <Col span={24}>
          <Item label={'Notes'} name={'notes'}>
            <Input.TextArea rows={3} placeholder={'Notes'}/>
          </Item>
        </Col>
        <Col>
          <Button onClick={closeModal} style={{ marginRight: 16 }}>Cancel</Button>
          <Button loading={customerAction.isLoading || jobAction.isLoading} type={'primary'} htmlType={'submit'}>Save</Button>
        </Col>

      </Row>
    </Form>
  );
};

export default FormCreateLead;
