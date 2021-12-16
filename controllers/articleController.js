const db = require('../db.js')

class ArticleContoller {
  async getArticles(req, res){
    const articles = await db.query(`SELECT * FROM public."Articles"`)
    res.status(200).json(articles.rows)
  }
  async getBestArticles(req, res){
    res.status(200).json(articles.rows)
  }
  async getOneArticle(req, res){
    const id = req.params.id
    const article = await db.query(`SELECT * FROM public."Articles" WHERE article_id = $1`, [id])
    res.status(200).json(article.rows[0])
  }
  async getBestArticle(req, res){
    const articles = await db.query(`SELECT * FROM public."Articles" WHERE best = true LIMIT 1`)
    res.status(200).json(articles.rows[0])
  }
  async getArticlesByTag(req, res){
    const tag = req.params.tag
    const articles = await db.query(`SELECT * FROM public."Articles" WHERE tag = $1`, [tag])
    res.status(200).json(articles.rows)
  }
}

module.exports =  new ArticleContoller()