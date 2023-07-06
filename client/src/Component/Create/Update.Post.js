import { Box, styled, FormControl, InputBase, Button, TextareaAutosize} from "@mui/material"
import {AddCircle as Add} from '@mui/icons-material';
import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import {API} from '../../service/api'

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
});

const StyledFormControl=styled(FormControl)`
   margin-top:10px;
   display:flex;
   flex-direction:row;
`
const StyledInputBase=styled(InputBase)`
   flex:1;
   margin:0 30px;
   font-size:25px;
`
const TextArea=styled(TextareaAutosize)`
   width:100%;
   margin-top:50px;
   font-size:18px;
   border:none;
   &:focus-visible{
      outline:none;
   }
`
const initialPost={
    title:'',
    description:'',
    picture:'',
    username:'',
    categories:'',
    createdDate:new Date()
}

const UpdatePost=()=>{

    
    const [post,setPost]=useState(initialPost)
    const [file,setfile]=useState('')
    
    const {account} =useContext(DataContext)
    
    const location=useLocation();
    const navigate=useNavigate();
    const {id}=useParams()
    
    const url=post.picture?post.picture:'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg';
    
    useEffect(()=>{
       const fetchData=async()=>{
           let response=await API.getPostById(id);
           if(response.isSuccess){
              setPost(response.data)
           }
       }
       fetchData();
    },[])

    useEffect(()=>{
        const getImage=async()=>{
            if(file){
                const data=new FormData();
                data.append("name",file.name)
                data.append("file",file)
                
                const response=await API.uploadFile(data)
                post.picture=response.data;
            }
        }
        getImage();
        post.categories=location.search?.split('=')[1] || 'All';
        post.username=account.username
    },[file])
    
    const handleChange=(e)=>{
        setPost({...post,[e.target.name]:e.target.value})
    }
    
    const updateBlogPost=async()=>{
        let response=await API.updatePost(post)
        if(response.isSuccess){
            navigate('/details/'+id);
        }
    }

    return(
        <Container>
            <Image src={url} alt="Banner" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action"/>
                </label>
                <input 
                    type="file" 
                    id="fileInput" 
                    style={{display:'none'}}
                    onChange={(e)=>setfile(e.target.files[0])}
                />
                
                <StyledInputBase placeholder="Title" value={post.title} onChange={(e)=>handleChange(e)} name="title"/>
                <Button variant="contained" onClick={()=>updateBlogPost()}>Update</Button>
            </StyledFormControl>
            <TextArea
                minRows={5}
                placeholder="Tell your story....."
                onChange={(e)=>handleChange(e)}
                name="description"
                value={post.description}
            />
        </Container>
    )
}
export default UpdatePost