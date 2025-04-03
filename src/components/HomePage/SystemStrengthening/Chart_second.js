import * as React from 'react';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import { styled } from '@mui/material';
import { useDrawingArea } from '@mui/x-charts/hooks';
// import { Legend } from '@mui/x-charts/Legend';
import { useNavigate } from "react-router-dom";


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
        x={left + width / 2.5}
        y={top + height / 2}
        style={{ fontSize: `${fontSize}px` }}
      >
        {children}
      </StyledText>
    );
  }
  
  
  export default function PieChartWithPaddingAngle({chartData = [] , chartName, doughnutData}) {
  const navigate = useNavigate();
  const colors = ["#10b981", "#f59e0b", "#f43f5e", '#767b91', '#9d0208'];
  const formattedData = chartData.map((item, index) => ({
    ...item,
    id: index, // Unique ID for React
    color: colors[index % colors.length], // Assign color manually
  }));

  
  const handleSliceClick = (event, data) => {
    event.preventDefault();
    navigate(`/SubstationsDoughnutClick/${data.label}`, { state: { data, chartData, doughnutData } });
  };

  return (
    <Stack direction="row" flexWrap={"wrap"} sx={{  flex:'1', borderRadius:'8px', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px', textAlign: "center", margin:'10px 10px 0' }}>
      <PieChart
        series={[
          {
            // paddingAngle: 5,
            innerRadius: 70,
            outerRadius: 90,
            data: formattedData,
            cx: 180,
            cy: 100,
            style: { cursor: "pointer" }
          },
        ]}
        width={550}
        height={210}
        onMouseUp={(event) => {
          const svg = event.target.closest("svg");
          if (svg) {
            const clickedIndex = Array.from(svg.querySelectorAll("path")).indexOf(event.target);
            if (clickedIndex >= 0) {
              handleSliceClick(event, formattedData[clickedIndex]);
            }
          }
        }}
        // legend={{ hidden: false }}
      >
              <PieCenterLabel>{chartName}</PieCenterLabel>
      </PieChart>
       {/* <Legend position="bottom" /> */}
    </Stack>
  );
}
