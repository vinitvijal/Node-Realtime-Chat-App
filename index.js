const express = require('express')
const app = express()
const http = require('http')
const cors =  require('cors')
const { Server } = require('socket.io')

app.use(cors())

const server = http.createServer(app)


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET','POST']
    }
})


io.on("connection", (socket) => {
    console.log('Connected Bro', socket.id)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User : ${socket.id} joined room: ${data}`)
    })

    socket.on('send_message', (messageData) => {
        socket.to(messageData.room).emit('receive_message', messageData)
        console.log(messageData)
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id)
    })
})




server.listen(3001, () => {
    console.log('Server is running')
})