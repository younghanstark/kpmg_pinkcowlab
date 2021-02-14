const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();

app.get("/", (req, res) => res.sendFile(`${__dirname}/views/index.html`));
const server = http.createServer(app);

const io = socketio(server);
io.on("connection", (socket) => {
    const {url} = socket.request;
    console.log(`connected : ${url} : server`);
    socket.on("data", (data) => {
        
        socket.emit("src", data);
    })
    
})

const PORT = process.env.PORT || 3000;

server.listen(3000, () => console.log(`listening on port : ${PORT}`));
