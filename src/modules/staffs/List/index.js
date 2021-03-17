import React from 'react';
import { Row, Col } from 'antd';
import { Button, Input, Select, Table } from 'components/Atoms';

const List = () => {
  return (
    <Col>
      <Row>
        <Col>Staff</Col>
        <Col>
          <Button>New Staff</Button>
        </Col>
      </Row>
      <Row>
        <Col>
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
      <Row>
        <Table
          dataSource={[
            {
              key: '1',
              name: 'Mike',
              age: 32,
              address: '10 Downing Street',
            },
            {
              key: '2',
              name: 'John',
              age: 42,
              address: '10 Downing Street',
            },
          ]}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Age',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
            },
          ]}
        />
      </Row>
    </Col>
  );
};

export default List;
