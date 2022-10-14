import React from 'react';
import { Button, Form, Input, message, Typography } from 'antd';
import { userStore } from 'stores';
import { useMutation, useQuery } from 'react-query';
import { observer } from 'mobx-react-lite';
import userService from 'services/api/user.service';
import styles from 'layouts/layouts.module.scss';

export interface ILoginForm {
	identifier: string,
	password: string
}

const Login = () => {
  const login = useMutation(userService.login, {
    onSuccess: (token) => {
      userStore.setToken(token);
    },
    onError: (error: Error) => {
      message.error(error.message);
    }
  });

  const user = useQuery('user', userService.me, {
    enabled: !!userStore.token && !userStore.data,
    onSuccess: (data) => {
      localStorage.setItem('company', data.company.id);
      userStore.setUser(data);
      message.success('Success!');
    }
  }
  );

  const onFinish = (values: ILoginForm) => {
    login.mutate(values);
  };

  return (
    <div className={styles['login-page']}>
      <Typography.Title>Welcome!</Typography.Title>
      <Form
        name="login-form"
        onFinish={onFinish}
        size="large"
        layout="vertical"
      >
        <Form.Item
          label="Email or Username"
          name="identifier"
          rules={[{
            required: true,
            message: 'Please input your email or username!'
          }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{
            required: true,
            message: 'Please input your password!'
          }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button loading={login.isLoading || user.isLoading} type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default observer(Login);
