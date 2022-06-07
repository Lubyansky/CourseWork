const bcrypt = require('bcrypt');
const mailService = require('./mailService');
const tokenService = require('./tokenService');
const commentService = require('./commentService.js')
const UserModel = require('../models/userModel');
const ApiError = require('../exceptions/apiError');
const db = require('../db.js')

class UserService {
    async registration(username, password, _registration_date) {
        const candidate = await db.query(`SELECT * FROM public."Users" WHERE username = $1 ORDER BY user_id`, [username])
        if (candidate.rows[0]) {
            if(candidate.rows[0].roles.includes('admin')){
                throw ApiError.BadRequest('')
            }
            else throw ApiError.ForbiddenRequest(`Пользователь ${username} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 7);
        const registration_date = _registration_date.toLocaleString('ru', {
            day:   'numeric',
            month: 'numeric',
            year:  'numeric'
        })
        const user = await db.query(`INSERT INTO public."Users" (user_id, username, password, registration_date) VALUES (default, $1, $2, $3) RETURNING *`, [username, hashPassword, registration_date])
        const userModel = new UserModel(user.rows[0]);
        const token = tokenService.generateTokens({...userModel});
        await tokenService.saveToken(userModel.user_id, token);

        return {token, user: userModel}
    }

    async login(username, password) {
        const user = await db.query(
            `SELECT user_id, username, password, name, surname, registration_date, roles, fk_email_id AS email, is_banned
            FROM public."Users"
            WHERE username = $1 
            ORDER BY user_id`, [username])
        if (!user.rows[0]) {
            throw ApiError.BadRequest('Пользователь с таким именем не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.rows[0].password);
        if (!isPassEquals) {
            throw ApiError.ForbiddenRequest("У вас нет доступа")
        }
        const userModel = new UserModel(user.rows[0]);
        const token = tokenService.generateTokens({...userModel});
        await tokenService.saveToken(userModel.user_id, token);
        const User = {
            user_id: user.rows[0].user_id,
            username: user.rows[0].username,
            name: user.rows[0].name,
            surname: user.rows[0].surname,
            registration_date: user.rows[0].registration_date,
            roles: user.rows[0].roles,
            email: user.rows[0].email,
            is_banned: user.rows[0].is_banned
        } 
        console.log(User)
        return {token, user: User}
    }

    async logout(token) {
        const _token = await tokenService.removeToken(token);
        return _token;
    }

    async user(user_id){
        const user = await db.query(
            `SELECT user_id, username, name, surname, registration_date, roles, fk_saved_articles_id AS saved_articles, fk_email_id AS email, is_banned
            FROM public."Users"
            WHERE user_id = $1 
            ORDER BY user_id`, [user_id])
        if(user.rows.length > 0 && user.rows[0].email != null){
            const email = await db.query(
                `SELECT email
                FROM public."Emails"
                WHERE email_id = $1`, [user.rows[0].email])
            user.rows[0].email = email.rows[0].email
        }
        return user.rows[0]
    }

    async userByName(query){
        var result = []
        const queryAsUsername = await db.query(
            `SELECT user_id, username, name, surname
            FROM public."Users"
            WHERE LOWER(username) LIKE LOWER($1)
            ORDER BY user_id`, ['%'+query+'%'])
        queryAsUsername.rows.forEach(user =>{
            const firstName = user.name ? user.name : user.username
            const secondName = user.surname && user.name ? user.surname : ''
            result.push({title: secondName ? firstName + " " + secondName : firstName, link: '/profile/' + user.user_id})
        })
        const queryAsName = await db.query(
            `SELECT user_id, username, name, surname
            FROM public."Users"
            WHERE LOWER(name) LIKE LOWER($1)
            ORDER BY user_id`, ['%'+query+'%'])
        queryAsName.rows.forEach(user =>{
            console.log(user)
            const firstName = user.name ? user.name : user.username
            const secondName = user.surname && user.name ? user.surname : ''
            result.push({title: secondName ? firstName + " " + secondName : firstName, link: '/profile/' + user.user_id})
        })
        const queryAsSurname = await db.query(
            `SELECT user_id, username, name, surname
            FROM public."Users"
            WHERE LOWER(surname) LIKE LOWER($1)
            ORDER BY user_id`, ['%'+query+'%'])
        queryAsSurname.rows.forEach(user =>{
            const firstName = user.name ? user.name : user.username
            const secondName = user.surname && user.name ? user.surname : ''
            result.push({title: secondName ? firstName + " " + secondName : firstName, link: '/profile/' + user.user_id})
        })
        return result;
    }
    
    async updateUser(user_id, roles, id, username, name, surname, email, newRoles){
        if(!username){
            throw ApiError.BadRequest(`Username не должен быть пустым`)
        }
        if(!newRoles.length){
            throw ApiError.BadRequest(`Роли не должны быть пустыми`)
        }
        if(user_id === id || roles.includes("admin") ) {
            var user = {}
            const checkEmail = await db.query(`SELECT email_id FROM public."Emails" WHERE email = $1`, [email])
            if(checkEmail.rows.length == 0 && email != "" && email != null){
                const newEmail = await db.query(`INSERT INTO public."Emails" (email_id, email) VALUES (default, $1) RETURNING *`, [email])
                user = await db.query(`UPDATE public."Users" SET username = $2, name = $3, surname = $4, roles = $5, fk_email_id = $6 
                WHERE user_id = $1 
                RETURNING *`, [id, username, name, surname, newRoles, newEmail.rows[0].email_id])
            }
            else if(checkEmail.rows.length > 0 && email != "" && email != null){
                user = await db.query(`UPDATE public."Users" SET username = $2, name = $3, surname = $4, roles = $5, fk_email_id = $6 
                WHERE user_id = $1 
                RETURNING *`, [id, username, name, surname, newRoles, checkEmail.rows[0].email_id])
            }
            else if(email == "" || email == null){
                user = await db.query(`UPDATE public."Users" SET username = $2, name = $3, surname = $4, roles = $5, fk_email_id = $6 
                WHERE user_id = $1 
                RETURNING *`, [id, username, name, surname, newRoles, null])
            }
            const tokenData = await db.query(
                `SELECT token
                FROM public."Tokens"
                WHERE fk_user_id = $1`, [id])
            if(tokenData.rows[0]){
                const token = tokenData.rows[0].token
                await tokenService.removeToken(token);
                if(user_id === id){
                    const userModel = new UserModel(user.rows[0]);
                    const newToken = await tokenService.generateTokens({...userModel});
                    await tokenService.saveToken(userModel.user_id, newToken);
                    return newToken
                }
            }
        }
        else {
            throw ApiError.ForbiddenRequest("У вас нет доступа")
        }
    }

    async editPassword(user_id, password, newPassword){
        if(!password){
            throw ApiError.BadRequest(`Пароль не должен быть пустым`)
        }
        if(!newPassword){
            throw ApiError.BadRequest(`Новый пароль не должен быть пустым`)
        }
        const user = await db.query(
            `SELECT user_id, username, password, name, surname, registration_date, roles, fk_email_id AS email
            FROM public."Users"
            WHERE user_id = $1 
            ORDER BY user_id`, [user_id])
        const isPassEquals = await bcrypt.compare(password, user.rows[0].password);
        console.log(isPassEquals)
        if(isPassEquals) {
            const hashPassword = await bcrypt.hash(newPassword, 7);
            const user = await db.query(`
                UPDATE public."Users"
                SET password = $2
                WHERE user_id = $1 
                RETURNING *`, [user_id, hashPassword])
            console.log(user)
            const userModel = new UserModel(user.rows[0]);
            const token = tokenService.generateTokens({...userModel});
            await tokenService.saveToken(userModel.user_id, token);
            return {token: token}
        }
        else{
            throw ApiError.ForbiddenRequest("У вас нет доступа")
        }
    }

    async deleteUser(user_id, roles, id){
        if(user_id === id || roles.includes("admin") || roles.includes("moderator")) {
            await db.query(`DELETE FROM public."Users" WHERE user_id = $1`, [id])
            const tokenData = await db.query(
                `SELECT token
                FROM public."Tokens"
                WHERE fk_user_id = $1`, [id])
            if(tokenData.rows[0]){
                const token = tokenData.rows[0].token
                await tokenService.removeToken(token);
            }
        }
        else {
            throw ApiError.ForbiddenRequest("У вас нет доступа")
        }
    }

    async banUser(user_id, roles){
        if(roles.includes("admin") || roles.includes("moderator")) {
            await db.query(`UPDATE public."Users" SET is_banned = $2
                WHERE user_id = $1 
                RETURNING *`, [user_id, true])
            const tokenData = await db.query(
                    `SELECT token
                    FROM public."Tokens"
                    WHERE fk_user_id = $1`, [user_id])
            if(tokenData.rows[0]){
                const token = tokenData.rows[0].token
                await tokenService.removeToken(token);
            }
        }
        else {
            throw ApiError.ForbiddenRequest("У вас нет доступа")
        }
    }

    async unbanUser(user_id, roles){
        if(roles.includes("admin") || roles.includes("moderator")) {
            await db.query(`UPDATE public."Users" SET is_banned = $2
                WHERE user_id = $1 
                RETURNING *`, [user_id, false])
        }
        else {
            throw ApiError.ForbiddenRequest("У вас нет доступа")
        }
    }

    async saveArticle(user_id, article_id){
        try{
            const user = await db.query(`SELECT fk_saved_articles_id
                FROM public."Users"
                WHERE user_id = $1`, [user_id])
            var saved_article = user.rows[0].fk_saved_articles_id
            console.log(saved_article)
            if(!saved_article){
                saved_article = []
                saved_article.push(article_id)
            }
            if(!saved_article.includes(article_id)){
                saved_article.push(article_id)
            }
            await db.query(`UPDATE public."Users" SET fk_saved_articles_id = $2
                WHERE user_id = $1 
                RETURNING *`, [user_id, saved_article])
        }
        catch {
            throw ApiError.ForbiddenRequest("У вас нет доступа")
        }
    }
    async deleteArticle(user_id, article_id){
        try{
            const user = await db.query(`SELECT fk_saved_articles_id
                FROM public."Users"
                WHERE user_id = $1`, [user_id])
            var saved_article = user.rows[0].fk_saved_articles_id
            if(!saved_article.length){
                return;
            }
            if(saved_article.includes(article_id)){
                saved_article.splice(saved_article.findIndex(i => i === article_id), 1)
            }
            await db.query(`UPDATE public."Users" SET fk_saved_articles_id = $2
                WHERE user_id = $1 
                RETURNING *`, [user_id, saved_article])
        }
        catch {
            throw ApiError.ForbiddenRequest("У вас нет доступа")
        }
    }
    async getSavedArticles(user_id){
        const user = await db.query(`SELECT fk_saved_articles_id
                FROM public."Users"
                WHERE user_id = $1`, [user_id])
        const saved_articles = user.rows[0].fk_saved_articles_id
        var query = `SELECT * FROM public."Articles" WHERE `
        if(saved_articles && saved_articles.length > 0){
            var tempQuery = ``
            saved_articles.forEach(id =>{
                if(tempQuery){
                    tempQuery += ` OR `
                }
                tempQuery += `article_id = ${id}`
            })
            query += tempQuery
        }
        else query += 'NULL'
        query += ` ORDER BY tag;`
        var articles = await db.query(query)
        articles = await commentService.attachComments(articles)
        return articles.rows
    }
    async getArticlesToChange(user_id, roles){
        var articles
        if(roles.includes("admin") || roles.includes("moderator")){
            articles = await db.query(`SELECT * FROM public."Articles" ORDER BY article_id`)
        }
        else{
            articles = await db.query(`SELECT * FROM public."Articles" WHERE fk_author_id = $1 ORDER BY article_id`, [user_id])
        }
        articles = await commentService.attachComments(articles)
        return articles.rows
    }
}

module.exports = new UserService();
