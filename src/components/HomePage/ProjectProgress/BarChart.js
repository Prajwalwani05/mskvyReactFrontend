import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars({data1, data2, data3}) {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['AG Substations', 'LOA Issued Substations', 'Commissioned Substations'] }]}
      series={[
        { data: [data1, data2, data3] }, // This assigns the values to the corresponding categories
      ]}
      width={680}
      height={390}      
    />
  );
}
