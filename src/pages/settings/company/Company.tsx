import { LockOutlined } from '@ant-design/icons';
import { Button, Card, Col, Empty, Form, Input, message, Row, Select } from 'antd';
import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { companyService } from 'services';
import { unformattedPhone, formattedPhone } from 'utils';
import { QueryType } from 'models';

const { Item, useForm } = Form;

export function Company() {
  const [form] = useForm();
  const settingsGet = useQuery({
    queryKey: [QueryType.COMPANY],
    queryFn: companyService.fetch
  });
  const settingsUpdate = useMutation({
    mutationKey: [QueryType.COMPANY],
    mutationFn: companyService.update,
    onSuccess: () => {
      message.success('Company information has been updated');
    },
    onError: () => {
      message.error('Error. Please try again');
    }
  });

  const onFinish = (values: any) => {
    values.phone = unformattedPhone(values.phone);
    settingsUpdate.mutate(values);
  };

  return (
    <Card style={{ maxWidth: '800px' }} loading={settingsGet.isPending}>
      {settingsGet.isSuccess ? (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          size="large"
          initialValues={{
            ...settingsGet?.data?.data?.attributes,
            phone: formattedPhone(settingsGet?.data?.data?.attributes.phone),
            smsPhone: formattedPhone(settingsGet?.data?.data?.attributes.smsPhone)
          }}
        >
          <Row align="top" gutter={16}>
            <Col span={12}>
              <Item name="phone" label="Phone Number" normalize={(val: string) => formattedPhone(val)} rules={[{ required: true }]}>
                <Input placeholder="(000) 000-0000" />
              </Item>
            </Col>
            <Col span={12}>
              <Item name="smsPhone" label="System SMS Number">
                <Input disabled addonBefore={<LockOutlined />} />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="stateLicense"
                label="State License Number (optionally incl. label)"
                help="Example: 'DMV: 123456789'"
                rules={[{ required: true }]}
              >
                <Input placeholder="State License Number" />
              </Item>
            </Col>
            <Col span={12}>
              <Item name="timeZone" label="Time Zone">
                <Select placeholder="Time Zone" />
              </Item>
            </Col>
            <Col span={12}>
              <Item name={['address', 'street']} label="Street" rules={[{ required: true }]}>
                <Input placeholder="Street" />
              </Item>
            </Col>
            <Col span={12}>
              <Item name={['address', 'city']} label="City" rules={[{ required: true }]}>
                <Input placeholder="City" />
              </Item>
            </Col>
            <Col span={12}>
              <Item name={['address', 'state']} label="State" rules={[{ required: true }]}>
                <Input placeholder="State" />
              </Item>
            </Col>
            <Col span={12}>
              <Item name={['address', 'zipCode']} label="Zip code" rules={[{ required: true }]}>
                <Input placeholder="Zip code" />
              </Item>
            </Col>
            <Col span={24}>
              <Item name="website" label="Website Address" rules={[{ required: true }]}>
                <Input placeholder="https://" />
              </Item>
            </Col>
          </Row>
          <Button loading={settingsUpdate.isPending} type="primary" htmlType="submit">Save changes</Button>
        </Form>
      ) : (
        <Empty />
      )}
    </Card>
  );
}
