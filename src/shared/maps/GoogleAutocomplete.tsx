import React, { FC } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Input, Form, Skeleton } from 'antd';
import { useGoogleMaps } from 'hooks/useGoogleMaps';

export interface GoogleAutocompleteProps {
	setAddress: (address: string, field: string)  => void,
	field: string
}

const GoogleAutocomplete: FC<GoogleAutocompleteProps> = ({ setAddress, field }) => {
  const { map, isLoaded, onLoad, onUnmount, loadError } = useGoogleMaps();

  const onPlaceChanged = () => {
    if (map !== null) {

      setAddress(map.getPlace()?.formatted_address, field);
    }
  };
  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  if (loadError) {
    return (
      <Form.Item
        name={[field, 'address']}
        label={`${capitalize(field)} address`}
      >
        <Input placeholder="Enter address"/>
      </Form.Item>
    );
  }

  return isLoaded ? (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={() => onPlaceChanged()}
      onUnmount={onUnmount}
    >
      <Form.Item
        name={[field, 'address']}
        label={`${capitalize(field)} address`}
      >
        <Input placeholder="Search address..."/>
      </Form.Item>
    </Autocomplete>
  ) : <Skeleton paragraph={{ rows: 1 }} active />;
};

export default GoogleAutocomplete;
