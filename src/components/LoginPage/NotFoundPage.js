  import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
  
  const NotFoundPage = () => {
    return (
        <Box
        sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', width:'100%'}}
        >
        <Box textAlign={'center'}>
        <Typography variant='h5'>404 - Page Not Found</Typography>
        <Typography color={'gray'} variant='body2'>We can't seem to find the page you're looking for.</Typography>
        <Link to={'/'} >Go back home</Link>
        </Box>
        </Box>
    )
  }
  
  export default NotFoundPage