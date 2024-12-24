const Router = require('express')
const router = new Router()
const ReviewsController = require('../controllers/ReviewsController')

router.post('/', ReviewsController.create)
router.get('/', ReviewsController.getAll)

module.exports=router