import React, {useState, useEffect, useRef} from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';

import '../style_sheet/chat.css'
import '../style_sheet/modal.css'

import bgImg from './../assets/images/profile.jpg'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const id = v4()

const socket = io('http://localhost:4000');

var infoSent = false

// var recentMessages = [];


var recentMessages = []



// socket.emit('message', chat_user);


const Chat = () => {

    const userData = useSelector(state => state.user.profile);

    const [messageSent, setMessageSent] = useState('');
    const [messageReceived, setMessageReceived] = useState([]);

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [acceptedUsersList, setAcceptedUsersList] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const [userRequest, setUserRequest] = useState();

    const [currentUser, setCurrentUser] = useState({});
    const [isCurrentUser, setIsCurrentUser] = useState(false)

    const [messageReceivedObj, setMessageReceivedObj] = useState({})

    const msgRef = useRef();


    const chat_user = {
        userId: id,
        userName: userData.profile.firstName,
        profilePic: userData.profile.profile_pic,
        message: '',
        acceptedUsers:[],
    }

    console.log("CHAT_USER_NEW", chat_user);
    socket.emit('onConnect', chat_user);

    if(!infoSent)
    {
        socket.emit('onConnect', chat_user);
        infoSent = true
    }  

    socket.on('messageFromServer', (msg) => {
  
        if(msg.userName != null){

            let updatedValue = {};
            updatedValue = {
                userId: msg.userId,
                userName: msg.userName,
                profilePic: msg.profilePic,
                side: "left",
                message:msg.message
            }
    
            setMessageReceivedObj(currentUser => ({
                ...currentUser,
                ...updatedValue
              }));
        }
    });


    useEffect(() => {
        console.log("messageReceivedObj",messageReceivedObj);


        if(Object.keys(messageReceivedObj).length > 0){

            if(isCurrentUser && messageReceivedObj.userId === currentUser.userId){
        
                if(messageReceivedObj.userId === currentUser.userId){
                    if(recentMessages.find(e => e.userId === currentUser.userId) !== undefined){
                        let u = recentMessages.find(e => e.userId === currentUser.userId)
                        let m = u.messages
                        for (let index = 0; index < m.length; index++) {
                            const element = m[index];
                            appendMessage(messageReceivedObj.userName, messageReceivedObj.profilePic, messageReceivedObj.side, element)
                        }
                        recentMessages = []
                    }
                    appendMessage(messageReceivedObj.userName, messageReceivedObj.profilePic, messageReceivedObj.side, messageReceivedObj.message)
                }
            }
            else{
                toast.info(`New Message From: ${messageReceivedObj.userName}. Select that user to receive message!`)
                //recentMessages.push(messageReceivedObj.message)
                if(recentMessages.find(e => e.userId === messageReceivedObj.userId) === undefined){
                    recentMessages.push({
                        userId: messageReceivedObj.userId,
                        messages: [messageReceivedObj.message]
                    })
                }
                else{
                    let el = recentMessages.find(e => e.userId === messageReceivedObj.userId)
                    el.messages.push(messageReceivedObj.message)
                }
                console.table(recentMessages);
            }
        }
    }, [messageReceivedObj]);

    function appendMessage(name, imgUrl, side, text) {

        // console.log("PROFILE", imgUrl);
        if(imgUrl == "default_profile_pic")
        {
            imgUrl = bgImg
        }

        const msgHTML = `
          <div class="msg ${side}-msg">
            <div class="msg-img" style='background-image: url(${imgUrl}) '></div>
      
            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-info-name">${name}</div>
                <div class="msg-info-time">${formatDate(new Date())}</div>
              </div>
      
              <div class="msg-text">${text}</div>
            </div>
          </div>
        `;

        msgRef.current.insertAdjacentHTML("beforeend", msgHTML);
        msgRef.current.scrollTop += 500;
    }

    function formatDate(date) {
        const h = "0" + date.getHours();
        const m = "0" + date.getMinutes();
      
        return `${h.slice(-2)}:${m.slice(-2)}`;
    }

    const sendMessage = e => {

        if(isCurrentUser){
            chat_user.message = messageSent
            // socket.emit('message', chat_user);
            socket.emit('message', { from: chat_user, to: e });
            setMessageSent('');
            appendMessage(chat_user.userName, chat_user.profilePic, "right", chat_user.message)
        }
        else{
            toast.info('Select an Accepted User to Chat!');          
        }
    };

    const sendCurrentMessage = e => {
        setMessageSent(e.target.value);
    };

    var reqUser = {
        toSocketID: '',
        fromUserID: id
    }

    const connectReqUser = e => {
        reqUser.toSocketID = e
        socket.emit("connectRequest", reqUser);
    };

    const acceptReq = e => {
        let handleReq = {
            clientID: id,
            acceptedID: e 
        }
        console.log("handleReq OBJ", handleReq);
        socket.emit("handleAcceptedReq",handleReq)


        setIsOpen(false)
    };

    const updateCurrentUserForChat = e => {

        const bubbleLeft = document.querySelectorAll('.left-msg')
        for (const el of bubbleLeft) {
            el.remove();
        }

        const bubbleRight = document.querySelectorAll('.right-msg')
        for (const el of bubbleRight) {
            el.remove();
        }

        console.log("E", e);
        let updatedValue = {};
        updatedValue = {
            userName: e.userName,
            profilePic: e.profilePic,
            userId: e.userId,
            socket_id:e.socket_id
        }

        setCurrentUser(currentUser => ({
            ...currentUser,
            ...updatedValue
          }));
        setIsCurrentUser(true)
    };

    useEffect(() => {
        console.log("CURRENT USER FLAG", isCurrentUser);
        console.log("CURRENT USER", currentUser);
        
    }, [isCurrentUser,currentUser])
    
    

    socket.on("onlineUsers",((availableUsers) => {

        console.log('AVAL USERS:',availableUsers);

        if (availableUsers.length > 0) 
        {
            let onlineUsersToDisplay = availableUsers.filter(function (e) {
                return e.userId !== id ;
            });

            setOnlineUsers(onlineUsersToDisplay)
        }
    }));
    

/*     useEffect(()=>{

        socket.on("onlineUsers",((availableUsers) => {

                if (availableUsers.length > 0) 
                {
                    let onlineUsersToDisplay = availableUsers.filter(function (e) {
                        return e.userId !== id ;
                    });
                    setOnlineUsers(onlineUsersToDisplay)
                }
        }));
    },[]) */
  
    socket.on("userReqSent", (userFromReq) => {
        setUserRequest(userFromReq)
        setIsOpen(true)
        console.log("userFromReq",userFromReq);
    })

    socket.on("acceptedUsersList",((acceptedUsersL) => {

        console.log("ACCEPTED U:----", acceptedUsersL);

        if(acceptedUsersL.length === 1 || acceptedUsersL.length === 0){
            setAcceptedUsersList([])
        }
        else{
            let aU = acceptedUsersL.find(e => e.acceptedUsers.includes((id)))
    
            let a = [...acceptedUsersList];
            a.push(aU)
            setAcceptedUsersList(a)
    
            console.log("ACCEPTED USERS LIST:", a);
            // setAcceptedUsersList(aU)
        }

 
    }))

    // var listItems = []
    // useEffect(()=>{
    //     console.log("ACCEPTED USERS LIST UseState:", acceptedUsersList);

    // },[acceptedUsersList])

    socket.on("notifyAccepted",((userToAdd) => {

        console.log("userToAdd",userToAdd);
        let a = [...acceptedUsersList];
        a.push(userToAdd)
        setAcceptedUsersList(a)
    }))

    const handleKeypress = e => {
      if (e.keyCode === 13) {
        sendMessage(currentUser)
    }
    };

/*     useEffect(() => {
        var filterOnlineUsers=[];

        for (let index = 0; index < acceptedUsersList.length; index++) {
            console.log(acceptedUsersList,onlineUsers,"ayush");
            const element = onlineUsers.filter(function (e) {
                console.log(e.userId,acceptedUsersList[index].userId ,"ayush",e.userId !== acceptedUsersList[index].userId );
                return e.userId !== acceptedUsersList[index].userId ;
            });
            filterOnlineUsers.push(element[index])


            const ayush = onlineUsers.filter((e) => e.userId !==acceptedUsersList[index].userId) 
            console.log(ayush,"ayush fileter",element);
            console.log('YASH',filterOnlineUsers);

        }
        console.log('YASH LISSSSTTT',filterOnlineUsers);

        // setOnlineUsers(filterOnlineUsers)

        // if(filterOnlineUsers.length === 1){
        //     setOnlineUsers([])
        // }
        // else{
        //     setOnlineUsers(filterOnlineUsers)
        // }
    }, [acceptedUsersList]) */

    return (
        <>
            <div className='main_container row'>
                <div className='available_users col-lg-4 col-md-5 col-sm-12 col-xs-12 pb-2' >
                    <div class="card">
                        <div class="card-header bg-light d-flex justify-content-center">
                            Available Users<span class="logged-in ms-1">●</span>
                        </div>
                        <ul class="list-group list-group-flush text-start mt-2">
                        {
                            (onlineUsers.length === 0) ? 
                            (   <li class="list-group-item d-flex flex-row align-items-center justify-content-center py-3 text-secondary">
                                    No Users Online!
                                </li>
                            )
                            : 
                            (onlineUsers?.map((user, index) => 
                                <li key={index} class="list-group-item d-flex flex-row align-items-center py-1">
                                    <div className='profile_pic_div me-2'>
                                        <img src={user.profilePic} class="profile_pic" alt="profile pic" width="35px" height="35px"/> 
                                    </div>
                                    <div className='userName_container'>{user.userName}</div>
                                    <div className='ms-auto'>
                                        <button onClick={() => connectReqUser(user.socket_id)} className='user_btn'>
                                            <i id="send_request" class='fa fa-user-plus me-1' aria-hidden="true"></i>
                                        </button>
                                       {/*  <i id="pending_request" class="fa fa-clock-o mt-1 me-1" aria-hidden="true"></i>
                                        <i id="accepted_request" class="fa fa-check mt-1"></i> */}
                                    </div>
                                </li>
                            ))
                        }
                        </ul>

                        <div class="card-header bg-light d-flex justify-content-center">
                            Accepted Users <i id="accepted_request" class="fa fa-check ms-1"></i>
                        </div>
                        <ul class="list-group list-group-flush text-start mt-2">
                        {
                            (acceptedUsersList.length === 0) ? 
                            (   <li class="list-group-item d-flex flex-row align-items-center justify-content-center py-3 text-secondary">
                                    No Users Accepted!
                                </li>
                            )
                            : 
                            (acceptedUsersList.map((user, index) =>
                            (
                                <button className='acceptedUsersBtn' onClick={() => updateCurrentUserForChat(user)}>
                                    <li key={index} class="list-group-item d-flex flex-row align-items-center py-1">
                                        <div className='profile_pic_div me-2'>
                                            <img src={user.profilePic} class="profile_pic" alt="profile pic" width="35px" height="35px"/> 
                                        </div>
                                        <div className='userName_container'>{user.userName}</div>
                                    </li>
                                </button>

                            )
                            ))
                        }
                        </ul>
                    </div>
                </div>
                <div className='chat_container col-lg-8 col-md-7 col-sm-12 col-xs-12'>
                    <section className="msger">
                        <header className="msger-header">
                            <div className="msger-header-title">
                                <i className="fa fa-comment"></i> Chat Here
                            </div>

                            <div className="msger-header-title">
                                <div className='reqName d-flex flex-row justify-content-center' style={{marginLeft:"-50px"}}>
                                    <div className='profile_div me-1'>
                                        <img src={currentUser.profilePic}/>
                                    </div>
                                    <div className='align-text-bottom'>
                                        <b>{currentUser.userName} </b>
                                    </div>
                                </div>
                            </div>
                            <div className="msger-header-options">
                                <span><i className="fa fa-cog"></i></span>
                            </div>
                        </header>

                        <main ref={msgRef} className="msger-chat">
{/*                             <div className="msg left-msg">
                                <div className="msg-img" style={{ backgroundImage: 'url("../assets/images/profile.jpg")' }}></div>

                                <div className="msg-bubble">
                                    <div className="msg-info">
                                    <div className="msg-info-name">BOT</div>
                                    <div className="msg-info-time">12:45</div>
                                    </div>

                                    <div className="msg-text">
                                    Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
                                    </div>
                                </div>
                            </div>

                            <div className="msg right-msg">
                                <div className="msg-img" style={{ backgroundImage: `url(${bgImg})`}}></div>

                                <div className="msg-bubble">
                                    <div className="msg-info">
                                        <div className="msg-info-name">Sajad</div>
                                        <div className="msg-info-time">12:46</div>
                                    </div>

                                    <div className="msg-text">
                                        You can change your name in JS section!
                                    </div>
                                </div>
                            </div> */}
                        </main>

                        <div className="msger-inputarea">
                            <input type="text" className="msger-input" onKeyDown={handleKeypress} onChange={sendCurrentMessage} value={messageSent} placeholder="Enter your message..."/>
                            <button type="submit" onClick={()=>sendMessage(currentUser)} class="msger-send-btn">Send</button>
                        </div>
                    </section>
                </div>
            </div>
   
            {isOpen && (
                <div class="myModal">
                    <article class="modal-container">
                        <header class="modal-container-header">
                            <h1 class="modal-container-title">
                                <i id="send_request" class="fa fa-user-plus me-1" aria-hidden="true"></i>
                                New Request
                            </h1>
                            <button class="icon-button" onClick={() => setIsOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path fill="currentColor" d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                                </svg>
                            </button>
                        </header>
                        <section class="modal-container-body rtf">
                            Request to connect from:  &nbsp; <br/>
                            <div className='reqName d-flex flex-row justify-content-center'>
                                <div className='profile_div me-1'>
                                    <img src={userRequest.profilePic}/>
                                </div>
                                <div className='align-text-bottom'>
                                    <b>{userRequest.userName}</b>
                                </div>
                            </div>
                        </section>
                        <footer class="modal-container-footer">
                            <button class="button is-ghost" onClick={() => setIsOpen(false)}>Decline</button>
                            <button class="button is-primary" onClick={() => acceptReq(userRequest.userId)}>Accept</button>
                        </footer>
                    </article>
                </div>
            )}

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>

    )
}

export default Chat