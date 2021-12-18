let db = require('../offline_db/db_emails.js')

class EmailContoller {
  async addEmail(req, res){
    const newEmail = {
      email_id: db.length,
      ...req.body
    }
    db.push(newEmail)
    res.status(201).json(newEmail)
    console.log(db)
  }
}


//↓↓↓↓↓↓ снимаем комментарий
/*
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
*/

//↓↓↓ не трогаем
module.exports =  new EmailContoller()