import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, Steps, Typography } from 'antd';
import classNames from 'classnames';
import MaskedInput from 'antd-mask-input';
import { CarOutlined, DeleteOutlined, PieChartOutlined, PlusCircleTwoTone, TeamOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useNavigate } from 'react-router';
import NameAutocomplete from 'shared/forms/fields/NameAutocomplete';
import { IJob } from 'models/job';
import { ICustomer } from 'models/customer';

import FieldsAddress from './fields/FieldsAddress';

const { Step } = Steps;
const { Item, List, useForm } = Form;

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
// - новый opportunity
const FormCreateOpportunity: FC<FormCreateOpportunityProps> = ({ job = null, closeModal }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [availability, setAvailability] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<number | null>(null);
  const [form] = useForm();
  const navigate = useNavigate();
  const stepIsVisible = (step: number) => classNames({ 'step-form-visible': currentStep === step });
  useEffect(() => {
    if (job) {
      const { attributes: { customer, moveDate } } = job;
      form.setFieldsValue({
        ...job.attributes,
        phones: customer?.data.attributes.phones,
        name: customer?.data.attributes.name,
        email: customer?.data.attributes.email,
        moveDate: moment(moveDate, 'YYYY-MM-DD'),
        source: customer?.data.attributes.source
      });
    }
  }, []);

  const setAddress = useCallback((address: string, field: string) => {
    form.setFieldsValue({
      [field]: { address }
    });
  }, []);

  const setContacts = useCallback(({ attributes: { phones, email }, id }: ICustomer) => {
    setUser(id);
    form.setFieldsValue({
      phones, email
    });
  }, []);

  const onFinish = (values: IJob) => {
    // setIsLoading(!isLoading)
    // const jobStatus = 'Opportunity'
    // if (job) {
    // 	dispatch(updateCustomerJob({values, customerId: job.attributes.customer.data.id, jobId: job.id, jobStatus}))
    // } else if (user) {
    // 	dispatch(updateCustomerCreateJob({customerId: user, values, jobStatus}))
    // } else {
    // 	dispatch(createCustomerJob({jobStatus, values}))
    // }
  };
  // .then(() => {
  // 		closeModal()
  // 	res.meta.requestStatus === "fulfilled" && message.success('New opportunity created')
  // 		navigate(`${ESTIMATES_EDIT_ROUTE}/${job.id}`)
  // 	}).finally(() => setIsLoading(!isLoading))
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
          initialValues={{
            phones: [{}]
          }}
        >
          <div className={`step-form ${stepIsVisible(0)}`} >
            <Item name="name" label="Name">
              <NameAutocomplete setContacts={setContacts} />
            </Item>
            <List name="phones">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={16} key={key} align="bottom" justify="space-between">
                      <Col span={12}>
                        <Item
                          {...restField}
                          name={[name, 'phone']}
                          label="Phone Number"
                        >
                          <MaskedInput mask="(111) 111-1111" />
                        </Item>
                      </Col>
                      <Col span={8}>
                        <Item
                          label={'Phone Type'}
                          name={[name, 'phoneType']}
                          {...restField}
                        >
                          {/* <Select placeholder="Phone Type" options={PHONE_TYPE} /> */}
                        </Item>
                      </Col>
                      <Col>
                        <Item>
                          {key === 0 ? (
                            <Button onClick={() => add()} icon={<PlusCircleTwoTone />} type="link" />
                          ) : (
                            <Button onClick={() => remove(name)} icon={<DeleteOutlined />} danger type="link" />
                          )}
                        </Item>
                      </Col>
                    </Row>
                  ))}
                </>
              )}
            </List>
            <Item name="email" label="Email">
              <Input placeholder="email@gmail.com" />
            </Item>
            <Item>
              <Row align="middle" gutter={16}>
                <Col>
                  <Item name="moveDate" label="Move date">
                    <DatePicker onChange={() => setAvailability(!availability)} placeholder="Move Date" />
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
            {/* <Row gutter={16}>
              <Col span={12}>
                <Item name="serviceType" label="Type of service">
                  <Select placeholder={'Type of service'} options={SERVICE_TYPE}/>
                </Item>
              </Col>
              <Col span={12}>
                <Item name="moveSize" label="Move size">
                  <Select placeholder={'Move size'} options={MOVE_SIZE} />
                </Item>
              </Col>
              <Col span={12}>
                <Item name="source" label="Referral Source">
                  <Select placeholder={'Referral Source'} options={SOURCE}/>
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Sales Person"
                  name="manager"
                >
                  <Select placeholder={'Sales Person'} options={SALES_PERSON}/>
                </Item>
              </Col>
            </Row> */}
          </div>
          <div className={`step-form ${stepIsVisible(1)}`} >
            <FieldsAddress field="origin" setAddress={setAddress}/>
          </div>
          <div className={`step-form ${stepIsVisible(2)}`} >
            <FieldsAddress field="destination" setAddress={setAddress} />
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
