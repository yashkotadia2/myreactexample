import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import Protected from './Protected';
import ProtectedNavBar from '../component/ProtectedNavBar';
import { add_user, isLoggedInOrNot} from '../redux/slice/user_info'


const Navbar = (props) => {
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogOut = (event) => {
        dispatch(add_user(''));
        dispatch(isLoggedInOrNot(false));
        setIsLoggedIn(false);
    };

    useEffect(() =>{
        setIsLoggedIn(props.logInFlag)
    },[props])

    return (
    <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-custom">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <Link className="nav-item nav-link" to="/">Home</Link>
                    <Link className="nav-item nav-link" to="/about">About</Link>

                    <Link className="nav-item nav-link" to="/data-graph">Data & Graph</Link>
                    <Protected isLoggedIn={isLoggedIn}>
                        <ProtectedNavBar />
                    </Protected>
                    {isLoggedIn ? 
                    (
                        <>
                        <Link className="nav-item nav-link" title="User Profile" to="/profile"><i className="fa fa-user" aria-hidden="true"></i></Link>
                        <Link className="nav-item nav-link" title="Log Out" onClick={handleLogOut} to="/"><i className="fa fa-sign-out" aria-hidden="true"></i></Link>
                        </>
                    ) : (
                        <>
                        <Link className="nav-item nav-link" title="Register" to="/register"><i className="fa fa-user-plus" aria-hidden="true"></i></Link>
                        <Link className="nav-item nav-link" title="Log In" to="/login"><i className="fa fa-sign-in" aria-hidden="true"></i></Link>
                        </>    
                    )}
                </ul>
                </div>
            </div>
        </nav>
    </>
    )
}

export default Navbar