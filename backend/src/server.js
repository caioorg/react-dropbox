const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require ('path')

//Middleware format
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Import routes api
app.use(require('./routes'))

//Definition use port
app.listen(3333)

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

//Connect database cluster MongoDB Atlas
mongoose.connect('mongodb+srv://react-dropbox:react-dropbox@cluster0-5ylss.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
})
