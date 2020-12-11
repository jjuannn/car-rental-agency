require("dotenv").config({path: "../.env"})
const express = require('express')

const app = express()
const path = require('path')

app.use(express.urlencoded({
  extended : false
}))
app.use(express.json())
app.use(express.static(`${__dirname}/styles`))
app.use(express.static(`${__dirname}/module/car`))
app.use(express.static('src'))

const nunjucks = require('nunjucks')

nunjucks.configure('views', {
  autoescape: true,
  express: app,
})

const configureDI = require("./config/di")
const container = configureDI.configureContainer()

const exp_session = container.get("session")
app.use(exp_session)

const { initCarModule } = require("../src/module/car/module")
const { initClientModule } = require("../src/module/client/module")
const { initRentalModule } = require("../src/module/rental/module")

initCarModule(app, container)
initClientModule(app, container)
initRentalModule(app, container)

const mainDb = container.get("Sequelize")
mainDb.sync()

app.get('/', (req, res) => {
  res.redirect("/car")
})

const PORT = 8080
app.listen(process.env.PORT || PORT, console.log(`CAR-RENTAL-AGENCY listening at port ${PORT}`))
