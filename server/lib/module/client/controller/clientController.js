"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstractController_1 = __importDefault(require("../controller/abstractController/abstractController"));
const mapper_1 = require("../mapper/mapper");
const undefinedId_1 = __importDefault(require("./error/undefinedId"));
class ClientController extends abstractController_1.default {
    constructor(clientService, ROUTE_BASE = '/client') {
        super();
        this.clientService = clientService;
        this.ROUTE_BASE = ROUTE_BASE;
    }
    configureRoutes(app) {
        const ROUTE_BASE = this.ROUTE_BASE;
        app.get(`${ROUTE_BASE}/all`, this.getAll.bind(this));
        app.post(`${ROUTE_BASE}/new`, this.saveNewClient.bind(this));
        app.post(`${ROUTE_BASE}/edit?:id`, this.saveEditedClient.bind(this));
        app.get(`${ROUTE_BASE}/view?:id`, this.getById.bind(this));
        app.get(`${ROUTE_BASE}/delete?:id`, this.delete.bind(this));
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield this.clientService.getAll();
                res.render('list/client/main-page.html', {
                    data: { clients }
                });
            }
            catch (e) {
                res.redirect('/client');
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.query.id) {
                throw new undefinedId_1.default();
            }
            try {
                const id = Number(req.query.id);
                const client = yield this.clientService.getById(id);
                res.render('client/view.html', { data: { client } });
            }
            catch (e) {
                res.redirect('/client');
            }
        });
    }
    saveNewClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = mapper_1.formToEntity(req.body);
            console.log(client);
            try {
                yield this.clientService.saveNewClient(client);
            }
            catch (e) { }
            res.redirect('/client');
        });
    }
    saveEditedClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = mapper_1.formToEntity(req.body);
            try {
                yield this.clientService.saveEditedClient(client);
            }
            catch (e) { }
            res.redirect('/client');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.query.id) {
                throw new undefinedId_1.default();
            }
            try {
                const id = Number(req.query.id);
                yield this.clientService.delete(id);
            }
            catch (e) { }
            res.redirect('/client');
        });
    }
}
exports.default = ClientController;
//# sourceMappingURL=clientController.js.map