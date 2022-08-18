const express = require('express')
const Article = require('../db/article')
const router = express.Router()


router.post("/new", async (req, res) => {
    let date = Date.now()
    let new_art = { ...req.body }
    new_art["date"] = date
    await new Article(new_art).save()
    res.json({
        status: true,
        msg: "مقاله اضافه شد",
        data: {}
    })
})

router.post("/edit", async (req, res) => {
    const { id } = req.body
    let new_data = { ...req.body }
    await Article.findByIdAndRemove(id)
    new Article(new_data).save()
    res.json({
        status: true,
        msg: "مقاله ویرایش شد",
        data: {}
    })
})

router.post("/activation",async (req, res) => {
    const { id, active } = req.body
    await Article.findByIdAndUpdate(id, { $set: { active: active } })
    res.json({
        status: true,
        msg: "مقاله ویرایش شد",
        data: {}
    })
})


module.exports = router