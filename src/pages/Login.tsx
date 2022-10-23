import { useEffect } from 'react';
import { Button, Form, Input, message, Typography } from 'antd';
import { fieldsStore, userStore } from 'stores';
import { useMutation, useQueries } from 'react-query';
import { observer } from 'mobx-react-lite';
import userService from 'services/single/user.service';
import styles from 'layouts/layouts.module.scss';
import fieldsService from 'services/single/fields.service';
import branchesService from 'services/collections/branches.service';
import managersService from 'services/collections/managers.service';

export interface ILoginForm {
	identifier: string,
	password: string
}

const Login = () => {
  const login = useMutation(userService.login, {
    onSuccess: (data) => {
      userStore.setAuth(data.jwt);
    },
    onError: (error: Error) => {
      message.error(error.message);
    }
  });

  const fields = useQueries([
    { queryKey: ['fields'], queryFn: fieldsService.fetch, enabled: userStore.isAuth },
    { queryKey: ['branches'], queryFn: branchesService.fetchMany, enabled: userStore.isAuth },
    { queryKey: ['managers'], queryFn: managersService.fetchMany, enabled: userStore.isAuth }
  ]);

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
          <Button loading={login.isLoading || fields.some(query => query.isLoading)} type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default observer(Login);
