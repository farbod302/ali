const mongoose = require("mongoose")



const article = mongoose.Schema({

    title: String,
    img: String,
    sum: String,
    date: String,
    active: {
        type: Boolean,
        default: true
    },
    view: {
        type: Number,
        default: 0
    },
    content: String
})


module.exports = mongoose.model("Article", article)