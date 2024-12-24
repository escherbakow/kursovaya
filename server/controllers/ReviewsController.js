const {Reviews} = require('../models/models')
const ApiError = require('../error/ApiError');

class ReviewsController {
    async create(req, res) {
        const {mark, information} = req.body
        const review = await Reviews.create({mark, information})
        return res.json(review)
    }

    async getAll(req, res) {
        const review = await Reviews.findAll()
        return res.json(review)
    }

}

module.exports = new ReviewsController()