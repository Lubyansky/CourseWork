const db = require('../db.js')
const ApiError = require('../exceptions/apiError');

class CommentService {
    async addСomment(user_id, text, article_id, _date_of_writing) {
        const date_of_writing = _date_of_writing.toLocaleString('ru', {
            day:   'numeric',
            month: 'numeric',
            year:  'numeric'
        })
        if(!text){
            throw ApiError.BadRequest('Коментарий не должен быть пустым');
        }
        const commentData = await db.query(`INSERT INTO public."Comments" (comment_id, fk_user_id, text, fk_article_id, date_of_writing) VALUES (default, $1, $2, $3, $4) RETURNING *`, [user_id, text, article_id, date_of_writing])
        return commentData.rows[0]
  
    }
    async updateComment(user_id, roles, comment_id, text) {
        const article = await db.query(`SELECT fk_user_id FROM public."Comments" WHERE comment_id = $1 ORDER BY comment_id`, [comment_id])
        if(!text){
            throw ApiError.BadRequest('Коментарий не должен быть пустым');
        }
        if(user_id === article.rows[0].fk_user_id || roles.includes("moderator") || roles.includes("admin") ) {
            await db.query(`UPDATE public."Comments" SET text = $1 WHERE comment_id = $2 RETURNING *`, [text, comment_id])
        }
        else {
            throw ApiError.ForbiddenRequest("У вас нет доступа")
        } 
    }
    async deleteСomment(user_id, roles, comment_id) {
        const comment =  await db.query(`SELECT fk_user_id FROM public."Comments" WHERE comment_id = $1`, [comment_id])
        if(user_id === comment.rows[0].fk_user_id || roles.includes("admin") || roles.includes("moderator")) {
            await db.query(`DELETE FROM public."Comments" WHERE comment_id = $1`, [comment_id])
        }
        else {
           throw ApiError.ForbiddenRequest("У вас нет доступа")
        }
    }

    async attachComments(articles){
        var comments_query = `SELECT U.username, U.name, U.surname, U.roles, C.text, C.fk_user_id, C.comment_id, C.date_of_writing, C.fk_article_id 
        FROM public."Comments" AS C, public."Users" AS U WHERE `
        articles.rows.forEach((article) => {
            comments_query += `C.fk_article_id = ${article.article_id} AND C.fk_user_id = U.user_id OR `
        })
        if(articles.rows.length > 0){
            comments_query = comments_query.slice(0, -4)
            comments_query += ' ORDER BY C.comment_id;'
        } 
        else comments_query += 'NULL ORDER BY C.comment_id;'
        const comments = await db.query(comments_query)
        articles.rows.forEach(article => {
            article.comments = []
            comments.rows.forEach(comment => {
                if(comment.fk_article_id == article.article_id){
                    article.comments.push(comment)
                }
            })
        })
        return articles
    }
}

module.exports = new CommentService();