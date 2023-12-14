import { Box, Typography } from '@mui/material'
import React from 'react'

function About() {
  return (
    <div>
      <Box sx={{height:"80vh",display:"grid",placeItems:"center"}}>
        <Box sx={{textAlign:"center",px:2,width:{xs:"100%",sm:"70vw",md:"60vw"}}}>
      <Typography variant='h5' sx={{fontSize:{xs:"24px",sm:"28px"}}}>About</Typography>
      <Typography sx={{fontSize:{xs:"16px",sm:"18px"}}}>
       This is the website where you can get weather of any places.
       You just need to enter a city name and it will show you the current weather report along with wind details, pressure, humidity, sunrise & sunset. We have used your ipAddress to get your location for the weather.
      </Typography>
      </Box>
      </Box>
    </div>
  )
}

export default About
