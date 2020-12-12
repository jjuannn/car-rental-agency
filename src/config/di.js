const { Sequelize } = require("sequelize")
const { default: DIContainer, object, get, factory} = require("rsdi")
const { CarRepository, CarModel, CarController, CarService } = require("../module/car/module")
const { ClientRepository, ClientModel, ClientController, ClientService } = require("../module/client/module")
const { RentalRepository, RentalModel, RentalController, RentalService } = require("../module/rental/module")

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
    return CarModel.setup(container.get("Sequelize"))
}
/**
 * @param {DIContainer} container
 */
function configureClientModel(container){
    return ClientModel.setup(container.get("Sequelize"))
}
/**
 * @param {DIContainer} container
 */
function configureRentalModel(container){
    RentalModel.setup(container.get("Sequelize"))
    RentalModel.setupAssociations(container.get("CarModel"), container.get("ClientModel"))
    return RentalModel
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
function addRentalModelDefinitions(container){
    container.addDefinitions({
        RentalController: object(RentalController).construct(
            get("RentalService"), 
            get("CarController"), 
            get("ClientController")
        ),
        RentalService: object(RentalService).construct(get("RentalRepository")),
        RentalRepository: object(RentalRepository).construct(get("RentalModel"), get("ClientModel"), get("CarModel")),
        RentalModel: factory(configureRentalModel)
    })
}
/**
 * 
 * @param {DIContainer} container 
 */
function addClientModuleDefinitions(container){
    container.addDefinitions({
        ClientController: object(ClientController).construct(get("ClientService")),
        ClientService: object(ClientService).construct(get("ClientRepository")),
        ClientRepository: object(ClientRepository).construct(get("ClientModel")),
        ClientModel: factory(configureClientModel)
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
    addClientModuleDefinitions(container)
    addRentalModelDefinitions(container)
    return container
}

module.exports = { configureContainer }