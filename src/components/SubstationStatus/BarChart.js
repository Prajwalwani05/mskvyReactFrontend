import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars(props) {
    const {prop1, prop2} = props;
    
  return (
    <BarChart
      xAxis={[{ 
        scaleType: 'band',
         data: ['Total SubStation', 'Total Solar Capacity'] ,
         categoryGapRatio: 0.5,
         barGapRatio: 0.1
        }]}
        
      series={[{ data: [prop1, prop2]}] }
      width={550}
      height={300}
      
    />
  );
}