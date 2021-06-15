"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalService = exports.RentalController = exports.RentalModel = exports.RentalRepository = exports.initRentalModule = void 0;
const rentalController_1 = __importDefault(require("../rental/controller/rentalController"));
exports.RentalController = rentalController_1.default;
const rentalService_1 = __importDefault(require("../rental/service/rentalService"));
exports.RentalService = rentalService_1.default;
const rentalRepository_1 = __importDefault(require("../rental/repository/sqlite/rentalRepository"));
exports.RentalRepository = rentalRepository_1.default;
const rentalModel_1 = __importDefault(require("../rental/model/rentalModel"));
exports.RentalModel = rentalModel_1.default;
function initRentalModule(app, container) {
    const controller = container.get('RentalController');
    controller.configureRoutes(app);
}
exports.initRentalModule = initRentalModule;
//# sourceMappingURL=module.js.map