//Вывод в терминал информации о совершенных запросах (время и url)

class Middlewares {
  requestTime(req, res, next) {
    var date = new Date(Date.now())
    req.requestTime = date.toString() 
    next()
  }
  logger(req, res, next) {
    console.log(`Req.time: ${req.requestTime}\n url: ${req.url}`)
    next()
  }
}

module.exports = new Middlewares()