import { Box, TextareaAutosize, Button, styled } from "@mui/material"
import { useState, useContext, useEffect } from "react"
import { API } from '../../../service/api';

import { DataContext } from "../../../context/DataProvider"

import Comment from "./Comment";

const Container=styled(Box)`
   margin:50px 0;
   display:flex;
`
const Image=styled('img')({
    width:50,
    height:50,
    borderRadius:'50%'
})
const TextArea=styled(TextareaAutosize)`
   width:100%;
   height:100px;
   margin:0 20px;
`
const initialValues={
    name:'',
    postId:'',
    comments:'',
    date:new Date()
}

const Comments=({post})=>{
    const url = 'https://static.thenounproject.com/png/12017-200.png'
    
    const [comment,setComment]=useState(initialValues)
    const [comments,setComments]=useState([])
    const [toggle,setToggle]=useState(false)

    const {account}=useContext(DataContext)

    useEffect(()=>{
       const getData=async()=>{
            const response=await API.getAllComments(post._id)
            if(response.isSuccess){
                setComments(response.data)
            }
       }
       getData();
    },[post,toggle])

    const handleChange=(e)=>{
        setComment({
            ...comment,
            name:account.username,
            postId:post._id,
            comments:e.target.value
        });
    }

    const addComment=async(e)=>{
        let response=await API.newComment(comment)
        if(response.isSuccess){
            setComment(initialValues)
        }
        setToggle(prevState => !prevState)
    }
     
    return(
        <Box>
            <Container>
                <Image src={url} alt="dp" />
                <TextArea
                    minRows={5}
                    placeholder="What's on your mind?"
                    value={comment.comments}
                    onChange={(e)=>handleChange(e)}
                />
                <Button variant="contained" size="medium" style={{height:'40px'}} onClick={(e)=>addComment(e)}>Post</Button>
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment=>{
                        return <Comment comment={comment} setToggle={setToggle}/>
                    })
                }
            </Box>
        </Box>
    )
}
export default Comments