const Router = require('express');
const animalsController = require('../controllers/AnimalsController');
const router = new Router();


router.get('/', animalsController.getAll);
router.post('/', animalsController.create)

module.exports = router;