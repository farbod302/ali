const express = require('express')
const Courses = require('../db/courses')
const router = express.Router()

router.post("/add", (req, res) => {
    const new_course = { ...req.body }
    new Courses(new_course).save()
    res.json({
        status: true,
        msg: "دوره اضافه دش",
        data: {}
    })
})

router.post("/edit", async (req, res) => {
    const { id } = req.body
    let keys = Object.keys(req.body)
    let exist_course = await Courses.findById(id)
    if (!exist_course) {
        res.json({
            status: false,
            msg: "دوره نامعتبر",
            data: {}
        })
        return
    }

    let query = {}
    keys.forEach(key => {
        query[key] = req.body[key]
    })
    delete query.token
    delete query.id

    await Courses.findByIdAndUpdate(id, { $set: query })
    res.json({
        status: true,
        msg: "دوره ویرایش شد",
        data: {}
    })
})

router.post("/add_videos",async (req, res) => {
    await Courses.findByIdAndUpdate(req.body._id, { $push: { videos: { ...req.body } } })
    res.json({
        status: true,
        msg: "ویدئو اضافه شد",
        data: {}
    })

})




module.exports = router