import React, { useState } from 'react';
import { AutoComplete, Col, Row } from 'antd';
import { $apiGet } from 'services/http';

const { Option } = AutoComplete;

const NameAutocomplete = ({ setContacts }) => {
  const [options, setOptions] = useState([]);

  const onSelect = (value, option) => {
    setContacts(options[option.index]);
  };
  const onSearch = (value) => {
    debounced(value);
  };

  //add debounce
  const debounced = (value) => {
    $apiGet('customers', {
      params: {
        filters: {
          $and: [{ name: { $contains: value } }]
        },
        populate: ['phones']
      }
    }).then(res => setOptions(res.data.data));
  };
  return (
    <AutoComplete
      onSelect={onSelect}
      onSearch={onSearch}
      placeholder="Name"
    >
      {options && options.map((el, index) => {
        return (
          <Option key={el.id} index={index} value={el.attributes.name}>
            <Row justify="space-between">
              <Col span={8}>{el.attributes.name}</Col>
              <Col span={8}>{el.attributes.phones[0].phone}</Col>
              <Col span={8}>{el.attributes.email}</Col>
            </Row>
          </Option>
        );
      }
      )}
    </AutoComplete>
  );
};

export default NameAutocomplete;
