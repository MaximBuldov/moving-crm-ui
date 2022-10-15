import React, { useState } from 'react';
import { AutoComplete, Col, Empty, Input, Row, Spin } from 'antd';
import { useQuery } from 'react-query';
import { ICustomer } from 'models/customer';
import customersService from 'services/api/customers.service';
import { useDebounce } from 'use-debounce';

const { Option } = AutoComplete;

interface CustomersAutocompleteProps {
  setContacts: (data: ICustomer) => void,
  placeholder: string
}

const CustomersAutocomplete = ({ setContacts, placeholder }: CustomersAutocompleteProps) => {
  const [option, setOption] = useState<string>('');
  const [input, setInput] = useState<string | null>(null);
  const [value] = useDebounce(input, 1000);

  const customersAction = useQuery(['customers', value], () => customersService.fetchMany({
    filters: {
      $and: [{ name: { $contains: value } }]
    }
  }), {
    enabled: !!value
  });

  const onSelect = (value: string, option: any) => {
    setContacts(option.customer);
    setOption(value);
  };
  const onSearch = (value: string) => {
    setInput(value);
    setOption(value);
  };

  return (
    <AutoComplete
      onSelect={onSelect}
      onSearch={onSearch}
      placeholder={placeholder}
      value={option}
    >
      {customersAction.data && customersAction.data.map((el: ICustomer) => (
        <Option key={el.id} customer={el} value={el.attributes.name}>
          <Row justify="space-between">
            <Col span={8}>{el.attributes.name}</Col>
            <Col span={8}>{el.attributes.phones &&el.attributes.phones[0]?.phone}</Col>
            <Col span={8}>{el.attributes.email}</Col>
          </Row>
        </Option>
      ))}
    </AutoComplete>
  );
};

export default CustomersAutocomplete;
