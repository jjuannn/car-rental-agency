"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = exports.ClientController = exports.ClientModel = exports.ClientRepository = exports.initClientModule = void 0;
const clientRepository_1 = __importDefault(require("./repository/sqlite/clientRepository"));
exports.ClientRepository = clientRepository_1.default;
const clientModel_1 = __importDefault(require("./model/clientModel"));
exports.ClientModel = clientModel_1.default;
const clientController_1 = __importDefault(require("./controller/clientController"));
exports.ClientController = clientController_1.default;
const clientService_1 = __importDefault(require("./service/clientService"));
exports.ClientService = clientService_1.default;
function initClientModule(app, container) {
    const controller = container.get('ClientController');
    controller.configureRoutes(app);
}
exports.initClientModule = initClientModule;
//# sourceMappingURL=module.js.map