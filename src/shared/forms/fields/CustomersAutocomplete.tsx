import { AutoComplete, Col, Form, Row, Spin } from 'antd';
import { useCustomerSearchByName } from 'hooks';
import { ICustomer } from 'models';
import { formattedPhones, formatPhoneAction, formattedPhone } from 'utils';
const { Option } = AutoComplete;

interface CustomersAutocompleteProps {
  placeholder: string,
  setUser: (args: ICustomer) => void,
  defaultName?: string
}

export const CustomersAutocomplete = ({ placeholder, setUser, defaultName }: CustomersAutocompleteProps) => {
  const { customersAction, setInput } = useCustomerSearchByName();
  const form = Form.useFormInstance();

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
        {customersAction?.data?.data && customersAction?.data?.data?.map((el: ICustomer) => (
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

