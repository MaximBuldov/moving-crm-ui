import React, { Fragment, useCallback } from 'react';
import { Button, Col, DatePicker, Divider, Form, Input, message, Row, Select, Typography } from 'antd';
import MaskedInput from 'antd-mask-input';
import moment from 'moment';
import GoogleAutocomplete from 'shared/maps/GoogleAutocomplete';
import { RangePickerProps } from 'antd/lib/date-picker';
import { fieldsStore, userStore } from 'stores';
import { useMutation } from 'react-query';
import customersService from 'services/api/customers.service';
import { ICustomer } from 'models/customer';
import jobsService from 'services/api/jobs.service';
import { JobsStatus } from 'models/fields';

const { Item, List } = Form;

interface FormCreateLeadProps {
  closeModal: () => void
}

const FormCreateLead = ({ closeModal }: FormCreateLeadProps) => {
  const [form] = Form.useForm();
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
    onSuccess: (customer, data) => {
      jobAction.mutate({
        ...data,
        customer: customer.id,
        jobStatus: JobsStatus.NEW_LEAD,
        jobNumber: `${userStore.data?.company?.id}${customer.id}-1`
      });
    },
    onError: (error: Error) => {
      message.error(error.message);
    }
  });

  const onFinish = (values: ICustomer) => {
    customerAction.mutate(values);
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < moment().subtract(1, 'days');
  };

  const setAddress = useCallback((address: string, field: string) => {
    form.setFieldsValue({
      [field]: { address }
    });
  }, [form]);

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
          >
            <Input  placeholder="Customer Name"/>
          </Item>
        </Col>
        <Col span={8}>
          <Item
            label="Sales Person"
            name="manager"
          >
            <Select placeholder={'Sales Person'} options={fieldsStore.salesPerson}/>
          </Item>
        </Col>
        <Col span={8}>
          <Item
            label="Branch"
            name="branch"
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
            <Input  placeholder="Email"/>
          </Item>
        </Col>
        <List name="phones">
          {(fields) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Fragment key={key}>
                  <Col span={8}>
                    <Item
                      {...restField}
                      label="Phone"
                      name={[name, 'phone']}
                    >
                      <MaskedInput placeholder="Phone" mask="(000) 000-0000"/>
                    </Item>
                  </Col>
                  <Col span={8}>
                    <Item
                      {...restField}
                      label="Phone Type"
                      name={[name, 'phoneType']}
                    >
                      <Select placeholder={'Phone Type'} options={fieldsStore.phoneType}/>
                    </Item>
                  </Col>
                </Fragment>
              ))}
            </>
          )}
        </List>
        <Col span={8}>
          <Item
            label="Move Date"
            name="moveDate"
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
          <GoogleAutocomplete setAddress={setAddress} field="origin" />
        </Col>
        <Col span={12}>
          <GoogleAutocomplete setAddress={setAddress} field="destination" />
        </Col>
        <Col span={24}>
          <Item label={'Notes'} name={'notes'}>
            <Input.TextArea rows={3} placeholder={'Notes'}/>
          </Item>
        </Col>
        <Col>
          <Button onClick={closeModal} style={{ marginRight: 16 }}>Cancel</Button>
          <Button loading={customerAction.isLoading} type={'primary'} htmlType={'submit'}>Save</Button>
        </Col>

      </Row>
    </Form>
  );
};

export default FormCreateLead;
