import React from 'react';
import { Col, Input, Row, Select, Form } from 'antd';
import { fieldsStore } from 'stores';
import { GoogleAutocompleteProps, GoogleAutocomplete } from 'shared/maps';
const { Item } = Form;

export const FieldsAddress = ({ field }: GoogleAutocompleteProps) => {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <GoogleAutocomplete field={field} />
      </Col>
      <Col span={12}>
        <Item name={[field, 'propertyName']} label="Property Name">
          <Input placeholder="Property Name" />
        </Item>
      </Col>
      <Col span={12}>
        <Item name={[field, 'unitNumber']} label="Property Number">
          <Input placeholder="Property Number" />
        </Item>
      </Col>
      <Col span={12}>
        <Item name={[field, 'propertyType']} label="Property Type">
          <Select placeholder="Property Type" options={fieldsStore.propertyType} />
        </Item>
      </Col>
      <Col span={12}>
        <Item name={[field, 'parkingType']} label="Parking Type">
          <Select placeholder="Parking Type" options={fieldsStore.parkingType} />
        </Item>
      </Col>
      <Col span={24}>
        <Item name={[field, 'stairs']} label="Stairs">
          <Select placeholder="Stairs" options={fieldsStore.stairsCount}/>
        </Item>
      </Col>
      <Col span={12}>
        <Item name={[field, 'walkDistance']} label="Walk Distance">
          <Select placeholder="Walk Distance" options={fieldsStore.walkDistance}/>
        </Item>
      </Col>
      <Col span={12}>
        <Item name={[field, 'elevator']} label="Elevator(s)">
          <Select placeholder="Elevator(s)" options={fieldsStore.elevator} />
        </Item>
      </Col>
    </Row>
  );
};
