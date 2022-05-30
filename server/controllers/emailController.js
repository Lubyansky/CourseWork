const db = require('../db.js')

class EmailContoller {
  async addEmail(req, res, next){

    try {
      const email = req.body.email
      const newEmail = await db.query(`INSERT INTO public."Emails" (email_id, email) VALUES (default, $1) RETURNING *`, [email])
      res.status(201).json(newEmail.rows[0])
    }
    catch(e) {
      next(e);
    }
  }
}


module.exports =  new EmailContoller()