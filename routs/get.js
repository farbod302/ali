const express = require('express')
const router = express.Router()
const Course = require("../db/courses")
const Article = require("../db/article")


router.get("/courses", async (req, res) => {

    let all_courses = await Course.find({})
    res.json({
        status: true,
        msg: "",
        data: {
            all_courses
        }
    })
})


router.get("/article", async (req, res) => {

    let all_courses = await Article.find({})
    res.json({
        status: true,
        msg: "",
        data: {
            all_courses
        }
    })
})





module.exports = router