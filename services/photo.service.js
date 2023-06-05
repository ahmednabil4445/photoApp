
const { model } = require('mongoose')
const { count } = require('../models/photo.model')
const photoModel = require('../models/photo.model')

module.exports.addPhoto = async (req, res) => {

    const { createdBy } = req.body
    console.log(req.file)
    console.log(req.file.filename)
    if (req.file) {
        await photoModel.insertMany({ path: req.file.filename, createdBy });
        res.json({ message: "success" })
    } else {
        res.json({ message: "image only" })

    }
}


module.exports.up = async (req, res) => {
    const { post_id, createdBy } = req.body

    let post = await photoModel.findOne({ post_id, up: { $in: [createdBy] } })
    if (post) {
        await photoModel.findByIdAndUpdate(post_id, { $inc: { count: -1 }, $pull: { up: createdBy } })
        res.json({ message: "success", like: 'false' })
    } else {
        await photoModel.findByIdAndUpdate(post_id, { $inc: { count: 1 }, $push: { up: createdBy }, $pull: { down: createdBy } })
        res.json({ message: "success", like: 'true' })
    }

}




module.exports.down = async (req, res) => {
    const { post_id, createdBy } = req.body

    let post = await photoModel.findOne({ post_id, down: { $in: [createdBy] } })
    if (post) {
        await photoModel.findByIdAndUpdate(post_id, { $inc: { count: 1 }, $pull: { down: createdBy } })
        res.json({ message: "success", like: 'false' })
    } else {
        await photoModel.findByIdAndUpdate(post_id, { $inc: { count: -1 }, $push: { down: createdBy }, $pull: { up: createdBy } })
        res.json({ message: "success", like: 'true' })
    }
}

module.exports.getPhotos = async (req, res) => {
    let PAGE_NUMBER = req.query.page
    if (!PAGE_NUMBER || PAGE_NUMBER <= 0) {
        PAGE_NUMBER = 1

    }
    let PAGE_LIMIT = 5
    let SKIP = (PAGE_NUMBER - 1) * PAGE_LIMIT
    let count = await photoModel.find({}).count()
    let photos = await photoModel.find({}).sort({ count: -1 }).populate("createdBy up down", "name -_id")
        .skip(SKIP).limit(PAGE_LIMIT)
    res.json({ pages: Math.ceil(count / PAGE_LIMIT), page: PAGE_NUMBER, message: "success", photos })

}