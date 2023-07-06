import { Box, Typography, styled } from '@mui/material';

const Image=styled(Box)`
   background:url(https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg) center/55% repeat-x #000;
   width:100%;
   height:50vh;
   display:flex;
   flex-direction:column;
   align-items:center;
   justify-content:center
`
const Heading=styled(Typography)`
   font-size:70px;
   color:#ffffff;
   line-height:1;
`
const Subheading=styled(Typography)`
   font-size:20px;
   background:#ffffff;
`

const Banner=()=>{
    return(
        <Image>
        </Image>
    )
}
export default Banner