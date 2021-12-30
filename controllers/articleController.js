let db = require('../offline_db/db_articles.js')

class ArticleContoller {
  async getArticles(req, res){
    res.status(200).json(db)
  }
  async getOneArticle(req, res){
    const articles = db.filter(a => a.article_id === req.params.id)
    res.status(200).json(articles[0])
  }
  async getBestArticles(req, res){
    const articles = db.filter(a => (a.best === true))
    res.status(200).json(articles)
  }
  async getBestArticle(req, res){
    const articles = db.filter(a => (a.best === true))
    res.status(200).json(articles[0])
  }
  async getArticlesByTag(req, res){
    const articles = db.filter(a => (a.tag === req.params.tag))
    res.status(200).json(articles)
  }
}


module.exports =  new ArticleContoller()