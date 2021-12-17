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

module.exports =  new ArticleContoller()