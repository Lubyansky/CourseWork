const db = require('../db.js')

class EmailContoller {
  async addEmail(req, res){

    try {
      const {email} = req.body
      const newEmail = await db.query(`INSERT INTO public."Emails" (email_id, email) VALUES (default, $1) RETURNING *`, [email])
      res.status(201).json(newEmail.rows[0])
    }
    catch(e) {
      res.status(400).json()
    }

  }
}

module.exports =  new EmailContoller()