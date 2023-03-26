import React, { FC } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from 'layouts/layouts.module.scss';

export const Home: FC = () => {
  return (
    <div className={styles['home']}>
      <div>
        <div className={styles['home-title']}>CRM</div>
        <Button type="primary" size="large"><Link to="/login">Login</Link></Button>
      </div>
    </div>
  );
};

