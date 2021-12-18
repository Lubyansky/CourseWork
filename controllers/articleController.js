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


//↓↓↓↓↓↓ снимаем комментарий
/*
const db = require('../db.js')

class ArticleContoller {
  async getArticles(req, res){
    try {
      const articles = await db.query(`SELECT * FROM public."Articles" ORDER BY article_id`)
      res.status(200).json(articles.rows)
    }
    catch(e) {
      res.status(204).json(undefined)
    }
  }
  async getOneArticle(req, res){
    try {
      const id = req.params.id
      const article = await db.query(`SELECT * FROM public."Articles" WHERE article_id = $1 ORDER BY article_id`, [id])
      res.status(200).json(article.rows[0])
    }
    catch(e) {
      res.status(204).json(undefined)
    }
  }
  async getBestArticles(req, res){
    try{
      const articles = await db.query(`SELECT * FROM public."Articles" WHERE best = true ORDER BY article_id`)
      res.status(200).json(articles.rows)
    }
    catch(e) {
      res.status(204).json(undefined)
    }
  }
  async getBestArticle(req, res){
    try {
      const articles = await db.query(`SELECT * FROM public."Articles" WHERE best = true ORDER BY article_id LIMIT 1 `)
      res.status(200).json(articles.rows[0])
    }
    catch(e) {
      res.status(204).json(undefined)
    }
  }
  async getArticlesByTag(req, res){
    try {
      const tag = req.params.tag
      const articles = await db.query(`SELECT * FROM public."Articles" WHERE tag = $1 ORDER BY article_id`, [tag])
      res.status(200).json(articles.rows)
    }
    catch(e) {
      res.status(204).json(undefined)
    }
  }
}
*/

//↓↓↓ не трогаем
module.exports =  new ArticleContoller()