const Router = require('express')
const router = new Router()
const articleController = require('../controllers/articleController.js')

router.get('/articles', articleController.getArticles)
router.get('/article/:id', articleController.getOneArticle)

module.exports = router
