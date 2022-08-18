const mongoose = require("mongoose")



const user = mongoose.Schema({

    name: String,
    lastName: String,
    phone: String,
    admin: {
        type: Boolean,
        default: false
    }

})


module.exports = mongoose.model("User", user)