import { InboxOutlined, LeftOutlined, PercentageOutlined } from '@ant-design/icons';
import { Button, Card, CardProps, Checkbox, Col, Form, Input, InputNumber, message, Row, Space, Typography, Upload } from 'antd';
import { observer } from 'mobx-react-lite';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { branchesService } from 'services';
import { unformattedPhone, formattedPhone } from 'utils';

const { Item, useForm } = Form;

export const EditBranch = observer(() => {
  const { id } = useParams<{ id: any }>();
  const navigate = useNavigate();
  const [form] = useForm();
  const queryClient = useQueryClient();
  const getBranch = useQuery(['branches', { id }], () => branchesService.fetchOne(id), {
    onSuccess: (data: any) => {
      form.setFieldsValue(data.attributes);
    }
  });
  const updateBranch = useMutation(branchesService.updateOne, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['branches', { id: data.id }], { ...variables.data, id: data.id });
      message.success('Branch updated!');
    }
  });

  const cardProps: CardProps = {
    size: 'small',
    loading: getBranch.isLoading
  };

  const onFinish = (data: any) => {
    data.phone = unformattedPhone(data.phone);
    updateBranch.mutate({ id, data });
  };

  return (
    <Space style={{ maxWidth: 800 }} direction="vertical" size="large">
      <Row align="middle" gutter={24}>
        <Col>
          <Button type="primary" icon={<LeftOutlined />} onClick={() => navigate(-1)} />
        </Col>
        <Col>
          <Typography.Title style={{ marginBottom: 0 }} level={2}>
            Edit branch
          </Typography.Title>
        </Col>
      </Row>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Space direction="vertical" size="large">
          <Card title="Branch info" {...cardProps}>
            <Row align="top" gutter={16}>
              <Col span={12}>
                <Item name="label" label="Name" rules={[{ required: true }]}>
                  <Input placeholder="Branch name" />
                </Item>
              </Col>
              <Col span={12}>
                <Item name="dispatchLocation" label="Dispatch Location" rules={[{ required: true }]}>
                  <Input />
                </Item>
              </Col>
            </Row>
          </Card>
          <Card title="Mailing address (overrides Company address)" {...cardProps}>
            <Row align="top" gutter={16}>
              <Col span={12}>
                <Item name={['mailingAddress', 'street']} label="Address">
                  <Input placeholder="Street" />
                </Item>
              </Col>
              <Col span={12}>
                <Item name={['mailingAddress', 'city']} label="City">
                  <Input placeholder="City" />
                </Item>
              </Col>
              <Col span={12}>
                <Item name={['mailingAddress', 'state']} label="State">
                  <Input placeholder="State" />
                </Item>
              </Col>
              <Col span={12}>
                <Item name={['mailingAddress', 'zipCode']} label="Zip Code">
                  <Input placeholder="Zip Code" />
                </Item>
              </Col>
            </Row>
          </Card>
          <Card title="Taxes" {...cardProps}>
            <Row align="top" gutter={16}>
              <Col span={24}>
                <Item name="salesTaxRate" label="Sales Tax Rate" rules={[{ required: true }]}>
                  <InputNumber
                    min={0}
                    max={100}
                    addonBefore={<PercentageOutlined />}
                    placeholder="Sales Tax Rate"
                    style={{ width: '100%' }}
                  />
                </Item>
              </Col>
              <Col span={8}>
                <Item name={['taxes', 'materials']} valuePropName="checked">
                  <Checkbox>Include Materials</Checkbox>
                </Item>
              </Col>
              <Col span={8}>
                <Item name={['taxes', 'valuation']} valuePropName="checked">
                  <Checkbox>Include Valuation</Checkbox>
                </Item>
              </Col>
              <Col span={8}>
                <Item name={['taxes', 'labor']} valuePropName="checked">
                  <Checkbox>Include Labor</Checkbox>
                </Item>
              </Col>
              <Col span={8}>
                <Item name={['taxes', 'services']} valuePropName="checked">
                  <Checkbox>Include Services</Checkbox>
                </Item>
              </Col>
              <Col span={8}>
                <Item name={['taxes', 'fees']} valuePropName="checked">
                  <Checkbox>Include Fees</Checkbox>
                </Item>
              </Col>
            </Row>
          </Card>
          <Card title="Override logo" {...cardProps}>
            <Item name="logo">
              <Upload.Dragger>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Logo must be a PNG or JPG file.</p>
              </Upload.Dragger>
            </Item>
          </Card>
          <Card title="Override branding" {...cardProps}>
            <Row align="top" gutter={16}>
              <Col span={12}>
                <Item name="companyName" label="Company name">
                  <Input placeholder="Company name" />
                </Item>
              </Col>
              <Col span={12}>
                <Item name="phone" label="Phone" normalize={(val: string) => formattedPhone(val)}>
                  <Input placeholder="Phone" />
                </Item>
              </Col>
              <Col span={12}>
                <Item name="primaryColor" label="Primary color">
                  <Input addonBefore="#" />
                </Item>
              </Col>
              <Col span={12}>
                <Item name="website" label="Website address">
                  <Input placeholder="https://" />
                </Item>
              </Col>
              <Col span={12}>
                <Item name="stateLicenseNumber" label="State License Number (optionally incl. label)" help="Example: 'DMV: 123456789'">
                  <Input placeholder="State License Number" />
                </Item>
              </Col>
            </Row>
          </Card>
          <Card title="Override social media" {...cardProps}>
            <Item name={['social', 'google']} label="Google url">
              <Input placeholder="Google url" />
            </Item>
            <Item name={['social', 'yelp']} label="Yelp url">
              <Input placeholder="Yelp url" />
            </Item>
            <Item name={['social', 'facebook']} label="Facebook url">
              <Input placeholder="Facebook url" />
            </Item>
            <Item name={['social', 'thumbtack']} label="Thumbtack url">
              <Input placeholder="Thumbtack url" />
            </Item>
          </Card>
          <Button loading={updateBranch.isLoading} size="large" type="primary" htmlType="submit">Save changes</Button>
        </Space>
      </Form>
    </Space>
  );
});

