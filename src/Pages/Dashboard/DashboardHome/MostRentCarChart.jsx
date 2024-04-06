import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';

const MostRentCarChart = () => {
  const data = [
    {
      type: 'Aesthetics ',
      value: 25,
    },
    {
      type: 'Cuisine and Pastry ',
      value: 27,
    },
    
    {
      type: 'Decorations & Themes',
      value: 18,
    },
    {
      type: 'Fashion',
      value: 15,
    },
    {
      type: 'Entertainment ',
      value: 10,
    }
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 20,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
    color: ['#2c4b4d', '#93d8ff', '#84c2e6', '#6C57EC', '#fbdd65'],
  };
  return <Pie {...config} style={{height:"300px"}}/>;
};


export default MostRentCarChart;