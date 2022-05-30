const express = require('express')
const articleRouter = require('./routes/articleRoute.js')
const emailRouter = require('./routes/emailRoute.js')
const userRouter = require('./routes/userRoute.js')
const loggerMiddlewares = require('./middlewares/loggerMiddlewares.js')
const errorMiddleware = require('./middlewares/errorMiddleware.js')
const path = require('path')
const config = require('./config.js')
const cors = require("cors");
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')


const PORT = process.env.PORT ?? 5500
const app = express()
const _dirname = path.resolve()

const corsOptions ={
  origin: config.WEB_URL, 
  credentials:true,      
  optionSuccessStatus:200,
}

app.use(express.static(path.resolve(_dirname, 'static')))
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser('SECRET_KEY'));
app.use(fileUpload({}))
app.use(loggerMiddlewares.requestTime)
app.use(loggerMiddlewares.logger)
app.use(errorMiddleware)
app.use('/api', articleRouter, emailRouter)
app.use('/user', userRouter)

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`)
})

app.all('*', function (req, res, next) {
  res.header ("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header ("Access-Control-Allow-Credentials", true);
  next();
});