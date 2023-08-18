import { Link } from "react-router-dom";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom"
import axios from 'axios';


import * as validation from '../helper/validation';
import { add_user } from '../redux/slice/user_info'

import "../style_sheet/login.css";
import 'bootstrap/dist/css/bootstrap.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register(props)
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[fname, setFname] = useState();
    const[lname, setLname] = useState();
    const[age, setAge] = useState();
    const[email, setEmail] = useState();
    const[password, setPassword] = useState();
    const[profilePic, setProfilePic] = useState();

    const [errorMessage, setErrorMessage] = useState();

    const updatedState = {
        profile: 
        {
          firstName: '',
          lastName: '',
          age: 18,
          email: '',
          password: '',
          profile_pic: 'default_profile_pic'
        },
        formSubmitted: false
      }

      const user_credentials = {
          user_email: '',
          user_password: ''
      }


    const handleInputChange = (event) => {
        switch(event.target.name)
        {
            case 'fname':
                setFname(event.target.value);
                break;

            case 'lname':
                setLname(event.target.value);
                break;

            case 'age':
                setAge(event.target.value);
                break;

            case 'email':
                setEmail(event.target.value);
                break;

            case 'psw':
                setPassword(event.target.value);
                break;

            default:
                console.log("def");
        }
      };

      const setProfilePicLink = e =>{
        var elements = document.getElementsByClassName('profile_thumbnail');
        for(var i = 0; i < elements.length; i++){
            if(e.target === elements[i]){
                e.target.classList.remove('notSelectedProfilePic')
            }
            else{
                elements[i].classList.add('notSelectedProfilePic')
            }
        }
        setProfilePic(e.target.src);
    }

    const handleRegister = () => {
        setFname(fname);
        setLname(lname);
        setAge(age)
        setEmail(email);
        setPassword(password);

        updatedState.profile.firstName = fname;
        updatedState.profile.lastName = lname;
        updatedState.profile.age = age;
        updatedState.profile.email = email;
        updatedState.profile.password = password;
        updatedState.profile.profile_pic = profilePic

        updatedState.formSubmitted  = true;

        console.table(updatedState);
        dispatch(add_user(updatedState));

        let newObj = {
            name: updatedState.profile.firstName,
            email: updatedState.profile.email,
            salary: updatedState.profile.age
        }


        axios
            .post('http://localhost:5000/api/employee/add', newObj)
            .then(() => console.log('Registration Done! Data Sent to DB'))
            .catch(err => {
                console.error(err);
            });

        user_credentials.user_email = email;
        user_credentials.user_password = password;

        var user_details = localStorage.getItem('user_credentials');
        if(user_details == null)
        {
            localStorage.setItem('user_credentials', JSON.stringify(user_credentials));
        }
        else{
            localStorage.setItem('user_credentials', user_details + "," + JSON.stringify(user_credentials));
        }

        toast.info('Registered Successfully!');    
        
        setTimeout(() => {
            navigate("/login")
          }, 2600);   
      }

    const PostDataToDB = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:4000//api/employee/add")
    }  

    function Position(obj){
        var currentTop = 0;
        if (obj.offsetParent)
        {
            do{
                currentTop += obj.offsetTop;
            }
            while ((obj = obj.offsetParent));
            return [currentTop];
        }
    }

    const validateForm = e => {

        console.log("profilePic",profilePic);
        

        e.preventDefault()
        if(validation.validateString(fname) &&
         validation.validateString(lname) && 
         validation.validateAge(age) &&
         validation.validateEmail(email) &&
         validation.validatePassword(password) &&
         profilePic != undefined)
        {
            handleRegister();
        }
        else{
            if(!validation.validateString(fname) )
            {
                let el = document.getElementById('invalid_feedback_fname')
                window.scrollTo(0, Position(el.previousSibling));
                el.previousSibling.focus();
                el.style.display = "block";
            }
            else{
                document.getElementById('invalid_feedback_fname').style.display = "none";
            }

            if(!validation.validateString(lname) )
            {
                let el = document.getElementById('invalid_feedback_lname')
                window.scrollTo(0, Position(el.previousSibling));
                el.previousSibling.focus();
                el.style.display = "block";
            }
            else{
                document.getElementById('invalid_feedback_lname').style.display = "none";
            }

            if(!validation.validateAge(age) )
            {
                let el = document.getElementById('invalid_feedback_age')
                window.scrollTo(0, Position(el.previousSibling));
                el.previousSibling.focus();
                el.style.display = "block";
            }
            else{
                document.getElementById('invalid_feedback_age').style.display = "none";
            }

            if(!validation.validateEmail(email) )
            {
                let el = document.getElementById('invalid_feedback_email')
                window.scrollTo(0, Position(el.previousSibling));
                el.previousSibling.focus();
                el.style.display = "block";
            }
            else{
                document.getElementById('invalid_feedback_email').style.display = "none";
            }

            if(!validation.validatePassword(password) )
            {
                let el = document.getElementById('invalid_feedback_password')
                window.scrollTo(0, Position(el.previousSibling));
                el.previousSibling.focus();
                el.style.display = "block";
            }
            else{
                document.getElementById('invalid_feedback_password').style.display = "none";
            }
            if(profilePic == undefined)
            {
                let el = document.getElementById('invalid_feedback_profile_pic')
                window.scrollTo(0, Position(el.previousSibling));
                el.previousSibling.focus();
                el.style.display = "block";
            }
            else{
                document.getElementById('invalid_feedback_profile_pic').style.display = "none";
            }
        }
    }

    const togglePasswordShow = (e) => {
        if(document.getElementById("reg_password").type === 'text'){
            e.target.className = "fa fa-eye-slash eye_container"
            document.getElementById("reg_password").type = "password";
        }
        else if(document.getElementById("reg_password").type === 'password'){
            e.target.className = "fa fa-eye eye_container"
            document.getElementById("reg_password").type = "text";
        }
    };

    return(
        <>
            <div className='form'>
                <div className="container">
                    <h3 className='text-center mb-4'>Register:</h3>
                    <form className="needs-validation" noValidate>
                        <label htmlFor="fname"><b>Provide your First Name:</b></label>
                        <input type="text" placeholder="Enter your Name" onChange={handleInputChange} value={fname} name="fname" required/>
                        <div id="invalid_feedback_fname" className="invalid_feedback">Please enter valid Firstname.</div>

                        <label htmlFor="lname"><b>Provide your Last Name:</b></label>
                        <input type="text" placeholder="Enter your Name" onChange={handleInputChange} value={lname} name="lname" required/>
                        <div id="invalid_feedback_lname" className="invalid_feedback">Please enter valid Lastname.</div>

                        <label htmlFor="uname"><b>Enter Your Age:</b></label>
                        <input type="number" placeholder="Enter your Age" onChange={handleInputChange} value={age} name="age"/>
                        <div id="invalid_feedback_age" className="invalid_feedback">Please enter valid age.</div>

                        <label htmlFor="uname"><b>Enter Email:</b></label>
                        <input type="email" placeholder="Enter Email" onChange={handleInputChange} value={email} name="email" required/>
                        <div id="invalid_feedback_email" className="invalid_feedback">Please enter valid Email.</div>
                        
                        <div style={{position: "relative"}}>
                            <label htmlFor="psw"><b>Choose Password:</b></label>
                            <input id="reg_password" type="password" placeholder="Enter Password" onChange={handleInputChange} value={password} name="psw" required/>
                            <div id="invalid_feedback_password" className="invalid_feedback">Please enter valid Password.</div>
                            <div onClick={togglePasswordShow}><i className="fa fa-eye-slash eye_container"></i></div>
                            <label className='psw_req' htmlFor="psw_req">
                                <b>Must contain:</b><br/>
                                Min 8 characters,
                                1 uppercase letter,
                                1 lowercase letter,
                                1 number and,
                                1 special char<br/>
                            </label>
                        </div>

                        <label className="mt-1" htmlFor="uname"><b>Select Profile Picture:</b></label>
                        <div className='profile_images d-flex flex-row justify-content-start mb-1'>
                            <div className='profile_image me-1'>
                                <img src={require('../assets/images/avatars/am_1.png')} onClick={setProfilePicLink} class="profile_thumbnail" alt="male avatar" width="45px" height="45px"/> 
                            </div>
                            <div className='profile_image me-1'>
                                <img src={require('../assets/images/avatars/am_2.png')} onClick={setProfilePicLink} class="profile_thumbnail" alt="female avatar" width="45px" height="45px"/> 
                            </div>
                            <div className='profile_image me-1'>
                                <img src={require('../assets/images/avatars/am_3.png')} onClick={setProfilePicLink} class="profile_thumbnail" alt="male avatar" width="45px" height="45px"/> 
                            </div>
                            <div className='profile_image me-1'>
                                <img src={require('../assets/images/avatars/am_4.png')} onClick={setProfilePicLink} class="profile_thumbnail" alt="female avatar" width="45px" height="45px"/> 
                            </div>
                            <div className='profile_image'>
                                <img src={require('../assets/images/avatars/am_5.png')} onClick={setProfilePicLink} class="profile_thumbnail" alt="female avatar" width="45px" height="45px"/> 
                            </div>
                        </div>
                        <div className='profile_images d-flex flex-row justify-content-start'>
                            <div className='profile_image me-1'>
                                <img src={require('../assets/images/avatars/aw_1.png')} onClick={setProfilePicLink} class="profile_thumbnail" alt="male avatar" width="45px" height="45px"/> 
                            </div>
                            <div className='profile_image me-1'>
                                <img src={require('../assets/images/avatars/aw_2.png')} onClick={setProfilePicLink} class="profile_thumbnail" alt="female avatar" width="45px" height="45px"/> 
                            </div>
                            <div className='profile_image me-1'>
                                <img src={require('../assets/images/avatars/aw_3.png')} onClick={setProfilePicLink} class="profile_thumbnail" alt="male avatar" width="45px" height="45px"/> 
                            </div>
                            <div className='profile_image me-1'>
                                <img src={require('../assets/images/avatars/aw_4.png')} onClick={setProfilePicLink} class="profile_thumbnail" alt="female avatar" width="45px" height="45px"/> 
                            </div>
                            <div className='profile_image'>
                                <img src={require('../assets/images/avatars/aw_5.png')} onClick={setProfilePicLink} class="profile_thumbnail" alt="female avatar" width="45px" height="45px"/> 
                            </div>
                        </div>
                        <div id="invalid_feedback_profile_pic" className="invalid_feedback mt-1">Please select a profile photo.</div>

                        <button className='action_btn mt-3' onClick={validateForm} type="submit">Register</button>
                    </form>
                </div>
                <div>
                    <label className='error-msg'>{errorMessage}</label>
                    <div className='d-flex flex-column justify-content-center align-items-center pb-3'>
                        <div>
                            <Link className="nav-item nav-link  nav-link-home" to="/login">Log in instead?</Link>
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