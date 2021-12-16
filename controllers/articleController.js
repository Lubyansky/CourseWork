const db = require('../db.js')

class ArticleContoller {
  async getArticles(req, res){
    const articles = await db.query(`SELECT * FROM public."Articles"`)
    res.status(200).json(articles.rows)
  }
  async getOneArticle(req, res){
    const id = req.params.id
    const article = await db.query(`SELECT * FROM public."Articles" WHERE article_id = $1`, [id])
    res.status(200).json(article.rows[0])
  }
}

module.exports =  new ArticleContoller()