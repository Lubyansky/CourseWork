const express = require('express')
const articleRouter = require('./routes/articleRoute.js')
const emailRouter = require('./routes/emailRoute.js')
const middlewares = require('./middlewares.js')
const path = require('path')

const PORT = process.env.PORT ?? 5500
const app = express()
const _dirname = path.resolve()

app.set('view engine', 'ejs')
app.set('views', path.resolve(_dirname, 'templates'))

app.use(express.static(path.resolve(_dirname, 'static')))
app.use(express.json())
app.use(middlewares.requestTime)
app.use(middlewares.logger)
app.use('/api', articleRouter, emailRouter)

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/periods', (req, res) => {
  res.render('periods')
})
app.get('/article/:id', (req, res) => {
  res.render('article')
})
app.get('*', (req, res) => {
  res.render('error')
})

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`)
})
