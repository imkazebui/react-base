import React, { useEffect, useState } from 'react';
import axios from 'utilities/axios';
import { Table, Tag } from 'antd';

const Detect = () => {
  const [data, setData] = useState([]);

  const getList = async () => {
    const { data } = await axios.get('/detect-face');
    // setData(data);
    console.log('data', data);
    setData(data.data);
  };

  useEffect(() => {
    getList();
  }, []);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'image',
    },
    {
      title: 'Detect',
      key: 'isStranger',
      dataIndex: 'isStranger',
      render: (data) => (
        <Tag color={data ? 'red' : 'blue'}>{data ? 'Stranger' : 'Family'}</Tag>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'DateTime',
      dataIndex: 'dateTime',
      key: 'dateTime',
    },
    {
      title: 'Node',
      dataIndex: 'node',
      key: 'node',
    },

    {
      title: 'Correct',
      key: 'correct',
    },
  ];

  return <Table dataSource={data} columns={columns} rowKey="_id" />;
};

export default Detect;
