const Router = require('express')
const router = new Router()
const articleController = require('../controllers/articleController.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

router.get('/articles', articleController.getArticles)
router.get('/best_articles', articleController.getBestArticles)
router.get('/articles_by_title/:title', articleController.getArticlesByTitle)
router.get('/articles/:tag', articleController.getArticlesByTag)
router.get('/article/:id', articleController.getOneArticle)
router.post('/add_article', authMiddleware, articleController.addArticle)
router.put('/update_article', authMiddleware, articleController.updateArticle)
router.delete('/delete_article', authMiddleware, articleController.deleteArticle)
router.post('/upload_picture_preview', authMiddleware, articleController.uploadPicturePreview)
router.post('/upload_pictures_article', authMiddleware, articleController.uploadPicturesArticle)
router.delete('/remove_picture_preview', authMiddleware, articleController.removePicturePreview)
router.delete('/remove_pictures_article', authMiddleware, articleController.removePicturesArticle)

module.exports = router
