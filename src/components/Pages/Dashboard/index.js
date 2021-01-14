import React from 'react';
import { Button } from 'antd';

import './styles.scss';

const Dashboard = (props) => {
  return (
    <div className="dashboard">
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="link">Link</Button>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
