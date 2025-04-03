import * as React from 'react';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import { styled } from '@mui/material';
import { useDrawingArea } from '@mui/x-charts/hooks';
// import { Legend } from '@mui/x-charts/Legend';


const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 15,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    
    const fontSize = children.length > 15 ? 14 : 15; // Adjust size based on length
  
    return (
      <StyledText
        x={left + width / 2}
        y={top + height / 2}
        style={{ fontSize: `${fontSize}px` }}
      >
        {children}
      </StyledText>
    );
  }
  
  
  export default function PieChartWithPaddingAngle({chartData = [] , chartName}) {

  const colors = ["#10b981", "#f59e0b", "#f43f5e",];
  const formattedData = chartData.map((item, index) => ({
    ...item,
    id: index, // Unique ID for React
    color: colors[index % colors.length], // Assign color manually
  }));
  return (
    <Stack direction="row" sx={{ flex:'1', borderRadius:'8px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px', textAlign: "center", margin:'15px 15px 0' }}>
      <PieChart
        series={[
          {
            // paddingAngle: 5,
            innerRadius: 70,
            outerRadius: 90,
            data: formattedData,
            
          },
        ]}
        margin={{ right: 100 }}
        width={600}
        height={200}
        // legend={{ hidden: false }}
      >
              <PieCenterLabel>{chartName}</PieCenterLabel>
      </PieChart>
       {/* <Legend position="bottom" /> */}
    </Stack>
  );
}
