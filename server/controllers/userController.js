const { validationResult } = require('express-validator')
const userService = require('../service/userService');
const commentService = require('../service/commentService')
const ApiError = require('../exceptions/apiError');

class UserContoller {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
      const registration_date = req.requestTime
      const {username, password} = req.body;
      const userData = await userService.registration(username, password, registration_date);
      res.cookie('token', userData.token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.status(200).json(userData);
    } 
    catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      //const {username, password} = req.headers;
      const {username, password} = req.body;
      const userData = await userService.login(username, password);
      res.cookie('token', userData.token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: '/'})
      return res.status(200).json(userData);
    } 
    catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const token = req.headers.cookie.split('=')[1];
      const _token = await userService.logout(token);
      res.clearCookie('token');
      return res.status(200).json(_token);
    } 
    catch (e) {
      next(e);
    }
  }

  async getUser(req, res, next) {
    try {
      const {id: user_id} = req.user
      const user = await userService.user(user_id)
      res.json(user)
    } 
    catch (e) {
      next(e);
    }
  }
  async getUserById(req, res, next) {
    try {
      const user_id = req.params.user_id
      const user = await userService.user(user_id)
      res.json(user)
    } 
    catch (e) {
      next(e);
    }
  }
  async getUserByName(req, res, next) {
    try {
      const query = req.params.name
      console.log(query)
      const users = await userService.userByName(query)
      res.json(users)
    } 
    catch (e) {
      next(e);
    }
  }
  async updateUser(req, res, next) {
    try {
      const {id: user_id, roles} = req.user
      const {id, username, name, surname, email, roles: newRoles} = req.body.user
      const newToken = await userService.updateUser(user_id, roles, id, username, name, surname, email, newRoles)
      if(id === user_id && newToken) {
        res.cookie('token', newToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: '/'})
      }
      return res.status(200).json({message: "Пользователь был успешно изменён"})
    } 
    catch(e) {
      next(e);
    }
  }
  async editPassword(req, res, next){
    try{
      const {id: user_id} = req.user
      const {oldPass, newPass} = req.body.input
      const data = await userService.editPassword(user_id, oldPass, newPass)
      res.cookie('token', data.token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: '/'})
      return res.status(200).json({message: "Пользователь был успешно изменён"})
    }
    catch(e){
      next(e);
    }
  }
  async deleteUser(req, res, next){
    try{
      const {id: user_id, roles} = req.user
      const {id} = req.body
      if(id === user_id) {
        res.clearCookie('token');
      }
      await userService.deleteUser(user_id, roles, id)
      return res.status(200).json({message: "Пользователь был успешно удалён"})
    }
    catch(e){
      next(e);
    }
  }
  async banUser(req, res, next){
    try{
      const {roles} = req.user
      const {user_id} = req.body
      await userService.banUser(user_id, roles)
      return res.status(200).json({message: "Пользователь был успешно заблокирован"})
    }
    catch(e){
      next(e);
    }
  }

  async unbanUser(req, res, next){
    try{
      const {roles} = req.user
      const {user_id} = req.body
      await userService.unbanUser(user_id, roles)
      return res.status(200).json({message: "Пользователь был успешно раззаблокирован"})
    }
    catch(e){
      next(e);
    }
  }

  async addСomment(req, res, next) {
    try {
      const date_of_writing = req.requestTime
      const {id: user_id} = req.user
      if(!user_id && user_id != 0){
        return next(ApiError.ForbiddenRequest("У вас нет доступа"))
      }
      const {text, article_id} = req.body.comment
      const commentData = await commentService.addСomment(user_id, text, article_id, date_of_writing)
      return res.status(200).json({comment_id:commentData.comment_id, date_of_writing:commentData.date_of_writing, message: "Комментарий был успешно создан"})
    } 
    catch (e) {
      next(e);
    }
  }
  async updateComment(req, res, next) {
    try {
      const {id: user_id, roles: role} = req.user
      const {comment_id, text} = req.body.comment
      await commentService.updateComment(user_id, role, comment_id, text)
      res.status(200).json("Комментарий был успешно изменён")
    } 
    catch (e) {
      next(e);
    }
  }
  async deleteСomment(req, res, next) {
    try {
      const {id: user_id, roles: role} = req.user
      const {comment_id} = req.body
      await commentService.deleteСomment(user_id, role, comment_id)
      res.status(200).json("Комментарий был успешно удалён")
    } 
    catch (e) {
      next(e);
    }
  }
  async saveArticle(req, res, next){
    try{
      const {id: user_id} = req.user
      const {article_id} = req.body
      await userService.saveArticle(user_id, article_id)
      res.status(200).json("Статья была успешно сохранена")
    }
    catch(e){
      next(e)
    }
  }
  async deleteArticle(req, res, next){
    try{
      const {id: user_id} = req.user
      const {article_id} = req.body
      await userService.deleteArticle(user_id, article_id)
      res.status(200).json("Статья была успешно сохранена")
    }
    catch(e){
      next(e)
    }
  }
  async getSavedArticles(req, res, next){
    try {
      const user_id = req.params.user_id
      const articles = await userService.getSavedArticles(user_id)
      res.status(200).json(articles)
    }
    catch(e) {
      //res.status(204).json(undefined)
      next(e);
    }
  }
  async getArticlesToChange(req, res, next){
    try {
      const {id: user_id, roles: role} = req.user
      const articles = await userService.getArticlesToChange(user_id, role)
      res.status(200).json(articles)
    }
    catch(e) {
      //res.status(204).json(undefined)
      next(e);
    }
  }
}


module.exports =  new UserContoller()