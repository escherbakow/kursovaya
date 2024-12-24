const {Animals} = require('../models/models')
const ApiError = require('../error/ApiError');

class AnimalsController {
    async create(req, res) {
        const {name} = req.body
        const animals = await Animals.create({name})
        return res.json(animals)
    }

    async getAll(req, res) {
        const animals = await Animals.findAll()
        return res.json(animals)
    }

}

module.exports = new AnimalsController()