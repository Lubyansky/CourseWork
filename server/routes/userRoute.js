const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController.js')
const {check} = require("express-validator")
const authMiddleware = require('../middlewares/authMiddleware.js')
const banMiddleware = require('../middlewares/banMiddleware.js')

router.post('/registration', [check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})], 
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout);
router.get('/get_user', authMiddleware, userController.getUser)
router.get('/get_user/:user_id', userController.getUserById)
router.get('/get_user_by_name/:name', userController.getUserByName)
router.put('/update_user', authMiddleware, banMiddleware, userController.updateUser)
router.put('/edit_password', authMiddleware, banMiddleware, userController.editPassword)
router.delete('/delete_user', authMiddleware, banMiddleware, userController.deleteUser)
router.put('/ban_user', authMiddleware, banMiddleware, userController.banUser)
router.put('/unban_user', authMiddleware, banMiddleware, userController.unbanUser)
router.post('/add_comment', authMiddleware, banMiddleware, userController.addСomment)
router.put('/update_comment', authMiddleware, banMiddleware, userController.updateComment)
router.delete('/delete_comment', authMiddleware, banMiddleware, userController.deleteСomment)
router.put('/save_article', authMiddleware, banMiddleware, userController.saveArticle)
router.put('/delete_article', authMiddleware, banMiddleware, userController.deleteArticle)
router.get('/saved_articles/:user_id', userController.getSavedArticles)
router.get('/articles_to_change', authMiddleware, banMiddleware, userController.getArticlesToChange)

module.exports = router





