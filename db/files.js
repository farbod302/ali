const mongoose = require("mongoose")



const upload = mongoose.Schema({

    address: String,
    name: String,
    format: String,
})


module.exports = mongoose.model("Upload", upload)