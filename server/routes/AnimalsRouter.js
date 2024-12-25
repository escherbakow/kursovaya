const Router = require('express');
const animalsController = require('../controllers/AnimalsController');
const router = new Router();

router.get('/', animalsController.getAll); 
router.get('/:id', animalsController.getOne); 
router.post('/', animalsController.create); 
router.delete('/:id', animalsController.delete); 

module.exports = router;