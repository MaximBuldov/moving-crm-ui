import { useEffect, useMemo } from 'react';
import { Button, Form, Input, message, Typography } from 'antd';
import { fieldsStore, userStore } from 'stores';
import { useMutation, useQuery } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import styles from 'layouts/layouts.module.scss';
import { IAccountTypes, QueryType } from 'models';
import { branchesService, fieldsService, userService, usersService } from 'services';
export interface ILoginForm {
	identifier: string,
	password: string
}

export const Login = observer(() => {
  const login = useMutation([QueryType.USER], userService.login, {
    onSuccess: (data) => {
      userStore.setAuth(data.jwt);
    },
    onError: (error: Error) => {
      message.error(error.message);
    }
  });
  const fieldsActions = useQuery({ 
    queryKey: [QueryType.FIELDS], 
    queryFn: fieldsService.fetch, 
    enabled: userStore.isAuth,
    staleTime: Infinity, 
    onSuccess: ({ data }) => fieldsStore.setData(data.attributes)
  });
  const branchesActions = useQuery([QueryType.BRANCHES], branchesService.fetchMany, 
    { 
      enabled: userStore.isAuth,
      staleTime: Infinity, 
      onSuccess: ({ data }) => fieldsStore.setBranches(data)
    }
  );
  const workersActions = useQuery(
    [QueryType.WORKERS, { accountType: IAccountTypes.MANAGER }],
    () => usersService.fetchMany({
      filters:  { $and: [ { accountType: { $eq: IAccountTypes.MANAGER } } ] }
    }), 
    { 
      enabled: userStore.isAuth,
      staleTime: Infinity, 
      onSuccess: (data) => fieldsStore.setManagers(data)
    }
  );

  const isSuccess = branchesActions.isSuccess && fieldsActions.isSuccess && login.isSuccess && workersActions.isSuccess;
  const isLoading = branchesActions.isLoading && fieldsActions.isLoading && login.isLoading && workersActions.isLoading;

  useEffect(() => {
    if (isSuccess) {
      userStore.setUser(login?.data?.user);
    }
  }, [isSuccess, login?.data]);

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
          <Button 
            loading={isLoading}
            type="primary" htmlType="submit">
              Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

