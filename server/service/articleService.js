const db = require('../db.js')
const filesService = require('../service/filesService')
const commentService = require('./commentService.js')
const ApiError = require('../exceptions/apiError');

class articleService {
    async getArticles(){
        var articles = await db.query(`SELECT * FROM public."Articles" ORDER BY tag`)
        articles = await commentService.attachComments(articles)
        return articles.rows
    }
    async getOneArticle(id){
        var article = await db.query(
            `SELECT A.fk_author_id, A.article_id, A.title, A.description, A.tag, A.titles, A.paragraphs, A.pictures,
                A.preview_image, A.date_of_creation, A.sources, A.number_of_views, U.username, U.name, U.surname
                FROM public."Articles" AS A, public."Users" AS U
                WHERE article_id = $1 AND U.user_id = A.fk_author_id`, [id])
        /*const comments = await db.query(
            `SELECT U.username, U.name, U.surname, U.roles, C.text, C.fk_user_id, C.comment_id, C.date_of_writing
                FROM public."Comments" AS C, public."Users" AS U
                WHERE fk_article_id = $1 AND U.user_id = C.fk_user_id
                ORDER BY C.comment_id`, [id])*/

        /*comments.rows.forEach(row =>{
            var result = ''
            row.roles.forEach(role =>{
                if(role == "moderator"){
                    result = "Модератор"
                }
                if(role == "admin"){
                    result = "Администратор"
                }
                if(article.rows[0].fk_author_id == row.fk_user_id && !result.includes("Автор")){
                    if(result) {
                        result += ", "
                    }
                    result += "Автор"
                }
            })
            row.roles = result
        })*/
      
        article.rows[0].number_of_views += 1
        const updateViews = article.rows[0].number_of_views;
        const article_id = article.rows[0].article_id
        await db.query(`UPDATE public."Articles" SET number_of_views = $1 WHERE article_id = $2`, [updateViews, article_id])

        article = await commentService.attachComments(article)
        return article.rows[0]
    }
    async getArticleByTitle(query){
        var result = []
        var articles = await db.query(`SELECT article_id, title FROM public."Articles" WHERE LOWER(title) LIKE LOWER($1) ORDER BY tag`, ['%'+query+'%'])
        articles.rows.forEach(article =>{
            result.push({title: article.title  + " [Статья]", link: '/article/' + article.article_id})
        })
        return result
    }
    async getBestArticles(){
        const COMMENT_WEIGHT = 0.1
        const VIEW_WEIGHT = 0.01
        var articles = await db.query(`SELECT * FROM public."Articles" ORDER BY article_id`)
        articles = await commentService.attachComments(articles)
        var weightCoef = []
        articles.rows.forEach(article =>{
            weightCoef.push([article.article_id, article.comments.length * COMMENT_WEIGHT + article.number_of_views * VIEW_WEIGHT])
        })
        weightCoef.sort(function(a, b) {
            return b[1] - a[1];
        })
        weightCoef = weightCoef.slice(0, 5)
        var bestArticles = []
        weightCoef.forEach(item =>{
            articles.rows.forEach(article =>{
                if(article.article_id === item[0]){
                    bestArticles.push(article)
                }
            })
        })
        return bestArticles
    }
    async getArticlesByTag(tag){
        var articles = await db.query(`SELECT * FROM public."Articles" WHERE tag = $1 ORDER BY tag`, [tag])
        //articles = await this.joinCommentsCount(articles)
        articles = await commentService.attachComments(articles)
        return articles.rows
    }
    async addArticle(user_id, roles, title, description, tag, titles, paragraphs, pictures,
                     preview_image, sources, _date_of_creation) {
      
        const date_of_creation = _date_of_creation.toLocaleString('ru', {
            day:   'numeric',
            month: 'numeric',
            year:  'numeric'
        })
        if(!title){
            throw ApiError.BadRequest('У статьи должно быть название')
        }
        if(!description){
            throw ApiError.BadRequest('У статьи должно быть описание')
        }
        if(!tag){
            throw ApiError.BadRequest('У статьи должен быть тег')
        }
        if(!titles){
            throw ApiError.BadRequest('У статьи должны быть заголовки')
        }
        if(!paragraphs){
            throw ApiError.BadRequest('У статьи должны быть параграфы')
        }
        if(!preview_image){
            throw ApiError.BadRequest('В статье должно присуствовать превью')
        }
        if(roles.includes("admin") || roles.includes("author")) {
            await db.query(`INSERT INTO public."Articles" (article_id, title, description, tag, titles, paragraphs, pictures,
                    preview_image, sources, date_of_creation, fk_author_id, number_of_views)
                VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, default) 
                RETURNING *`, [title, description, tag, titles, paragraphs, pictures,
                preview_image, sources, date_of_creation, user_id])
            return 200
        }
        else {
            return 403
        }
    } 
    async updateArticle(user_id, roles, article_id, title, description, tag, titles, paragraphs, pictures, preview_image, sources) {
        const article =  await db.query(`SELECT fk_author_id FROM public."Articles" WHERE article_id = $1 ORDER BY article_id`, [article_id])
        if(!title){
            throw ApiError.BadRequest('У статьи должно быть название')
        }
        if(!description){
            throw ApiError.BadRequest('У статьи должно быть описание')
        }
        if(!tag){
            throw ApiError.BadRequest('У статьи должен быть тег')
        }
        if(!titles){
            throw ApiError.BadRequest('У статьи должны быть заголовки')
        }
        if(!paragraphs){
            throw ApiError.BadRequest('У статьи должны быть параграфы')
        }
        if(!preview_image){
            throw ApiError.BadRequest('В статье должно присуствовать превью')
        }
        if(user_id === article.rows[0].fk_user_id || roles.includes("admin")) {
            await db.query(
            `UPDATE public."Articles" SET title = $2, description = $3, tag = $4, titles = $5, paragraphs = $6, pictures = $7, preview_image = $8, sources = $9
            WHERE article_id = $1
            RETURNING *`, [article_id, title, description, tag, titles, paragraphs, pictures, preview_image, sources])
            return 200
        }
        else {
            return 403
        }
    }
    async deleteArticle(user_id, roles, article_id) {
        const article = await db.query(`SELECT fk_author_id FROM public."Articles" WHERE article_id = $1 ORDER BY article_id`, [article_id])
        if(user_id === article.rows[0].fk_author_id || roles.includes("admin") || roles.includes("moderator")) {
            await db.query(`DELETE FROM public."Articles" WHERE article_id = $1`, [article_id])
            await filesService.deleteDirPreview(article_id)
            await filesService.deleteDirArticle(article_id)
            return 200
        }
        else {
            return 403
        }
    } 
}


module.exports =  new articleService()