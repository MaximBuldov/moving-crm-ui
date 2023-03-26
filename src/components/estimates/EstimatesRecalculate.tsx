import React from 'react';
import { Button, Col, Row, Switch, Tooltip } from 'antd';
import { CalculatorTwoTone } from '@ant-design/icons';
import s from 'components/opportunities/opportunities.module.scss';

export const EstimatesRecalculate = () => {
  return (
    <Row align="middle" style={{ marginTop: 15 }} className={s['opp-box-shadow']} justify="space-between">
      <Col><Button type="primary">Recalculate</Button></Col>
      <Col>
        <Row align="middle" gutter={16}>
          <Col><Switch /></Col>
          <Col style={{ lineHeight: 1 }}>
            <Tooltip placement="topRight" title="Automatically recalculate estimated charges as you make changes">
              <CalculatorTwoTone style={{ fontSize: 25 }} />
            </Tooltip>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

