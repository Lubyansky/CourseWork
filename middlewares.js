function requestTime(req, res, next) {
  req.requestTime = Date.now()
  next()
}

function logger(req, res, next) {
  console.log(`Req.time: ${req.requestTime}`)
  next()
}

module.exports = requestTime, logger