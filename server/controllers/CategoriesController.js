const {Categories} = require('../models/models')
const ApiError = require('../error/ApiError');

class CategoriesController {
    async create(req, res) {
        const {name} = req.body
        const categories = await Categories.create({name})
        return res.json(categories)
    }

    async getAll(req, res) {
        const name = await Categories.findAll()
        return res.json(name)
    }

    async getOne(req, res) {
        const {id} = req.params
        const categories = await Categories.findOne({where: {id}},
        )
        return res.json(categories)
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params; // Извлекаем id из параметров маршрута
            
            // Проверяем, существует ли товар с таким id
            const categories = await Categories.findOne({ where: { id } });
            if (!categories) {
                return next(ApiError.badRequest(`category with id ${id} not found`));
            }
    
            // Удаляем товар
            await Categories.destroy({ where: { id } });
    
            return res.json({ message: `category with id ${id} successfully deleted` });
        } catch (e) {
            return next(ApiError.internal(`Failed to delete category: ${e.message}`));
        }
    }
}

module.exports = new CategoriesController()