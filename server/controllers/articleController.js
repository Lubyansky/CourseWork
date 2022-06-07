const articleService = require('../service/articleService')
const filesService = require('../service/filesService')

class ArticleContoller {
  async getArticles(req, res, next){
    try {
      const articles = await articleService.getArticles()
      res.status(200).json(articles)
    }
    catch(e) {
      //res.status(204).json(undefined)
      next(e);
    }
  }
  async getOneArticle(req, res, next){
    try {
      const id = req.params.id
      const article = await articleService.getOneArticle(id)
      res.status(200).json(article)
    }
    catch(e) {
      //res.status(204).json(undefined)
      next(e);
    }
  }
  async getArticlesByTitle(req, res, next){
    try {
      const query = req.params.title
      const articles = await articleService.getArticleByTitle(query)
      res.status(200).json(articles)
    }
    catch(e) {
      //res.status(204).json(undefined)
      next(e);
    }
  }
  async getBestArticles(req, res, next){
    try{
      const articles = await articleService.getBestArticles()
      res.status(200).json(articles)
    }
    catch(e) {
      //res.status(204).json(undefined)
      next(e);
    }
  }
  async getArticlesByTag(req, res, next){
    try {
      const tag = req.params.tag
      const articles = await articleService.getArticlesByTag(tag)
      res.status(200).json(articles)
    }
    catch(e) {
      //res.status(204).json(undefined)
      next(e);
    }
  }
  async addArticle(req, res, next) {
    try {
      const {user_id, roles} = req.user
      const {title, description, tag, titles, paragraphs, pictures, preview_image, sources} = req.body
      const date_of_creation = req.requestTime

      const status = await articleService.addArticle(user_id, roles, title, description, tag, titles, paragraphs, pictures, preview_image, sources, date_of_creation)
      if(status === 200) {
        return res.status(status).json({message: "Статья была успешно создана"})
      }
      else if(status === 403) {
        return res.status(status).json({message: "У вас нет доступа"})
      }
    } 
    catch (e) {
      next(e);
    }
  }
  async updateArticle(req, res, next) {
    try {
      const {user_id, roles} = req.user
      const {article_id, title, description, tag, titles, paragraphs, pictures, preview_image, sources} = req.body

      const status = await articleService.updateArticle(user_id, roles, article_id, title, description, tag, titles, paragraphs, pictures, preview_image, sources)

      if(status === 200) {
        return res.status(status).json({message: "Статья была успешно изменена"})
      }
      else if(status === 403) {
        return res.status(403).json({message: "У вас нет доступа"})
      }
    } 
    catch (e) {
      next(e);
    }
  }
  async deleteArticle(req, res, next) {
    try {
      const {user_id, roles} = req.user
      const {article_id} = req.body
      const status = await articleService.deleteArticle(user_id, roles, article_id)
      if(status === 200) {
        res.status(status).json("Статья была успешно удалена")
      }
      else if(status === 403) {
        return res.status(403).json({message: "У вас нет доступа"})
      }
    } 
    catch (e) {
      next(e);
    }
  }
  async uploadPicturePreview(req, res, next){
    try{
      const file = req.files.file
      if(!file){
        return res.status(400)
      }
      const article_id = req.body.article_id

      const relativePath = await filesService.uploadPicturePreview(file, article_id)

      return res.status(200).json({path: relativePath})
    }
    catch(e){
      res.status(500).json({message:"Ошибка загрузки"})
      next(e)
    }
  }
  async uploadPicturesArticle(req, res, next){
    try{
      /*const files = req.files
      if(!files){
        return res.status(400)
      }*/
      //const article_id = req.body.article_id
      console.log(Buffer.from(req.body.picture, 'base64').toString('base64'))
      //console.log(JSON.parse(window.atoa(req.body.picture)))
      //const relativePath = await filesService.uploadPicturesArticle(files, article_id)

      return res.status(200).json({path: relativePath})
    }
    catch(e){
      res.status(500).json({message:"Ошибка загрузки"})
      next(e)
    }
  }
  async removePicturePreview(req, res, next){
    try{
      const {article_id} = req.body

      await filesService.deleteDirPreview(article_id)
      
      return res.status(200).json({message: 'Директории успешно удалены'})
    }
    catch(e){
      res.status(500).json({message:"Ошибка удаления"})
      next(e)
    }
  }
  async removePicturesArticle(req, res, next){
    try{
      const {article_id} = req.body

      await filesService.deleteDirArticle(article_id)
      
      return res.status(200).json({message: 'Директории успешно удалены'})
    }
    catch(e){
      res.status(500).json({message:"Ошибка удаления"})
      next(e)
    }
  }
}


module.exports = new ArticleContoller()