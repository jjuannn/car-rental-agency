const CarRepository = require("../car/repository/sqlite/carRepository")
const CarModel = require("../car/model/carModel")
const CarController = require("../car/controller/carController")
const CarService = require("../car/service/carService")
/**
 * 
 * @param {import("express").Application} app 
 * @param {import("rsdi").IDIContainer} container 
 */
function initCarModule(app, container){
    const controller = container.get("CarController")
    controller.configureRoutes(app)
}

module.exports = { initCarModule, CarRepository, CarModel, CarController, CarService }