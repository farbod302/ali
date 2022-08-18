const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
require('dotenv').config()

const mongoose = require("mongoose")

app.use(bodyParser.json({ limit: '700mb' }));
app.use(bodyParser.urlencoded({ limit: '700mb', extended: true }));
app.use(cors())



const check_admin = (req, res, next) => {
    let url = req.url
    if (url.indexOf("admin") > -1) {
        const { token } = req.body
        if (!token) {
            res.json(false)
            return
        }
        let user = jwt_verify(token)
        if (!user.admin) {
            res.json(false)
            return
        }
    }
    next()
}

app.use(check_admin)


app.use("/files", express.static('files'))


const regist = require("./routs/registion")
app.use("/regist", regist)



const article = require("./routs/article")
app.use("/admin/article", article)

const course = require("./routs/courses")
app.use("/admin/course", course)

const { jwt_verify } = require("./helper")

const upload = require("./routs/upload")
app.use("/upload", upload)


const get_data = require("./routs/get")
app.use("/get", get_data)



mongoose.connect(process.env.DB, () => {
    console.log("connected to db");
})
app.listen(2323, () => { console.log("server is runing on port 2323"); })