import React from 'react';
import { Row, Col } from 'antd';
import { Button, Input, Select, Table } from 'components/Atoms';

import useList from './useList';

const List = () => {
  const { staffs } = useList();

  if (staffs.status === 'loading') return null;

  return (
    <Col span={24}>
      <Row span="24" gutter="16">
        <Col span="12">Staff</Col>
        <Col span="12">
          <Button>New Staff</Button>
        </Col>
      </Row>
      <br />

      <Row span="24" gutter="16">
        <Col span>
          <Input placeholder="Search staffs" />
        </Col>
        <Col>
          <Select
            fullWidth
            options={[
              { label: 'All', value: '0' },
              { label: 'Active', value: '1' },
              { label: 'Inactive', value: '2' },
            ]}
          />
        </Col>
      </Row>

      <br />
      <Row gutter="16" span="24">
        <Col span="24">
          <Table
            rowKey="id"
            pagination={false}
            dataSource={staffs.data?.items}
            columns={[
              {
                title: 'Fullname',
                dataIndex: 'firstName',
                key: 'firstName',
              },
              {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
              },
              {
                title: 'Status',
                dataIndex: 'isActive',
                key: 'isActive',
              },
            ]}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default List;
