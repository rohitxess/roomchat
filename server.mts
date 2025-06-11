import {createServer} from "node:https";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV ! == "production";
const hostname = process.env.HOSTNAME  || "localhost";
const port = parseInt(process.env.PORT || "3000", 10)

const app = next({ dev, hostname, port});
const handle = app.getRequestHandler();

app.prepare().then(() => {

    const httpServer = createServer(handle);
    const io = new Server(httpServer);
    
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);
        // ({}) -> this is used to return objects in a arrow function 
            
        socket.on('join-room', ({room, username}) => {
            socket.join(room);
            console.log(`User ${username} joined the room ${room}`)
            socket.to(room).emit('user-joined', `${username} joined the room ${room}`)
        })

        socket.on('disconnect', () => {
            console.log(`User diconnected, ${socket.id}`)
        })

    });
    

    httpServer.listen(port, () => {
        console.log(`Server running on https://${hostname}:${port}`);
    })
})