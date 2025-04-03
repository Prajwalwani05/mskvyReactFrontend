import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const cards = [
  { id: 1, title: 'S/S No.', key: 'PROJECT_CODE' },
  { id: 2, title: 'S/S Desc.', key: 'SUB_PROJECT_ID' },
  { id: 3, title: 'SPV Name', key: 'PPA_REF_NO' },
  { id: 4, title: 'Solar Capacity(MW)', key: 'SS_NAME' },
  { id: 5, title: 'Name of Selected Bidder', key: 'SS_NUMBER' },
  { id: 6, title: 'Percentage(%)', key: 'SS_CAPACITY' },
];

function SelectActionCard({ data , spvName }) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 1,
        backgroundColor:'#e9ecef',
        padding:1,
        borderRadius:2
      }}
    >
        <Card sx={{backgroundColor:'#fbfaff'}}> {/* ✅ Added key */}
          <CardActionArea>
            <CardContent >
            <Typography variant="body2" mb={1} component="div">
            S/S No.
              </Typography>
              <Box display={'flex'} alignItems={'flex-start'}>
              <Box mr={0.5}  sx={{borderRadius:'50%', background:'-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )', display:'inline-block',  width:'15px', height:'15px'}}></Box>
              <Typography variant="body2" color="text.secondary">
              {data.SS_No}
              </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{backgroundColor:'#fbfaff'}}> {/* ✅ Added key */}
          <CardActionArea>
            <CardContent>
            <Typography variant="body2" mb={1} component="div">
            S/S Desc.
              </Typography>
              <Box display={'flex'} alignItems={'flex-start'}>
              <Box mr={0.5}  sx={{borderRadius:'50%', background:'-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )', display:'inline-block',  width:'15px', height:'15px'}}></Box>
              <Typography variant="body2" color="text.secondary">
                {data.SS_Desc}
              </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{backgroundColor:'#fbfaff'}}> {/* ✅ Added key */}
          <CardActionArea>
            <CardContent>
            <Typography variant="body2" mb={1} component="div">
            SPV Name
              </Typography>
              <Box display={'flex'} alignItems={'flex-start'}>
              <Box mr={0.5}  sx={{borderRadius:'50%', background:'-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )', display:'inline-block',  width:'15px', height:'15px'}}></Box>
              <Typography variant="content" color="text.secondary">
                {spvName}
              </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{backgroundColor:'#fbfaff'}}> {/* ✅ Added key */}
          <CardActionArea>
            <CardContent>
            <Typography variant="body2" mb={1} component="div">
            Solar Capacity(MW)
              </Typography>
              <Box display={'flex'} alignItems={'flex-start'}>
              <Box mr={0.5}  sx={{borderRadius:'50%', background:'-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )', display:'inline-block',  width:'15px', height:'15px'}}></Box>
              <Typography variant="body2" color="text.secondary">
                {data.SolarCapacity}
              </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{backgroundColor:'#fbfaff'}}> {/* ✅ Added key */}
          <CardActionArea>
            <CardContent>
            <Typography variant="body2" mb={1} component="div">
            Name of Selected Bidder
              </Typography>
              <Box display={'flex'} alignItems={'flex-start'}>
              <Box mr={0.5}  sx={{borderRadius:'50%', background:'-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )', display:'inline-block',  width:'15px', height:'15px'}}></Box>
              <Typography variant="content" color="text.secondary">
                {data.nameOfBidder}
              </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{backgroundColor:'#fbfaff'}}> {/* ✅ Added key */}
          <CardActionArea>
            <CardContent>
            <Typography variant="body2" mb={1} component="div">
            Percentage(%)
              </Typography>
              <Box display={'flex'} alignItems={'flex-start'}>
              <Box mr={0.5}  sx={{borderRadius:'50%', background:'-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )', display:'inline-block',  width:'15px', height:'15px'}}></Box>
              <Typography variant="body2" color="text.secondary">
                {data.Percentage}
              </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
    </Box>
  );
}

export default SelectActionCard;

