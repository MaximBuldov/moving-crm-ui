import React, { FC } from 'react';
import { Col, Progress, Row, Space } from 'antd';
import { sumBy, groupBy } from 'lodash';
import { getRandomInt } from 'utils/getRandomInt';

interface Data {
	source: string,
	value: number
}

interface Arr {
	source: string,
	count: number,
	sum: number
}

let data: Data[] = [];
let arr: Arr[] = [];
const sources = ['Yelp', 'Facebook', 'Google', 'Instagram', 'Thumbtack', 'HomeAdvisor'];
for (let i = 0; i < 50; i++) {
  data.push({
    source: sources[getRandomInt(5)],
    value: getRandomInt(1000, 300)
  });
}
const totalSum = sumBy(data, el => el.value);
for (const [key, value] of Object.entries(groupBy(data, el => el.source))) {
  arr.push({
    source: key,
    count: value.length,
    sum: sumBy(value, el => el.value)
  });
}
const Referral: FC = () => {

  return (
    <Space size="middle" direction="vertical" style={{ width: '100%' }}>
      {arr.map(el => (
        <div key={el.source}>
          <Row>
            <Col span={12}><b>{el.source}</b></Col>
            <Col>{el.count} moves / ${el.sum}</Col>
          </Row>
          <Progress status="active" percent={Math.round(el.sum / totalSum * 100)} />
        </div>
      ))}
    </Space>
  );
};

export default Referral;
