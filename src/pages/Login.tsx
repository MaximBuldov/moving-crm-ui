import { useEffect } from 'react';
import { Button, Form, Input, message, Typography } from 'antd';
import { fieldsStore, userStore } from 'stores';
import { useMutation, useQueries } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import styles from 'layouts/layouts.module.scss';
import { IAccountTypes } from 'models';
import { branchesService, fieldsService, userService, usersService } from 'services';
export interface ILoginForm {
	identifier: string,
	password: string
}

export const Login = observer(() => {
  const login = useMutation(userService.login, {
    onSuccess: (data) => {
      userStore.setAuth(data.jwt);
    },
    onError: (error: Error) => {
      message.error(error.message);
    }
  });

  const fields = useQueries({
    queries: [
      { queryKey: ['fields'], queryFn: fieldsService.fetch, enabled: userStore.isAuth, staleTime: Infinity },
      { queryKey: ['branches'], queryFn: branchesService.fetchMany, enabled: userStore.isAuth, staleTime: Infinity },
      { queryKey: ['managers'], queryFn: () => usersService.fetchMany({
        filters:  { $and: [
          { accountType: { $eq: IAccountTypes.MANAGER } }
        ] }
      }), enabled: userStore.isAuth, staleTime: Infinity }
    ]
  });

  useEffect(() => {
    if (fields.every(query => query.isSuccess && userStore.isAuth)) {
      userStore.setUser(login?.data?.user);
      fieldsStore.setData(fields[0].data.data.attributes);
      fieldsStore.setBranches(fields[1].data.data);
      fieldsStore.setManagers(fields[2].data);
    }
  }, [fields, login.data]);

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
          <Button loading={login.isLoading || fields.some(query => query.isFetching)} type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
});

