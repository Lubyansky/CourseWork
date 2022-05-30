const jwt = require('jsonwebtoken');
const {SECRET} = require("../config.js")
const db = require('../db.js')

class TokenService {
    generateTokens(payload) {
        const token = jwt.sign(payload, SECRET, {expiresIn: '48h'})
        return token
    }

    validateToken(token) {
        try {
            const userData = jwt.verify(token, SECRET);
            return userData;
        } 
        catch (e) {
            return null;
        }
    }

    async saveToken(user_id, token) {
        const tokenData = await db.query(`SELECT * FROM public."Tokens" WHERE fk_user_id = $1 ORDER BY fk_user_id`, [user_id])
        if (tokenData.rows[0]) {
            return await db.query(`UPDATE public."Tokens" SET token = $2 WHERE fk_user_id = $1 RETURNING *`, [user_id, token])
        }
        const newToken = await db.query(`INSERT INTO public."Tokens" (fk_user_id, token) VALUES ($1, $2) RETURNING *`, [user_id, token])
        return newToken.rows[0];
    }

    async removeToken(token) {
        const tokenData = await db.query(`DELETE FROM public."Tokens" WHERE token = $1`, [token])
        return tokenData.rows[0];
    }

    async findToken(token) {
        const tokenData = await db.query(`SELECT * FROM public."Tokens" WHERE token = $1`, [token])
        return tokenData.rows[0];
    }
}

module.exports = new TokenService();
