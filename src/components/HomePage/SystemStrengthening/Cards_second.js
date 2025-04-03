import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function SelectActionCard({ data }) {

    console.log(data)
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
              <Typography variant="body2" color={data[0].SS_NO ? 'text.secondary' : '#f43f5e'}>
              {data[0].SS_NO || 'Not Provided'}
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
              <Typography variant="body2" color={data[0].SS_DESC ? 'text.secondary' : '#f43f5e'}>
                {data[0].SS_DESC || 'Not Provided'}
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
              <Typography variant="content" color={data[0].SPVName ? 'text.secondary' : '#f43f5e'}>
                {data[0].SPVName || 'Not Provided'}
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
              <Typography variant="body2" color={data[0].SOLAR_CAPACITY_MW ? 'text.secondary' : '#f43f5e'}>
                {data[0].SOLAR_CAPACITY_MW || 'Not Provided'}
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
              <Typography variant="content" color={data[0].Name_Of_Selected_Bidder ? 'text.secondary' : '#f43f5e'}>
                {data[0].Name_Of_Selected_Bidder || 'Not Provided'}
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
              <Typography variant="body2" color={data[0].Percentage ? 'text.secondary' : '#f43f5e'}>
                {data[0].Percentage || 'Not Provided'}
              </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
    </Box>
  );
}

export default SelectActionCard;

