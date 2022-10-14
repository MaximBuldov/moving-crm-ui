import React, { FC } from 'react';
import { Col, Input, Row, Select, Form } from 'antd';
import GoogleAutocomplete, { GoogleAutocompleteProps } from 'shared/maps/GoogleAutocomplete';

const { Item } = Form;

const FieldsAddress: FC<GoogleAutocompleteProps> = ({ field, setAddress }) => {
  return (
    <Row gutter={16}>
      {/* <Col span={24}>
        <GoogleAutocomplete field={field} setAddress={setAddress} />
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
          <Select placeholder="Property Type" options={PROPERTY_TYPE} />
        </Item>
      </Col>
      <Col span={12}>
        <Item name={[field, 'parkingType']} label="Parking Type">
          <Select placeholder="Parking Type" options={PARKING_TYPE} />
        </Item>
      </Col>
      <Col span={24}>
        <Item name={[field, 'stairs']} label="Stairs">
          <Select placeholder="Stairs" options={STAIRS_COUNT}/>
        </Item>
      </Col>
      <Col span={12}>
        <Item name={[field, 'walkDistance']} label="Walk Distance">
          <Select placeholder="Walk Distance" options={WALK_DISTANCE}/>
        </Item>
      </Col>
      <Col span={12}>
        <Item name={[field, 'elevator']} label="Elevator(s)">
          <Select placeholder="Elevator(s)" options={ELEVATOR} />
        </Item>
      </Col> */}
    </Row>
  );
};

export default FieldsAddress;
