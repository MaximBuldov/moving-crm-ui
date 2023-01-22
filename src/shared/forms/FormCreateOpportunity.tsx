import { FC, useState } from 'react';
import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, Steps, Typography } from 'antd';
import classNames from 'classnames';
import { CarOutlined, PieChartOutlined, TeamOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import CustomersAutocomplete from 'shared/forms/fields/CustomersAutocomplete';
import { IJob } from 'models/job';
import { fieldsStore } from 'stores';
import s from 'shared/forms/form.module.scss';
import { RangePickerProps } from 'antd/lib/date-picker';
import useJobCustomerApi from 'hooks/useJobCustomerApi';
import { JobsStatus } from 'models/fields';
import { formatPhoneAction, formattedPhones } from 'utils/formattedPhone';
import { fieldNames } from 'stores/fieldsStore';

import Phones from './fields/Phones';
import FieldsAddress from './fields/Address';

const { Step } = Steps;
const { Item, List, useForm } = Form;
const CN = 'create-opportunity';

interface FormCreateOpportunityProps {
	job?: IJob,
	closeModal: () => void
}

const steps = [
  {
    title: 'Step 1',
    subtitle: 'Personal Info'
  },
  {
    title: 'Step 2',
    subtitle: 'Origin'
  },
  {
    title: 'Step 3',
    subtitle: 'Destination'
  }
];

//TODO:
// - загруженность на выбранную дату
const FormCreateOpportunity: FC<FormCreateOpportunityProps> = ({ job = null, closeModal }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [availability, setAvailability] = useState<boolean>(false);
  const [form] = useForm();
  const { onFinish, setUser, isLoading } = useJobCustomerApi(JobsStatus.OPPORTUNITY, closeModal, job?.id, job?.attributes.customer?.data.id );

  const stepIsVisible = (step: number) => classNames({ 'step-form-visible': currentStep === step });

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().subtract(1, 'days');
  };

  const initialValues = () => {
    if (job) {
      const { attributes } = job;
      return {
        ...attributes,
        ...attributes.customer?.data.attributes,
        phones: formattedPhones(attributes.customer?.data.attributes.phones, formatPhoneAction.FORMAT),
        manager: attributes.manager?.data.id,
        moveDate: dayjs(attributes.moveDate, 'YYYY-MM-DD')
      };
    } else {
      return {
        phones: [{}]
      };
    }
  };
  
  return (
    <Row>
      <Col style={{ borderRight: '1px solid rgba(0, 0, 0, 0.06)', paddingRight: 24 }} span={8}>
        <div>Create</div>
        <Typography.Title level={3}>Opportunity</Typography.Title>
        <Divider />
        <Steps current={currentStep} direction="vertical">
          {steps.map(item => (
            <Step subTitle={item.subtitle} key={item.title} title={item.title} />
          ))}
        </Steps>
      </Col>
      <Col style={{ paddingLeft: 24 }} span={16}>
        <Form
          form={form}
          className="formItemWithoutPadding"
          layout="vertical"
          size="large"
          onFinish={onFinish}
          initialValues={initialValues()}
        >
          <div className={classNames(s[`${CN}__step-form`], s[`${stepIsVisible(0)}`])}>
            <Item name="name" label="Name" rules={[{ required: true }]}>
              <CustomersAutocomplete
                placeholder="Name"
                setUser={(customer) => setUser(customer)}
                defaultName={job?.attributes.customer?.data.attributes.name}
              />
            </Item>
            <List name="phones">
              {(fields, actions) => <Phones form={form} fields={fields} actions={actions} />}  
            </List>
            <Item name="email" label="Email">
              <Input placeholder="email@gmail.com" />
            </Item>
            <Item>
              <Row align="middle" gutter={16}>
                <Col>
                  <Item name="moveDate" label="Move date">
                    <DatePicker disabledDate={disabledDate} onChange={() => setAvailability(!availability)} placeholder="Move Date" />
                  </Item>
                </Col>
                <Col>{
                  availability ? (
                    <Row gutter={8}>
                      <Col><PieChartOutlined /> 0%</Col>
                      <Col><CarOutlined /> 7 / 7</Col>
                      <Col><TeamOutlined /> 1 / 1</Col>
                      <Col><TeamOutlined /> 43 /43</Col>
                    </Row>
                  ) : 'Choose a move date to see availability'
                }</Col>
              </Row>
            </Item>
            <Row gutter={16}>
              <Col span={12}>
                <Item name="serviceType" label="Type of service">
                  <Select placeholder={'Type of service'} fieldNames={fieldNames} options={fieldsStore.data?.serviceType}/>
                </Item>
              </Col>
              <Col span={12}>
                <Item name="moveSize" label="Move size">
                  <Select placeholder={'Move size'} fieldNames={fieldNames} options={fieldsStore.data?.moveSize} />
                </Item>
              </Col>
              <Col span={12}>
                <Item name="source" label="Referral Source">
                  <Select placeholder={'Referral Source'} fieldNames={fieldNames} options={fieldsStore.data?.source}/>
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Sales Person"
                  name="manager"
                >
                  <Select placeholder={'Sales Person'} options={fieldsStore.managers}/>
                </Item>
              </Col>
            </Row>
          </div>
          <div className={classNames(s[`${CN}__step-form`], s[`${stepIsVisible(1)}`])}>
            <FieldsAddress field="origin" />
          </div>
          <div className={classNames(s[`${CN}__step-form`], s[`${stepIsVisible(2)}`])}>
            <FieldsAddress field="destination" />
          </div>
          <Divider />
          <Row justify="space-between">
            <Col>
              <Button type="link" size="large" onClick={closeModal}>Cancel</Button>
              {currentStep > 0 && (
                <Button type="primary" onClick={() => setCurrentStep(currentStep - 1)} size="large">Back</Button>
              )}
            </Col>
            <Col>
              <Button loading={isLoading} htmlType="submit" type={currentStep !== steps.length - 1 ? 'link': 'primary'} size="large">Save & Close</Button>
              {currentStep !== steps.length - 1 && (
                <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)} size="large">Next</Button>
              )}
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default FormCreateOpportunity;