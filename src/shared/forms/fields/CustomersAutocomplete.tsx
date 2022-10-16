import React, { useState } from 'react';
import { AutoComplete, Col, FormInstance, Row, Spin } from 'antd';
import { useQuery } from 'react-query';
import { ICustomer } from 'models/customer';
import customersService from 'services/api/customers.service';
import { useDebounce } from 'use-debounce';
import { formatPhoneAction, formattedPhones } from 'utils/formattedPhone';

const { Option } = AutoComplete;

interface CustomersAutocompleteProps {
  placeholder: string,
  form: FormInstance,
  setUser: (args: ICustomer) => void
}

const CustomersAutocomplete = ({ placeholder, form, setUser }: CustomersAutocompleteProps) => {
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
    const { attributes: { phones, email } } = customer;
    setUser(customer);
    if (phones) {
      form.setFieldValue('phones', formattedPhones(phones, formatPhoneAction.FORMAT));
    }
    if (email) {
      form.setFieldValue('email', email);
    }
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
    </Spin>

  );
};

export default CustomersAutocomplete;
