import {Box, Typography, styled} from '@mui/material'
import {Edit,Delete} from '@mui/icons-material';

import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import Comments from './Comments/Comments';


const Container=styled(Box)(({theme})=>({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]:{
        margin:0
    }
}));

const Image=styled('img')({
   width:'100%',
   height:'50vh',
   objectFit:'cover'
})

const Heading=styled(Typography)`
   font-size:38px;
   font-weight:600;
   text-align:center;
   margin: 50px 0 10px 0;
   word-break:break-word;
`
const Description=styled(Typography)`
   word-break:break-word;
`
const EditIcon=styled(Edit)`
   margin:5px;
   padding:5px;
   border:1px solid #878787;
   border-radius:10px;
`
const DeleteIcon=styled(Delete)`
   margin:5px;
   padding:5px;
   border:1px solid #878787;
   border-radius:10px;
`
const Author=styled(Box)`
   color:#878787;
   margin:20px 0;
   display:flex;
`

const Details=()=>{
    
    const [post,setPost]=useState({})
    const {id}=useParams();
    const {account}=useContext(DataContext)
    const navigate=useNavigate();
    const url=post.picture ? post.picture :'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg';

    useEffect(()=>{
        const fetchData=async()=>{
            let response=await API.getPostById(id)
            if(response.isSuccess){
               setPost(response.data)
            }
        }
        fetchData();
    },[])

    const deleteBlog=async()=>{
        let response=await API.deletePost(post._id)
        if(response.isSuccess){
            navigate('/')
        }
    }

    return(
        <Container>
            <Image src={url} alt="blog" />

            <Box style={{float:'right'}}>
                {
                    account.username === post.username &&
                    <>   
                        <Link to={'/update/'+post._id}>
                            <EditIcon color='primary'/>
                        </Link>
                        <DeleteIcon onClick={()=>deleteBlog()} color='error'/>
                    </>
                }
            </Box>

            <Heading>{post.title}</Heading>

            <Author>
                <Typography>User: <Box component="span" style={{fontWeight:600}}>{post.username}</Box></Typography>
                <Typography style={{marginLeft:'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            <Description>{post.description}</Description>
            <Comments post={post}/>
        </Container>
    )
}
export default Details