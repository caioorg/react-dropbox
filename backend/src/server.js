const express = require('express')
const mongoose = require('mongoose')
const path = require ('path')
const cors = require('cors')

//Enabling requests for different routes
const app = express()
app.use(cors())

//Watch request real time socket.io
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box)
    })
})

app.use((req, res, next) => {
    req.io = io

    return next()
})

//Middleware format
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Import routes api
app.use(require('./routes'))

//Definition use port
server.listen(3333)

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

//Connect database cluster MongoDB Atlas
mongoose.connect('mongodb+srv://react-dropbox:react-dropbox@cluster0-5ylss.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
})
