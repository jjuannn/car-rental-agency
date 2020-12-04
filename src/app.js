require("dotenv").config({path: "../.env"})
const express = require('express')

const app = express()
const path = require('path')

app.use(express.urlencoded({
  extended : false
}))
app.use(express.json())
app.use(express.static(`${__dirname}/styles`))
app.use(express.static('src'))

const nunjucks = require('nunjucks')

nunjucks.configure('views', {
  autoescape: true,
  express: app,
})

const configureDI = require("./config/di")
const container = configureDI.configureContainer()

const { initCarModule } = require("../src/module/car/module")
initCarModule(app, container)

const mainDb = container.get("Sequelize")
mainDb.sync()

app.get('/', (req, res) => {
  res.redirect("/car")
})

const PORT = 8080
app.listen(process.env.PORT || PORT, console.log(`CAR-RENTAL-AGENCY listening at port ${PORT}`))
