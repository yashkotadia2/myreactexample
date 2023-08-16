import { useState, useCallback } from 'react';
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { isLoggedInOrNot} from '../redux/slice/user_info'
import { add_user } from '../redux/slice/user_info'

import "../style_sheet/login.css";
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    LoginSocialGoogle,
    LoginSocialAmazon,
    LoginSocialFacebook,
    LoginSocialGithub,
    GitHubLogin,
    LoginSocialInstagram,
    LoginSocialLinkedin,
    LoginSocialMicrosoft,
    LoginSocialPinterest,
    LoginSocialTwitter,
    LoginSocialApple,
    IResolveParams,
  } from 'reactjs-social-login';
  
  import {
    FacebookLoginButton,
    GoogleLoginButton,
    GithubLoginButton,
    AmazonLoginButton,
    InstagramLoginButton,
    LinkedInLoginButton,
    MicrosoftLoginButton,
    TwitterLoginButton,
    AppleLoginButton,
  } from 'react-social-login-buttons';
  

export default function Login(props)
{
    const gitSecretKey = '6c67d2c9bbb58de7b52285a14b25192b5fcb9665'
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();

    // localStorage.clear()
    var user_details = localStorage.getItem('user_credentials');
    
    let userJson = JSON.parse("["+ user_details + "]");
    console.table(userJson)

    const handleUsernameChange = (event) => {
        setUserName(event.target.value);
      };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        setUserName(userName);
        setPassword(password);

        if(userJson.find(e => e.user_email === userName && e.user_password === password) !== undefined)
        {
            dispatch(isLoggedInOrNot(true));
            navigate("/")    
        }
        else
        {
            setErrorMessage('Invalid Username and/or Password!')
        }
      }

      const togglePasswordShow = (e) => {
        if(document.getElementById("togglePassword").type === 'text'){
            e.target.className = "fa fa-eye-slash eye_container"
            document.getElementById("togglePassword").type = "password";
        }
        else if(document.getElementById("togglePassword").type === 'password'){
            e.target.className = "fa fa-eye eye_container"
            document.getElementById("togglePassword").type = "text";
        }
    };

    const handleGoogleLogin = (IResolveParams) => {
        console.log("response of login google", IResolveParams);
        let userObj = {
            profile:{
                
            firstName:IResolveParams.data.given_name,
            lastName: IResolveParams.data.family_name,
            age:"N/A",
            email: IResolveParams.data.email,
            password:"default_password",
            profile_pic: IResolveParams.data.picture,
        }

        };
        dispatch(add_user(userObj));
        dispatch(isLoggedInOrNot(true));
        setTimeout(() => {
            navigate("/profile") 
        }, 2600); 
        
    }

    const handleGithubLogin = (IResolveParams) => {
        console.log("response of login Git", IResolveParams);
/*         let userObj = {
            profile:{
                
            firstName:IResolveParams.data.given_name,
            lastName: IResolveParams.data.family_name,
            age:"N/A",
            email: IResolveParams.data.email,
            password:"default_password",
            profile_pic: IResolveParams.data.picture,
        }

        };
        dispatch(add_user(userObj));
        dispatch(isLoggedInOrNot(true));
            navigate("/profile");    */
    }
    return(
        <>
            <div className='form'>
                <div className="container">
                    <h3 className='text-center mb-4'>Login:</h3>
                    <label htmlFor="uname"><b>Email:</b></label>
                    <input type="text" placeholder="Enter Email" onChange={handleUsernameChange} value={userName} name="uname" required/>
                    
                    <div style={{position: "relative"}}>
                        <label htmlFor="psw"><b>Password:</b></label>
                        <input type="password" id="togglePassword" placeholder="Enter Password" onChange={handlePasswordChange} value={password} name="psw" required/>
                        <div onClick={togglePasswordShow}><i class="fa fa-eye-slash eye_container"></i></div>
                    </div>
                    <button className='action_btn' type="submit" onClick={handleLogin}>Login</button>
                    <div className='social_icons'>
                        <h6>or</h6>
                        <h5>Login with:</h5>
                        <div className='social_icon'>
                        <LoginSocialGoogle
                            client_id="257480698332-lff2det4901p68sbmfvfd7us869h00h1.apps.googleusercontent.com"
                            redirect_uri="/profile"
                            scope="openid profile email"
                            discoveryDocs="claims_supported"
                            access_type="offline"
                            onResolve={(IResolveParams) => {
                                handleGoogleLogin(IResolveParams);
                              }}
                            onReject={err => {
                                console.log(err);
                            }}
                            >
                          {/* <GoogleLoginButton /> */}

                          <button className='social_button'><i class="fa fa-google" aria-hidden="true"></i></button>

                        </LoginSocialGoogle>
                        <LoginSocialGithub
                            client_id={process.env.REACT_APP_GITHUB_APP_ID || 'Iv1.0ccb6d40c0130cef'}
                            redirect_uri="https://grizzly-comic-seahorse.ngrok-free.app/profile"
                            scope="user"
                            onResolve={(IResolveParams) => {
                                // alert("ACCEPT GIT")
                                console.log("GIIIT");
                                handleGithubLogin(IResolveParams);
                              }}
                            onReject={(err) => {
                                alert("REJECT GIT")
                                console.log(err);
                            }}
                            >
                            <button className='social_button'><i class="fa fa-github" aria-hidden="true"></i></button>
                        </LoginSocialGithub>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='text-center'>
                        <label className='error-msg'>{errorMessage}</label>
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-center pb-3'>
                        <div>
                            <Link className="nav-item nav-link custom_nav nav-link-home mb-2r" to="/register"><b>Register</b></Link>
                        </div>
                        <div>
                            <Link className="nav-item nav-link custom_nav nav-link-home" to="/">Go Home <b>without</b> log in</Link>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}
