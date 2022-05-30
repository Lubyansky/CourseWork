//Вывод в терминал информации о совершенных запросах (время и url)

//const jwt = require('jsonwebtoken')
//const {key} = require('./config')

class loggerMiddlewares {
  /*
  checkAuth(req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
          return res.status(403).json({message: "Пользователь не авторизован"})
      }
      const decodedData = jwt.verify(token, key)
      req.user = decodedData
      next()
    } 
    catch (e) {
      console.log(e)
      return res.status(403).json({message: "Пользователь не авторизован"})
    }
  }*/
  /*
  checkRole(roles) {
    return function (req, res, next) {
      if (req.method === "OPTIONS") {
        next()
      }

      try {
          const token = req.headers.authorization.split(' ')[1]
          if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
          }
          const {roles: date} = jwt.verify(token, key)
          const userRoles = date.split(',')
          let hasRole = false
          userRoles.forEach(role => {
          if (roles.includes(role)) {
            hasRole = true
          }
        })
        if (!hasRole) {
          return res.status(403).json({message: "У вас нет доступа"})
        }
        next();
      } 
      catch (e) {
        console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован"})
      }
    }
  }
  */
  requestTime(req, res, next) {
    var date = new Date()
    req.requestTime = date
    next()
  }
  logger(req, res, next) {
    console.log(`Req.time: ${req.requestTime.toString() }\n url: ${req.url}`)
    next()
  }
}

module.exports = new loggerMiddlewares()