import React, { FC } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Home: FC = () => {
  return (
    <div className="home">
      <div>
        <div className="home-title">CRM</div>
        <Button type="primary" size="large"><Link to="/login">Login</Link></Button>
      </div>
    </div>
  );
};

export default Home;
