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

    //Function for adding a user into a room
    socket.on('new-user', (data) => {

        //Assigning the values to local variables
        let room = data.roomId
        let name = data.userName
        let host = data.host
        let roundVal = data.roundValue

        // Checking wether room is full or not using room Indicator values

        if (getaccess(room) != 3) {
            joinroom(room, name, socket.id, host, roundVal, getaccess(room))
            socket.emit('DataFromBE', { insert: true, values: groups[room], members: groups[room].users.length, msg: "You joined room succesfully" })
        } else {
            console.log("Room is full and details are : \n", groups[room])
            socket.emit('DataFromBE', { insert: false, values: groups[room], members: 4, msg: "Room is Full" })
        }
    })

    //Function for removing a user from room
    socket.on('disconnect', () => {
        if (users[socket.id] != undefined) {
            let room = users[socket.id].slice(0, 3)
            let index = Clearance(socket.id, groups[room].users)
            groups[room].users.splice(index, 1)
            console.log(users[socket.id].slice(3), "with ID", socket.id, "has left the chat room", room)
                // console.log(groups[room])
            delete users[socket.id]
        } else {
            console.log("Next time, join a room before leaving")
        }

    })

    //Function to Update the Scores
    socket.on('Update', (data) => {
        console.log("Scores updated succesfully")
        let room = data.room
        let rounds = data.rounds
        Scores(room, rounds, data.users)
    })

    socket.on('allUser', (roomID) => {

        if (groups[roomID]) {
            console.log("Room ka data", groups[roomID])
            socket.emit('UpdatedData', { insert: true, values: groups[roomID], members: groups[roomID].users.length, msg: "You joined room succesfully" })

        } else {
            console.log("apun ka data", groups)
            socket.emit('UpdatedData', { insert: false, values: "Room not Created", members: 0, msg: "No data to show" })
                // socket.emit('UpdatedData', { val: "Room not Created" })

        }

    })
})


function Scores() {
    console.log("Function Callled now")
}

function Clearance(id, group) {

    for (let i = 0; i < group.length; i++) {
        if (group[i].userId == id) {
            return i
        }
    }
}

function getaccess(room) {
    if (groups[room] == undefined)
        return 1
    else if (groups[room].users.length > 3)
        return 3
    else
        return 2
}

function joinroom(room, name, id, hostVal, roundValue, roomIndicator) {

    // io.sockets.in(id).emit('private-room', room)
    users[id] = room + name
    let group = {}
    let indiv = []

    const user = {
        'userId': id,
        'Name': name,
        'Host': hostVal,
        'point': parseInt(0),
    }

    //Initialising group value
    if (roomIndicator == 1) {
        group["rounds"] = roundValue
        group["room"] = room
        indiv.push(user)
        group["users"] = indiv
    }

    //Inserting new user into the group
    if (roomIndicator == 2) {
        group = groups[room]
        indiv = groups[room].users
        indiv.push(user)
    }

    groups[room] = group
    console.log(name, "has joined room", room, "Successfully with id", id)

}

server.listen(5009, () => {
    console.log("SERVER IS RUNNING");
});
