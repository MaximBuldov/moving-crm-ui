import React, { FC } from 'react';
import { Bar, Tooltip, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import moment from 'moment';

const JobRevenue: FC = () => {

  let data = [];
  for (let i = 1; i < 31; i++) {
    data.push({
      name: `${moment().format('MMMM')} ${i}`,
      value: Math.floor(Math.random() * 8000)
    });
  }

  return (
    <ResponsiveContainer height={300}>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(val) => `$${val}`}/>
        <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
        <Bar dataKey="value" fill="#1890ff" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default JobRevenue;
