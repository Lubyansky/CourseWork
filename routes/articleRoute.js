const Router = require('express')
const router = new Router()
const articleController = require('../controllers/articleController.js')

router.get('/articles', articleController.getArticles)
router.get('/best-articles', articleController.getBestArticles)
router.get('/best-article', articleController.getBestArticle)
router.get('/article/:id', articleController.getOneArticle)
router.get('/articles/:tag', articleController.getArticlesByTag)

module.exports = router
