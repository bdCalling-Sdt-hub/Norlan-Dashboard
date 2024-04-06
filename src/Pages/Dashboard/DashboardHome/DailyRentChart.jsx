import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';

const data = [
 
  {
    time: '1',
    amount:50
  },
  {
    time: '2',
    amount:20
  },
  {
    time: '3',
    amount:40
  },
  {
    time: '4',
    amount:30
  },
  {
    time: '5',
    amount:60
  },
  {
    time: '6',
    amount:100
  },
  {
    time: '7',
    amount:25
  },
  {
    time: '8',
    amount:50
  },
  {
    time: '9',
    amount:60
  },
  {
    time: '10',
    amount:20
  },
  {
    time: '11',
    amount:50
  },
  {
    time: '12',
    amount:60
  },
  {
    time: '13',
    amount:5
  },
  {
    time: '14',
    amount:30
  },
  {
    time: '15',
    amount:50
  },
  {
    time: '16',
    amount:20
  },
  {
    time: '17',
    amount:75
  },
  {
    time: '18',
    amount:45
  },
  {
    time: '19',
    amount:65
  },
  {
    time: '20',
    amount:78
  },
  {
    time: '21',
    amount:99
  },
  {
    time: '22',
    amount:26
  },
  {
    time: '23',
    amount:52
  },
  {
    time: '24',
    amount:66
  },
  
];


export default function DailyRentChart() {
  

 
    return (
      <div style={{ width: '100%', border:"3px solid #ffe9f2",borderRadius:"15px",padding:"20px",backgroundColor:"#fff"}}>
        <h1 style={{marginTop:"10px",marginBottom:"10px",color: "black", textShadow: "#bfbfbf 2px 2px 4px"}}>Daily Earning</h1>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={600}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="linear" dataKey="amount" stroke="#6C57EC" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        

        
           

        
      </div>
    )
  
}