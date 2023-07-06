import {Box,TextField,Button,styled,Typography} from '@mui/material'
import { useState, useContext } from 'react'
import { API } from '../../service/api'
import { DataContext } from '../../context/DataProvider'
import {useNavigate} from 'react-router-dom'


const Component=styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`
const Image=styled('img')({
    width:'70%',
    height:'10vh',
    margin:'auto',
    display:'flex',
    padding:'30px 0'
})

const Wrapper=styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex-direction: column; 
    flex: 1;
    & > div,& > button,& > p{
        margin-top:20px;
    }
`
const LoginButton=styled(Button)`
    text-transform:none;
    background:#FB6418;
    color:#fff;
    height:40px;
    border-radius:2px;
`

const SignUpButton=styled(Button)`
    text-transform:none;
    background:#fff;
    color:#2874f0;
    height:40px;
    border-radius:2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`
const Text=styled(Typography)`
    color:#878787;
    font-size:16px;
`
const Error=styled(Typography)`
    font-size:10px;
    color:#ff6161;
    line-height:0;
    margin-top:10px;
    font-weight:600;
`

const initialsignup={
    name:'',
    username:'',
    password:''
}
const initiallogin={
    username:'',
    password:''
}

const Login=({isUserAuth})=>{
    const url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiVsz8w9YDfLYtHSkbAdn-a21Rahre3FmsKRwNc8XkCSkRop7LC3YrzzjdDUxnkF7G7w&usqp=CAU'
    const[account,toggleAccount]=useState('login')
    const[signup,setsignup]=useState(initialsignup)
    const[login,setlogin]=useState(initiallogin)
    const[error,seterror]=useState('')
    
    const {setAccount}=useContext(DataContext)
    const navigate=useNavigate();

    const toggle=()=>{
        account==='login'?toggleAccount('signup'):toggleAccount('login')
    }
   
    const onSignUpChange=(e)=>{
        setsignup({...signup,[e.target.name]:e.target.value})
    }
    const onLoginInChange=(e)=>{
        setlogin({...login,[e.target.name]:e.target.value})
    }
    
    const sign=async()=>{
       let response=await API.userSignup(signup)
       if(response.isSuccess){
          seterror('')
          setsignup(initialsignup)
          alert('Successfully signed up')
          toggleAccount('login')
       }
       else{
          seterror('Something went wrong! Please try again later');
       }
    }
    const log=async()=>{
       let response=await API.userLogin(login)
       if(response.isSuccess){
          seterror('')

          sessionStorage.setItem('accessToken','Bearer '+response.data.accessToken)
          sessionStorage.setItem('refreshToken','Bearer ' +response.data.refreshToken)

          setAccount({name:response.data.name,username:response.data.username})

          isUserAuth(true);

          navigate('/')
       }
       else{
          seterror('Something went wrong! Please try again later');
       }
    }

    return(
        <Component>
            <Box>
                {/* <StyledHeading>CampusConnect</StyledHeading> */}
                <Image src={url} alt='Logo'/>
                {
                    account=='login'?
                    <Wrapper>
                        <TextField variant='standard' label='Enter Username' value={login.username} name='username' onChange={(e)=>onLoginInChange(e)}/>
                        <TextField variant='standard' label='Enter Password' value={login.password} name='password' onChange={(e)=>onLoginInChange(e)}/>
                        {error && <Error>{error}</Error>}
                        <LoginButton variant='contained' onClick={()=>log()}>LogIn</LoginButton>
                        <Text style={{textAlign:'center'}}>OR</Text>
                        <SignUpButton onClick={()=>toggle()}>Create an Account</SignUpButton>
                    </Wrapper>
                    :
                    <Wrapper>
                        <TextField variant='standard' label='Enter Name' name='name' onChange={(e)=>onSignUpChange(e)}/>
                        <TextField variant='standard' label='Enter Username' name='username' onChange={(e)=>onSignUpChange(e)}/>
                        <TextField variant='standard' label='Enter Password' name='password' onChange={(e)=>onSignUpChange(e)}/>
                        {error && <Error>{error}</Error>}
                        <SignUpButton onClick={()=>sign()}>SignUp</SignUpButton>
                        <Text style={{textAlign:'center'}}>OR</Text>
                        <LoginButton variant='contained' onClick={()=>toggle()}>Already have an Account?</LoginButton>
                    </Wrapper>
                }
            </Box>
        </Component>
    )
}
export default Login