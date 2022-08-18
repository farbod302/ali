const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
require('dotenv').config()

const mongoose = require("mongoose")

app.use(bodyParser.json({ limit: '700mb' }));
app.use(bodyParser.urlencoded({ limit: '700mb', extended: true }));
app.use(cors())

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZmFyYm9kIiwibGFzdE5hbWUiOiJhbGlha2JhcmkiLCJwaG9uZSI6IjA5MDM2OTMzODgxIiwiYWRtaW4iOnRydWUsImlhdCI6MTY2MDIyMTg4OX0.5cJ7-4M5C3EDQetgkI_bczCGpzHpcEGQDalwVTKLQG0


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


const upload = require("./routs/upload")
const { jwt_verify } = require("./helper")
app.use("/upload", upload)


mongoose.connect(process.env.DB, () => {
    console.log("connected to db");
})
app.listen(2323, () => { console.log("server is runing on port 2323"); })