import React from 'react';
import { BackTop as BackTopAntd } from 'antd';
import Icon from 'components/Atoms/Icon';
import { ArrowUpOutlined } from '@ant-design/icons';
import './styles.scss';

const BackTop = () => (
  <BackTopAntd>
    <div className="wrapper-back-top-btn">
      <Icon component={ArrowUpOutlined} />
    </div>
  </BackTopAntd>
);

export default BackTop;
