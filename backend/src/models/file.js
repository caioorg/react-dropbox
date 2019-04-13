const moongose = require('mongoose')

const file = new moongose.Schema({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    files: []
},{
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

file.virtual('url').get(function() {
    return `http://localhost:3333/files/${encodeURIComponent(this.path)}`
})

module.exports = moongose.model('file', file)
