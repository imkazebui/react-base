import React, { useEffect, useState } from 'react';
import axios from 'utilities/axios';
import { Table, Tag, Select } from 'antd';

const { Option } = Select;

const Detect = () => {
  const [data, setData] = useState([]);

  const getList = async () => {
    const { data } = await axios.get('/detect-face');
    // setData(data);
    console.log('data', data);
    setData(data.data);
  };

  useEffect(() => {
    const interval = setInterval(() => getList(), 5000000000000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleChangeCorrect = (id) => (isCorrect) => {
    axios.put(`/detect-face/${id}`, { isCorrect });
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'image',
      render: (data) => <img alt="img" src={`data:image/png;base64,${data}`} />,
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
      key: 'isCorrect',
      dataIndex: 'isCorrect',
      render: (data, row) => (
        <Select
          defaultValue={data}
          style={{ width: 120 }}
          onChange={handleChangeCorrect(row._id)}
        >
          <Option value="false">InCorrect</Option>
          <Option value="true">Correct</Option>
          <Option value="null" disabled>
            Unknow
          </Option>
        </Select>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} rowKey="_id" />;
};

export default Detect;
