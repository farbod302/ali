const express = require('express')
const User = require('../db/user')
const router = express.Router()
const jwt = require("jsonwebtoken")
const { send_sms } = require('../helper')
const Sms = require('../db/sms')



router.post("/send_sms", async (req, res) => {

    const { phone } = req.body


    if (!phone || phone.length !== 11 || !phone.startsWith("09")) {
        res.json({
            status: false,
            msg: "شماره تماس نامعتبر است",
            data: {}
        })
        return
    }

    let is_exist = await User.findOne({ phone: phone })


    let random_num = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000

    let msg = `کد تایید شما درسایت :${random_num}`
    send_sms(phone, msg)
    console.log(random_num);
    let new_sms = {
        phone,
        code: random_num,
        date: Date.now(),
    }
    await Sms.findOneAndDelete({ phone: phone })
    await new Sms(new_sms).save()
    
    res.json({
        status: true,
        msg: "پیامک تایید برای شما ارسال شد",
        data: {
            is_exist: is_exist ? true : false
        }
    })



})


router.post("/sign_up", async (req, res) => {

    const { phone, name, lastName, code } = req.body
    const new_user = {
        name, lastName, phone
    }

    let is_exist = await User.findOne({ phone: phone })
    if (is_exist) {
        res.json({
            status: false,
            msg: "کاربر از قبل ثب است",
            data: {}
        })
        return
    }
    let s_code = await Sms.findOne({ phone: phone, use: false })
    if (!s_code || s_code?.code != code) {
        res.json({
            status: false,
            msg: "کد تایید نامعتبر",
            data: {}
        })
        return
    }

    User(new_user).save()
    await Sms.findOneAndUpdate({ phone: phone }, { $set: { use: true } })

    let token = jwt.sign(new_user, process.env.JWT)

    res.json({
        status: true,
        msg: "کاربر ثبت شد",
        data: {
            token
        }
    })



})


router.post("/log_in", async (req, res) => {
    const { phone, code } = req.body

    let s_code = await Sms.findOne({ phone: phone, use: false })

    if (!s_code || s_code?.code != code) {
        res.json({
            status: false,
            msg: "کد تایید نامعتبر",
            data: {}
        })
        return
    }

    let user = await User.findOne({ phone: phone }, { _id: 0, __v: 0, })
    if (!user) {
        res.json({
            status: false,
            msg: "کاربری یافت نشد",
            data: {}
        })
        return
    }

    let token = jwt.sign({ ...user._doc }, process.env.JWT)

    await Sms.findOneAndUpdate({ phone: phone }, { $set: { use: true } })
    res.json({
        status: true,
        msg: "خوش آمدید!",
        data: {
            token
        }
    })
})





module.exports = router