import React from 'react'
import { useSelector } from 'react-redux';

import Image from '../assets/images/profile.jpg';

import "../style_sheet/profile.css";


const Profile = () => {
  try 
  {
    const userData = useSelector(state => state.user.profile);

    console.log(userData);

    return (
      <>
          <div className="card">
              <img src={(userData.profile.profile_pic === "default_profile_pic" ) ? Image : userData.profile.profile_pic} className='img-profile' alt="Profile"/>
              <h2>Name:{userData.profile.firstName} {userData.profile.lastName}</h2>
              <p className="title"> Email: {userData.profile.email}</p>
              <p>Age: {(userData.profile.age === "N/A") ?  "N/A" : userData.profile.age + " year's old"}</p>
          </div>
      </>
    )
  }
  catch (error)
  {
    return (
      <>
          <div className="card">
              <h1>Invalid Profile!</h1>
              <p className="title">Please register before viewing Profile Info.</p>
          </div>
      </>
    )
  }
  
}

export default Profile;