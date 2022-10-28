const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});

const users = {}
const groups = {}


io.on('connection', async(socket) => {
    socket.on('new-user', (room, name, userDataFromFE) => {
        console.log(userDataFromFE);
        //For host
        // {host:true, player:false, roomId:"144", roundValue:"3", userName:"Bilal"}

        // For player
        // {host:false, player:true, roomId:"144" userName:"abhi"}
        if (!room) {
            users[socket.id] = name
            io.sockets.in(socket.id).emit('public-room', room)
            socket.broadcast.emit('user-connected', name)
        } else {

            //Checking wether the group is created or not
            if (io.sockets.adapter.rooms[room] == undefined) {
                socket.join(room)
                socket.to(room).emit('room-joined', name)
                joinroom(room, 1, name, socket.id)

            } else {
                const roomSize = io.sockets.adapter.rooms[room].length

                if (roomSize === 4) {
                    console.log(groups[room])
                    io.sockets.in(socket.id).emit('unsuccessfull-msg', name)
                        // console.log(Object.keys(io.sockets.adapter.rooms[room].sockets))

                } else {
                    socket.join(room)
                    socket.to(room).emit('room-joined', name)
                    joinroom(room, roomSize + 1, name, socket.id)

                }
            }

        }
    })


    socket.on('send-chat-message', (message, room) => {
        if (room === "") {
            socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
        } else {
            socket.to(room).emit('chat-message', { message: message, name: users[socket.id] })
        }

    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})

function joinroom(room, roomSize, name, id) {
    
        console.log(room,name);
    io.sockets.in(id).emit('private-room', room)
    users[id] = name
    let group = []
    if (roomSize != 1) {
        group = groups[room]
    }
    const user = {
        'user id': roomSize,
        'Name': name,
        'point': parseInt(0),
    }

    group.push(user)
    groups[room] = group
}
console.log("Server is running");

server.listen(5009, () => {
  console.log("SERVER IS RUNNING");
});