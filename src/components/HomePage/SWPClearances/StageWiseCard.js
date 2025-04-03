import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const cards = [
  { id: 1, title: 'Project Id', key: 'PROJECT_CODE' },
  { id: 2, title: 'Sub Project Id', key: 'SUB_PROJECT_ID' },
  { id: 3, title: 'PPA Ref No', key: 'PPA_REF_NO' },
  { id: 4, title: 'SS Name', key: 'SS_NAME' },
  { id: 5, title: 'SS Number', key: 'SS_NUMBER' },
  { id: 6, title: 'SS Capacity', key: 'SS_CAPACITY' },
];

function SelectActionCard({ projectId, currentSubstationCode, subProjectId, substationName, ppaRefNo, ssCapacity }) {
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
                Project Id
              </Typography>
              <Box display={'flex'} alignItems={'center'}>
              <Box mr={0.5}  sx={{borderRadius:'50%', background:'-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )', display:'inline-block',  width:'15px', height:'15px'}}></Box>
              <Typography variant="body2" color="text.secondary">
              {projectId}
              </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{backgroundColor:'#fbfaff'}}> {/* ✅ Added key */}
          <CardActionArea>
            <CardContent>
            <Typography variant="body2" mb={1} component="div">
                Sub-Project Id
              </Typography>
              <Box display={'flex'} alignItems={'center'}>
              <Box mr={0.5}  sx={{borderRadius:'50%', background:'-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )', display:'inline-block',  width:'15px', height:'15px'}}></Box>
              <Typography variant="body2" color="text.secondary">
                {subProjectId}
              </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{backgroundColor:'#fbfaff'}}> {/* ✅ Added key */}
          <CardActionArea>
            <CardContent>
            <Typography variant="body2" mb={1} component="div">
                PPA Reference No.
              </Typography>
              <Box display={'flex'} alignItems={'center'}>
              <Box mr={0.5}  sx={{borderRadius:'50%', background:'-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )', display:'inline-block',  width:'15px', height:'15px'}}></Box>
              <Typography variant="body2" color="text.secondary">
                {ppaRefNo}
              </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{backgroundColor:'#fbfaff'}}> {/* ✅ Added key */}
          <CardActionArea>
            <CardContent>
            <Typography variant="body2" mb={1} component="div">
                Substation Name
              </Typography>
              <Box display={'flex'} alignItems={'center'}>
              <Box mr={0.5}  sx={{borderRadius:'50%', background:'-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )', display:'inline-block',  width:'15px', height:'15px'}}></Box>
              <Typography variant="body2" color="text.secondary">
                {substationName}
              </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{backgroundColor:'#fbfaff'}}> {/* ✅ Added key */}
          <CardActionArea>
            <CardContent>
            <Typography variant="body2" mb={1} component="div">
                Substation Number
              </Typography>
              <Box display={'flex'} alignItems={'center'}>
              <Box mr={0.5}  sx={{borderRadius:'50%', background:'-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )', display:'inline-block',  width:'15px', height:'15px'}}></Box>
              <Typography variant="body2" color="text.secondary">
                {currentSubstationCode}
              </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{backgroundColor:'#fbfaff'}}> {/* ✅ Added key */}
          <CardActionArea>
            <CardContent>
            <Typography variant="body2" mb={1} component="div">
                Substation Capacity
              </Typography>
              <Box display={'flex'} alignItems={'center'}>
              <Box mr={0.5}  sx={{borderRadius:'50%', background:'-webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% )', display:'inline-block',  width:'15px', height:'15px'}}></Box>
              <Typography variant="body2" color="text.secondary">
                {ssCapacity}
              </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
    </Box>
  );
}

export default SelectActionCard;

