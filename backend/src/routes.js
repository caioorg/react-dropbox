const express = require('express')

const multer = require('multer')
const multerFile = require('./config/multer')

const boxController = require('./controllers/boxController')
const fileController = require('./controllers/fileController')

const routes = express.Router()


routes.post('/boxes', boxController.store)

routes.get('/boxes/:id', boxController.show)
routes.post(
    '/boxes/:id/upload-files',
    multer(multerFile).single('file'),
    fileController.store
)

module.exports = routes
