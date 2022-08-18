const express = require('express');
const { uid } = require('uid');
const router = express.Router()
const fs = require("fs");
const { base_url } = require('../static_vars');
const { jwt_verify } = require('../helper');
const Upload = require("../db/files")

router.post("/", (req, res) => {


    const { base64, token } = req.body
    let user = jwt_verify(token)
    if (!token || !user || user?.admin === false) {
        res.json({
            status: false,
            msg: "فقط ادمین اجازه آپلود دارد",
            data: {}
        })
        return
    }
    let start_index = base64.indexOf("/")
    let end_index = base64.indexOf(";")
    let format = base64.slice(start_index + 1, end_index)
    let base64Data = base64.replace(/^data:(.*?);base64,/, "");
    base64Data = base64Data.replace(/ /g, '+');
    let fileName = uid(5)
    fs.writeFile(`${__dirname}/../files/${fileName}.${format}`, base64Data, 'base64', function (err) {
        if (err) {
            res.json({
                status: false,
                msg: "بارگذاری ناموفق بود",
                data: {}
            })
            return
        }


        let new_file = {
            name: fileName + "." + format,
            address: `${base_url}/files/${fileName}.${format}`,
            format: "." + format
        }
        new Upload(new_file).save()

        res.json({
            status: true,
            msg: "فایل بارگزاری شد",
            data: {
                url: `${base_url}/files/${fileName}.${format}`
            }
        })

    });



})


router.get("/list",async (req, res) => {
    const files = await Upload.find()
    res.json(files)
})

module.exports = router
