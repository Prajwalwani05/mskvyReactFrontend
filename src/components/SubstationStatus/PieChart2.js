import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';

export default function PieClickNoSnap2(props) {
  const { prop1, prop2, prop3, Dist_Code } = props;
  const {setSubstationstatusdata} = React.useContext(DataContext);
  const [ loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const data1 = [
    { label: 'Completed', name: "Completed", value: prop1, color: "green" },
    { label: 'In Progress', name: "InProgress", value: prop2, color: "yellow" },
    { label: 'Yet to start', name: "Yet_To_Start", value: prop3, color: "red" },
  ];

  const series = [
    {
      id: 'series-1',
      data: data1,
      innerRadius: 45,
      outerRadius: 80,
      paddingAngle: 5,
      cornerRadius: 2,
      startAngle: -360,
      endAngle: 180,
      cx: 110,
      cy: 90,
    },
  ];

  const handleItemClick = (event, item) => {
    let status = "";
    const clickedIndex = item.dataIndex; // Accessing the dataIndex property of the clicked item
    console.log(clickedIndex);
    const clickedLabel = data1[clickedIndex].label; // Accessing the label property of the clicked item in data1 array
    console.log(clickedLabel);

    switch (clickedLabel) {
      case 'Completed':
        status = 'Completed';
        break;
      case 'In Progress':
        status = 'In Progress';
        break;
      case 'Yet to start':
        status = 'Yet To Start';
        break;
      default:
        break;
    }
    setSubstationstatusdata([]);
    navigate(`/Substationwisedata/${Dist_Code}/${status}`);
    setLoading(true);
    axios
      .get(
        `${apiUrl}/api/SubstationApi/GetAugmentationSubStationStatus?dist_code=${Dist_Code}&status1=${status}&aug_Y_N=Y`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Chart Data>>>", response.data);
          setSubstationstatusdata(response.data);
          // navigate(`/Substationwisedata/${Dist_Code}/${status}`)
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        setLoading(true);
        console.log(error);
      })
    
  };

  return (
    <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft:"33px" }}>
    <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <PieChart
          series={series}
          width={200}
          height={200}
          slotProps={{
            legend: { hidden: true },
          }}
          onItemClick={(event, item) => handleItemClick(event, item)}
        />
      </Box>
    </Stack>
    </div>
  );
}
