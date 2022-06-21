import React from 'react';
import { Spin as SpinAntd } from 'antd';

import './styles.scss';

const Spin = () => <SpinAntd />;

export default Spin;

// eslint-disable-next-line react/display-name
const loadingWrapper = (className) => () =>
  (
    <div className={className}>
      <Spin />
    </div>
  );

export const LoadingScreen = loadingWrapper('loading-screen');
