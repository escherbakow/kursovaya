const {Products} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class ProductsController {
    async create(req, res, next) {
        try {
            const { price, name, weight, information, animalId, categoryId} = req.body;
            const { img } = req.files;

            if (!img) {
                return next(ApiError.badRequest('Image file is missing'));
            }

            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const product = await Products.create({  
                price, 
                name, 
                weight, 
                information,
                animalId,
                categoryId,
                img: fileName 
            });

            return res.json(product);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const { animalId, categoryId } = req.query; // Извлекаем параметры из строки запроса
    
            let filterOptions = {};
    
            // Если переданы параметры фильтрации, добавляем их в фильтр
            if (animalId) {
                filterOptions.animalId = animalId;
            }
            if (categoryId) {
                filterOptions.categoryId = categoryId;
            }
    
            // Запрашиваем продукты с учетом фильтров
            const products = await Products.findAll({ where: filterOptions });
    
            return res.json(products);
        } catch (e) {
            return next(ApiError.internal('Failed to fetch products: ' + e.message));
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Products.findOne({where: {id}},
        )
        return res.json(product)
    }
    
    async delete(req, res, next) {
        try {
            const { id } = req.params; // Извлекаем id из параметров маршрута
            
            // Проверяем, существует ли товар с таким id
            const product = await Products.findOne({ where: { id } });
            if (!product) {
                return next(ApiError.badRequest(`Product with id ${id} not found`));
            }
    
            // Удаляем товар
            await Products.destroy({ where: { id } });
    
            return res.json({ message: `Product with id ${id} successfully deleted` });
        } catch (e) {
            return next(ApiError.internal(`Failed to delete product: ${e.message}`));
        }
    }

}
    module.exports = new ProductsController();