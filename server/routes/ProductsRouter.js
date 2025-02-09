const Router = require('express');
const productsController = require('../controllers/ProductsController');
const router = new Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getOne); 
router.post('/', productsController.create);
router.delete('/:id', productsController.delete)


module.exports = router;