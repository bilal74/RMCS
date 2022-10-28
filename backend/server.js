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
    socket.on('new-user', (data) => {

        if (!data.roomId) {
            console.log("Room Id nakho re baba")
            users[socket.id] = data.userName
            io.sockets.in(socket.id).emit('public-room', data.roomId)
            socket.broadcast.emit('user-connected', data.userName)
        } else {


            //Assigning the values to local variables
            let room = data.roomId
            let name = data.userName
            let host = data.host
            let roundVal = data.roundValue

            // Checking wether room is full or not using room Indicator values
            if (getaccess(room) != 3) {
                joinroom(room, name, socket.id, host, roundVal, getaccess(room))
                socket.emit('DataFromBE', { insert: true, values: groups[room], members: groups[room].length - 1 })
            } else {
                console.log("Room is full and details are : \n", groups[room])
                socket.emit('DataFromBE', { insert: false, values: groups[room], members: 4 })
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


function getaccess(room) {
    if (groups[room] == undefined)
        return 1
    else if (groups[room].length > 4)
        return 3
    else
        return 2
}

function joinroom(room, name, id, hostVal, roundValue, roomIndicator) {

    // io.sockets.in(id).emit('private-room', room)
    users[id] = name
    let group = []

    if (roomIndicator == 1) {
        group.push(roundValue)
    }

    if (roomIndicator == 2) {
        group = groups[room]

    }
    const user = {
        'user id': id,
        'Name': name,
        'Host': hostVal,
        'point': parseInt(0),
    }

    group.push(user)
    groups[room] = group
    console.log(name + "  has joined room " + room + " Successfully with id " + id)

}

server.listen(5009, () => {
    console.log("SERVER IS RUNNING");
});
