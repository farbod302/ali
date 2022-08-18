const mongoose = require("mongoose")



const course = mongoose.Schema({

    name: String,
    dis: String,
    mod: String,
    price: Number,
    off: {
        type: Number,
        default: 0
    },
    videos: {
        type: Array,
        default: []
    },
    att: {
        type: Array,
        default: []
    },
    img: String,
    tags: {
        type: Array,
        default: []
    },

})


module.exports = mongoose.model("Course", course)