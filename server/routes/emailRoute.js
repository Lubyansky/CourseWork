const Router = require('express')
const router = new Router()
const emailController = require('../controllers/emailController.js')

router.post('/email', emailController.addEmail)

module.exports = router
