const { Sequelize } = require("sequelize")
const { default: DIContainer, object, get, factory } = require("rsdi")
const { CarRepository, CarModel, CarController } = require("../module/car/module")
const multer = require("multer")

function configureDatabase(){
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: process.env.MAIN_DB_PATH
    })

    return sequelize
}
/**
 * @param {DIContainer} container
 */
function configureCarModel(container){
    CarModel.setup(container.get("Sequelize"))
    return CarModel
}
function configureMulter(){
    const upload = multer({
        dest: process.env.UPLOAD_MULTER_DIR
    })

    return upload
}
/**
 * 
 * @param {DIContainer} container 
 */
function addCarModuleDefinitions(container){
    container.addDefinitions({
        CarController: object(CarController).construct(get("multer"), get("CarRepository")),
        CarRepository: object(CarRepository).construct(get("CarModel")),
        CarModel: factory(configureCarModel)
    })
}
/**
 * 
 * @param {DIContainer} container 
 */
function addCommonDefinitions(container){
    container.addDefinitions({
        Sequelize: factory(configureDatabase),
        multer: factory(configureMulter)
    })
}
/**
 * @param {DIContainer} container
 */
function configureContainer(){
    const container = new DIContainer()
    addCommonDefinitions(container)
    addCarModuleDefinitions(container)
    return container
}

module.exports = { configureContainer }