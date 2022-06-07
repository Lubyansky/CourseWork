const db = require('../db.js')

class EmailContoller {
  async addEmail(req, res, next){

    try {
      const {email} = req.body
      const checkEmail = await db.query(`SELECT email_id FROM public."Emails" WHERE email = $1`, [email])
      if(checkEmail.rows == 0){
        await db.query(`INSERT INTO public."Emails" (email_id, email) VALUES (default, $1) RETURNING *`, [email])
        res.status(201)
      }
    }
    catch(e) {
      next(e);
    }
  }
}


module.exports =  new EmailContoller()