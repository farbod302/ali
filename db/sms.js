const mongoose = require("mongoose")



const sms = mongoose.Schema({

    phone: String,
    code: Number,
    date: Number,
    use:{
        type:Boolean,
        default:false
    }
})


module.exports = mongoose.model("Sms", sms)