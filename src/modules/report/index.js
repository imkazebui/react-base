import React, { useEffect, useState } from 'react';
import axios from 'utilities/axios';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Report = ({ isMobile }) => {
  const [data, setData] = useState([
    {
      name: 'Correct',
      value: 0,
    },
    {
      name: 'InCorrect',
      value: 0,
    },
  ]);

  const getList = async () => {
    const { data } = await axios.get('/detect-face');
    const dt = data.data;

    let correct = 0;
    let incorrect = 0;

    dt.forEach((d) => {
      if (d.isCorrect === 'null') return;
      if (d.isCorrect == 'true') {
        correct += 1;
      } else {
        incorrect += 1;
      }
    });

    setData([
      {
        name: 'Correct',
        value: correct,
      },
      {
        name: 'InCorrect',
        value: incorrect,
      },
    ]);
  };

  useEffect(() => {
    getList();
  }, []);

  const styles = isMobile
    ? { width: '100vw', height: '100vh' }
    : { width: '400px', height: '200px' };

  console.log('isMobile', isMobile);

  return (
    <div style={styles}>
      <h1>Report</h1>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Tooltip />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            startAngle={-270}
            endAngle={90}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Report;