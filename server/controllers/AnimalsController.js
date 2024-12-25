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

    async getOne(req, res) {
        const {id} = req.params
        const animals = await Animals.findOne({where: {id}},
        )
        return res.json(animals)
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params; // Извлекаем id из параметров маршрута
    
            const animal = await Animals.findOne({ where: { id } }); 
            if (!animal) {
                return next(ApiError.badRequest(`Animal with id ${id} not found`));
            }
    
            await Animals.destroy({ where: { id } });
    
            return res.json({ message: `Animal with id ${id} successfully deleted` });
        } catch (e) {
            console.error(`Error deleting animal: ${e.message}`); // Логируем ошибку
            return next(ApiError.internal(`Failed to delete animal: ${e.message}`));
        }
    }
}



module.exports = new AnimalsController()