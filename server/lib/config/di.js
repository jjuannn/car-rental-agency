"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureContainer = void 0;
const sequelize_1 = require("sequelize");
const rsdi_1 = __importStar(require("rsdi"));
const module_1 = require("../module/car/module");
const module_2 = require("../module/client/module");
const module_3 = require("../module/rental/module");
const multer_1 = __importDefault(require("multer"));
const express_session_1 = __importDefault(require("express-session"));
function configureDatabase() {
    const sequelize = new sequelize_1.Sequelize({
        dialect: 'sqlite',
        storage: process.env.MAIN_DB_PATH
    });
    return sequelize;
}
function configureSession() {
    const ONE_WEEK_IN_SECONDS = 604800000;
    const sessionOptions = {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: ONE_WEEK_IN_SECONDS }
    };
    return express_session_1.default(sessionOptions);
}
function configureCarModel(container) {
    return module_1.CarModel.setup(container.get('Sequelize'));
}
function configureClientModel(container) {
    return module_2.ClientModel.setup(container.get('Sequelize'));
}
function configureRentalModel(container) {
    module_3.RentalModel.setup(container.get('Sequelize'));
    module_3.RentalModel.setupAssociations(container.get('CarModel'), container.get('ClientModel'));
    return module_3.RentalModel;
}
function configureMulter() {
    const upload = multer_1.default({
        dest: process.env.UPLOAD_MULTER_DIR
    });
    return upload;
}
function addCarModuleDefinitions(container) {
    container.addDefinitions({
        CarController: rsdi_1.object(module_1.CarController).construct(rsdi_1.get('multer'), rsdi_1.get('CarRepository')),
        CarService: rsdi_1.object(module_1.CarService).construct(rsdi_1.get('CarRepository')),
        CarRepository: rsdi_1.object(module_1.CarRepository).construct(rsdi_1.get('CarModel')),
        CarModel: rsdi_1.factory(configureCarModel)
    });
}
function addRentalModelDefinitions(container) {
    container.addDefinitions({
        RentalController: rsdi_1.object(module_3.RentalController).construct(rsdi_1.get('RentalService'), rsdi_1.get('CarController'), rsdi_1.get('ClientController')),
        RentalService: rsdi_1.object(module_3.RentalService).construct(rsdi_1.get('RentalRepository')),
        RentalRepository: rsdi_1.object(module_3.RentalRepository).construct(rsdi_1.get('RentalModel'), rsdi_1.get('ClientModel'), rsdi_1.get('CarModel')),
        RentalModel: rsdi_1.factory(configureRentalModel)
    });
}
function addClientModuleDefinitions(container) {
    container.addDefinitions({
        ClientController: rsdi_1.object(module_2.ClientController).construct(rsdi_1.get('ClientService')),
        ClientService: rsdi_1.object(module_2.ClientService).construct(rsdi_1.get('ClientRepository')),
        ClientRepository: rsdi_1.object(module_2.ClientRepository).construct(rsdi_1.get('ClientModel')),
        ClientModel: rsdi_1.factory(configureClientModel)
    });
}
function addCommonDefinitions(container) {
    container.addDefinitions({
        Sequelize: rsdi_1.factory(configureDatabase),
        multer: rsdi_1.factory(configureMulter),
        session: rsdi_1.factory(configureSession)
    });
}
function configureContainer() {
    const container = new rsdi_1.default();
    addCommonDefinitions(container);
    addCarModuleDefinitions(container);
    addClientModuleDefinitions(container);
    addRentalModelDefinitions(container);
    return container;
}
exports.configureContainer = configureContainer;
//# sourceMappingURL=di.js.map