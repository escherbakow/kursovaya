const Router = require('express');
const CategoriesController = require('../controllers/CategoriesController');
const router = new Router();


router.get('/', CategoriesController.getAll);
router.post('/', CategoriesController.create)

module.exports = router;