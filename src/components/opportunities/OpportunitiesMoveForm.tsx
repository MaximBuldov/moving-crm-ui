import React, { FC } from 'react';
import { Col, DatePicker, Form, Row, Select } from 'antd';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { IJob } from 'models/job';
import jobsService from 'services/collections/jobs.service';
import { fieldsStore } from 'stores';
import { fieldNames } from 'stores/fieldsStore';
import dayjs from 'dayjs';

const { Item } = Form;

interface OpportunitiesMoveFormProps {
	job: IJob
}

const OpportunitiesMoveForm: FC<OpportunitiesMoveFormProps> = (props) => {
  const { attributes: { customer, serviceType, moveDate, manager, moveSize }, id } = props.job;
  const [form] = Form.useForm();
  const { mutate } = useMutation(jobsService.updateOne);
  const onValuesChange = (data: any) => {
    mutate({ id, data });
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={onValuesChange}
      initialValues={{
        branch: 'San Diego',
        source: customer?.data && customer?.data.attributes.source,
        estimator: 'Unassigned',
        serviceType,
        moveDate: dayjs(moveDate, 'YYYY-MM-DD')
      }}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Item label="Service Type" name="serviceType">
            <Select
              style={{ color: '#1890ff' }}
              bordered={false}
              size="small"
              options={fieldsStore.data?.serviceType}
              fieldNames={fieldNames}
            />
          </Item></Col>
        <Col span={8}>
          <Item label="Service Date" name="moveDate">
            <DatePicker style={{ color: '#1890ff' }} bordered={false} size="small" />
          </Item>
        </Col>
        <Col span={8}><Item label="Quote Number"><Link to={`/estimates/edit/${id}`}>{id}</Link></Item></Col>
        <Col span={8}>
          <Item label="Branch" name="branch">
            <Select style={{ color: '#1890ff' }} bordered={false} size="small" options={fieldsStore.branches} />
          </Item>
        </Col>
        <Col span={8}>
          <Item label="Source" name="source">
            <Select style={{ color: '#1890ff' }} bordered={false} size="small" fieldNames={fieldNames} options={fieldsStore.data?.source} />
          </Item>
        </Col>
        <Col span={8}><Item label="Assigned To">
          {manager?.data.attributes.fullName}
        </Item></Col>
        <Col span={8}>
          <Item label="Estimator" name="estimator">
            <Select placeholder="Unassigned" style={{ color: '#1890ff' }} bordered={false} size="small" options={fieldsStore.managers} />
          </Item>
        </Col>
        <Col span={8}><Item label="Move size">{moveSize}</Item></Col>
      </Row>
    </Form>
  );
};

export default OpportunitiesMoveForm;
