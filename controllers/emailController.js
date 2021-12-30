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

module.exports =  new EmailContoller()