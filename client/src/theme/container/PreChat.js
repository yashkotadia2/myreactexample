import React from 'react'

import '../style_sheet/pre_chat.css'
import { v4 } from 'uuid';


const id = v4()

const user_info = {
    userId: id,
    userName: '',
    profilePic: '',
}

const PreChat = () => {

    const setName = e =>{
        user_info.userName = e.target.value
    }

    const setProfilePicLink = e =>{
        user_info.profilePic = e.target.src
    }

    const sendUserInfo = e =>{
        console.table(user_info);
    }

    return (
        <div className="form">
            <div className="form-body">
                <div className="name m-3">
                    <label className="form__label" for="firstName">Name: </label>
                    <input className="form__input" onChange={setName} type="text" id="name" placeholder="Enter Your Name"/>
                </div>
                <div className="profile_images_container m-3">
                    <label className="form__label" for="profile_img">Select Profile Image: </label>
                    <div className='profile_images d-flex flex-row justify-content-start'>
                        <div className='profile_image me-2'>
                            <img src={require('../assets/images/avatars/avatar_male.png')} onClick={setProfilePicLink} class="profile_thumbnail" alt="male avatar" width="45px" height="45px"/> 
                        </div>
                        <div className='profile_image'>
                            <img src={require('../assets/images/avatars/avatar_female.png')} onClick={setProfilePicLink} class="profile_thumbnail" alt="female avatar" width="45px" height="45px"/> 
                        </div>
                    </div>
                </div>
                <button onClick={sendUserInfo} type="submit" class="btn btn-primary m-3">Start Chatting</button>
            </div>
        </div>      
    )
}

export default PreChat