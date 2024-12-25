const Router = require('express');
const CategoriesController = require('../controllers/CategoriesController');
const router = new Router();


router.get('/', CategoriesController.getAll);
router.get('/:id', CategoriesController.getOne);
router.post('/', CategoriesController.create)
router.delete('/:id', CategoriesController.delete)

module.exports = router;