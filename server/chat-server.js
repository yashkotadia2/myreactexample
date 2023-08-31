const express = require('express');
const app = express();
const PORT = 4000;
const http = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "https://client-61ti.onrender.com",
    }
});
app.use(cors());


var users = []

socketIO.on('connection', (socket) => {

    console.log(`⚡: ${socket.id} user just connected!`);


    socket.on("onConnect",((user) => {

        if(!users.find(e => e.userId === user.userId))
        {
            user.socket_id = socket.id
            users.push(user)
            socketIO.emit("onlineUsers",users)

        }
        console.log("USERS:", users);
    }));

    socket.on("message",((user) => {

/*         if(!users.find(e => e.userId === user.userId))
        {
            user.socket_id = socket.id
            users.push(user)
        } */
        console.log("MESSAGE --- USER:", user);

        socket.to(user.to.socket_id).emit('messageFromServer', user.from);


        //socket.broadcast.emit('messageFromServer', user); 
/* 
        let ourUser = users.find(e => e.userId ===  user.userId)
         if(ourUser != null)
        {
            socket.to(user.socket_id).emit('messageFromServer', user);
        } */
    }));


    socket.on("connectRequest",((reqUser) => {
        console.log(reqUser);
        for (var j = 0; j < users.length; j++) 
        {
            var obj = users[j];

            if (obj.userId == reqUser.fromUserID) {
                socket.to(reqUser.toSocketID).emit("userReqSent", users[j]);
                console.log("REQ USER:",users[j]);
            }
        }

/*         toUser = users.find(e => e.socket_id === reqUser.toSocketID);
        fromSocket = users.find(e => e.userId === reqUser.fromUserID);


        for (var k = 0; k < users.length; k++) 
        {
            var obj = users[k];

            if (obj.userId == toUser.userId) {
                socket.to(fromSocket.socket_id).emit("userReqSent", users[k]);
                console.log("REQ USER:",users[k]);
            }
        } */
     }));


    socket.on("handleAcceptedReq",((IDS) => {
        let u = users.find(e => e.userId === IDS.clientID)
        u.acceptedUsers.push(IDS.acceptedID)

        let v = users.find(e => e.userId === IDS.acceptedID)
        v.acceptedUsers.push(IDS.clientID)

        socket.emit("acceptedUsersList", users)

        socket.to(v.socket_id).emit("notifyAccepted", u);


        console.log("USERS:", users);
    }));

    // socket.emit("onlineUsers",users)
    console.log("USERS onlineUsers:", users);

    socket.on('disconnect', () => {

        for (var i = 0; i < users.length; i++) 
        {
            var obj = users[i];

            if (obj.socket_id == socket.id) {
                users.splice(i, 1);
            }
        }
      console.log(`🔥: ${socket.id} disconnected`);
      //socket.emit("onlineUsers",users)
      socketIO.emit("onlineUsers",users)
      socketIO.emit("acceptedUsersList", users)


      console.log("USERS after del:", users);
    });
});

  
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

