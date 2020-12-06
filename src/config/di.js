const { Sequelize } = require("sequelize")
const { default: DIContainer, object, get, factory } = require("rsdi")
const { CarRepository, CarModel, CarController, CarService } = require("../module/car/module")
const multer = require("multer")
const session = require("express-session")

function configureDatabase(){
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: process.env.MAIN_DB_PATH
    })

    return sequelize
}
function configureSession(){
    const ONE_WEEK_IN_SECONDS = 604800000

    const sessionOptions = {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: ONE_WEEK_IN_SECONDS }
    }

    return session(sessionOptions)
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
        CarService: object(CarService).construct(get("CarRepository")),
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
        multer: factory(configureMulter),
        session: factory(configureSession)
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