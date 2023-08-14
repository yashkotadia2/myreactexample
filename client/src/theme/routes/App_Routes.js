import React from 'react'
import { Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';

import Home from '../container/Home';
import About from '../container/About';
import DataGraph from '../container/DataGraph';
import Register from '../container/Register';
import PageNotFound from '../container/PageNotFound';
import Login from '../container/Login';
import Chat from '../container/Chat';
import Profile from '../container/Profile';
import Protected from '../component/Protected';
import Unprotected from '../component/Unprotected';


const App_Routes = () => {

  const logInChe = useSelector(state => state.user.isLoggedIn);

  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/protected" element={<Protected/>}/>
        <Route path="/*" element={<PageNotFound/>}/>
        <Route path="/data-graph" element={<DataGraph/>}/>
        <Route path="/login" element={<Unprotected isLoggedIn={logInChe}>
                                        <Login />
                                      </Unprotected>}/>
        <Route path="/register" element={<Unprotected isLoggedIn={logInChe}>
                                          <Register />
                                        </Unprotected>}/>
        <Route path="/profile" element={<Protected isLoggedIn={logInChe}>
                                          <Profile />
                                        </Protected>}/>
        <Route path="/chat" element={<Protected isLoggedIn={logInChe}>
                                          <Chat/>
                                        </Protected>}/>
    </Routes>
  )
}

export default App_Routes