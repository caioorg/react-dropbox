const moongose = require('mongoose')

const box = new moongose.Schema({
    title: {
        type: String,
        required: true
    },
    files: [
        {
            type: moongose.Schema.Types.ObjectId, ref: 'file'
        }
    ]
},{
    timestamps: true
})

module.exports = moongose.model('box', box)