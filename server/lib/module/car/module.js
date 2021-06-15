"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = exports.CarController = exports.CarModel = exports.CarRepository = exports.initCarModule = void 0;
const carRepository_1 = __importDefault(require("./repository/sqlite/carRepository"));
exports.CarRepository = carRepository_1.default;
const carModel_1 = __importDefault(require("./model/carModel"));
exports.CarModel = carModel_1.default;
const carController_1 = __importDefault(require("./controller/carController"));
exports.CarController = carController_1.default;
const carService_1 = __importDefault(require("./service/carService"));
exports.CarService = carService_1.default;
function initCarModule(app, container) {
    const controller = container.get('CarController');
    controller.configureRoutes(app);
}
exports.initCarModule = initCarModule;
//# sourceMappingURL=module.js.map