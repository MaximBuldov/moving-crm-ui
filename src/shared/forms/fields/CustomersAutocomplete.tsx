import React, { useState } from 'react';
import { AutoComplete, Col, FormInstance, Row, Spin } from 'antd';
import { useQuery } from 'react-query';
import { ICustomer } from 'models/customer';
import customersService from 'services/api/customers.service';
import { useDebounce } from 'use-debounce';
import { formatPhoneAction, formattedPhone, formattedPhones } from 'utils/formattedPhone';

const { Option } = AutoComplete;

interface CustomersAutocompleteProps {
  placeholder: string,
  form: FormInstance,
  setUser: (args: ICustomer) => void,
  defaultName?: string
}

const CustomersAutocomplete = ({ placeholder, form, setUser, defaultName }: CustomersAutocompleteProps) => {
  const [input, setInput] = useState<string | null>(null);
  const [value] = useDebounce(input, 1000);

  const customersAction = useQuery(['customers', value], () => customersService.fetchMany({
    filters: {
      $and: [{ name: { $contains: value } }]
    }
  }), {
    enabled: !!value
  });

  const setContacts = (customer: ICustomer) => {
    const { attributes: { phones, email, destination } } = customer;
    setUser(customer);
    phones && form.setFieldValue('phones', formattedPhones(phones, formatPhoneAction.FORMAT));
    email && form.setFieldValue('email', email);
    destination && form.setFieldValue('origin', destination);
  };

  const onSelect = (value: string, option: any) => {
    setContacts(option.customer);
    form.setFieldValue('name', value);
  };
  const onSearch = (value: string) => {
    setInput(value);
    form.setFieldValue('name', value);
  };

  return (
    <Spin spinning={customersAction.isLoading}>
      <AutoComplete
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder={placeholder}
        defaultValue={defaultName && defaultName}
      >
        {customersAction.data.data && customersAction.data.data.map((el: ICustomer) => (
          <Option key={el.id} customer={el} value={el.attributes.name}>
            <Row justify="space-between">
              <Col span={8}>{el.attributes.name}</Col>
              <Col span={8}>{el.attributes.phones && formattedPhone(el.attributes.phones[0]?.phone)}</Col>
              <Col span={8}>{el.attributes.email}</Col>
            </Row>
          </Option>
        ))}
      </AutoComplete>
    </Spin>

  );
};

export default CustomersAutocomplete;
