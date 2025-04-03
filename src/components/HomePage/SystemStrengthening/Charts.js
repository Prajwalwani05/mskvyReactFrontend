// import * as React from "react";
// import { useNavigate } from "react-router-dom";
// import Stack from "@mui/material/Stack";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { Box, Typography } from "@mui/material";

// function PieChartWithPaddingAngle({ chartData }) {
//   const navigate = useNavigate();
//   const colors = ["#10b981", "#f59e0b", "#f43f5e", "#6c757d"];
//   const chartTitle = chartData.MSKVY_Type;

//   const formattedData = [
//     { label: "Completed", value: Number(chartData.Completed), color: colors[0] },
//     { label: "In Progress", value: Number(chartData.In_Progress), color: colors[1] },
//     { label: "Yet To Start", value: Number(chartData.Yet_To_Start), color: colors[2] },
//     { label: "Not Req", value: Number(chartData.Not_Req), color: colors[3] },
//   ];

//   // Function to handle click events on pie slices
//   const handleSliceClick = (data) => {
//     console.log("Clicked on:", data);
//     navigate(`/SSActivityStatus/${data.label}`, { state: { data, chartData } });
//   };

//   return (
//     <Box
//       sx={{
//         width: "max-content",
//         flex: "1",
//         borderRadius: "8px",
//         boxShadow:
//           "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
//         textAlign: "center",
//         cursor: "pointer", // Make it clear it's clickable
//       }}
//     >
//       <Typography variant="body2" sx={{ marginBottom: 0, marginTop: 2 }}>
//         {chartTitle}
//       </Typography>
//       <PieChart
//         series={[
//           {
//             innerRadius: 50,
//             outerRadius: 70,
//             data: formattedData,
//             // onClick: (_, index) => handleSliceClick(formattedData[index]), // Handle click
//             // cx: 200, // Center X position
//             // cy: 100, // Center Y position
//           },
//         ]}
//         margin={{ right: 100 }}
//         onMouseUp={(event) => {
//           const svg = event.target.closest("svg");
//           if (svg) {
//             const clickedIndex = Array.from(svg.querySelectorAll("path")).indexOf(event.target);
//             if (clickedIndex >= 0) {
//               handleSliceClick(event, formattedData[clickedIndex]);
//             }
//           }
//         }}
//         width={400}
//         height={200}
//       />
//     </Box>
//   );
// }

// export default function MultiplePieCharts({ graphs }) {
//   return (
//     <Stack
//       margin={2}
//       marginBottom={0}
//       display={"flex"}
//       flexWrap={"wrap"}
//       justifyContent={"center"}
//       gap={1}
//       alignItems={"center"}
//       flexDirection={"row"}
//       spacing={2}
//     >
//       {graphs.map((data, index) => (
//         <PieChartWithPaddingAngle key={index} chartData={data} />
//       ))}
//     </Stack>
//   );
// }
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";

function PieChartWithPaddingAngle({ chartData }) {
  const navigate = useNavigate();
  const colors = ["#10b981", "#f59e0b", "#f43f5e", "#6c757d"];
  const chartTitle = chartData.MSKVY_Type;

  const formattedData = [
    { label: "Completed", value: Number(chartData.Completed), color: colors[0] },
    { label: "In Progress", value: Number(chartData.In_Progress), color: colors[1] },
    { label: "Yet To Start", value: Number(chartData.Yet_To_Start), color: colors[2] },
    { label: "Not Req", value: Number(chartData.Not_Req), color: colors[3] },
  ];

  const handleSliceClick = (event, data) => {
    event.preventDefault();
    navigate(`/SSActivityStatus/${data.label}`, { state: { data, chartData } });
  };

  return (
    <Box
      sx={{
        width: "max-content",
        flex: "1",
        borderRadius: "8px",
        marginTop:'0',
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <Typography variant="body2" sx={{ marginBottom: 0, marginTop: 2 }}>
        {chartTitle}
      </Typography>
      <PieChart
        series={[
          {
            innerRadius: 50,
            outerRadius: 70,
            data: formattedData,
            cx: 140,
            cy: 100,
          },
        ]}
        width={400}
        height={200}
        onMouseUp={(event) => {
          const svg = event.target.closest("svg");
          if (svg) {
            const clickedIndex = Array.from(svg.querySelectorAll("path")).indexOf(event.target);
            if (clickedIndex >= 0) {
              handleSliceClick(event, formattedData[clickedIndex]);
            }
          }
        }}
      />
    </Box>
  );
}

export default function MultiplePieCharts({ graphs }) {
  return (
    <Stack
      margin={2}
      marginBottom={0}
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      gap={1}
      alignItems={"center"}
      flexDirection={"row"}
      // spacing={2}
    >
      {graphs.map((data, index) => (
        <PieChartWithPaddingAngle key={index} chartData={data} />
      ))}
    </Stack>
  );
}
