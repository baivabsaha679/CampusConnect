import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import Login from './Component/User/Login'
import DataProvider from './context/DataProvider';
import Home from './Component/Home/Home';
import {BrowserRouter,Routes,Route,Outlet,Navigate} from 'react-router-dom'
import Header from './Component/Header/Header';
import CreatePost from './Component/Create/CreatePost';
import Details from './Component/Details/Details';
import UpdatePost from './Component/Create/Update.Post';
import About from './Component/About/About';
import Contact from './Component/Contact/Contact';

const PrivateRoute=({isAuth,...props})=>{
   return isAuth?
      <>
       <Header/>
       <Outlet/>
      </>
      : <Navigate replace to='/login'/>
}

function App() {
  const[isAuth,isUserAuth]=useState(false)

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{marginTop:64}}>
          <Routes>
            <Route path='/login' element={<Login isUserAuth={isUserAuth}/>}/>

            <Route path='/' element={<PrivateRoute isAuth={isAuth}/>}>
              <Route path='/' element={<Home/>}/>
            </Route>

            <Route path='/create' element={<PrivateRoute isAuth={isAuth}/>}>
              <Route path='/create' element={<CreatePost/>}/>
            </Route>

            <Route path='/details/:id' element={<PrivateRoute isAuth={isAuth}/>}>
              <Route path='/details/:id' element={<Details/>}/>
            </Route>

            <Route path='/update/:id' element={<PrivateRoute isAuth={isAuth}/>}>
              <Route path='/update/:id' element={<UpdatePost/>}/>
            </Route>

            <Route path='/about' element={<PrivateRoute isAuth={isAuth}/>}>
              <Route path='/about' element={<About/>}/>
            </Route>

            <Route path='/contact' element={<PrivateRoute isAuth={isAuth}/>}>
              <Route path='/contact' element={<Contact/>}/>
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
