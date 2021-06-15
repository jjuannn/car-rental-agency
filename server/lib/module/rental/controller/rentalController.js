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
const abstractController_1 = __importDefault(require("./abstractController/abstractController"));
const mapper_1 = require("../mapper/mapper");
const undefinedId_1 = __importDefault(require("./error/undefinedId"));
class RentalController extends abstractController_1.default {
    constructor(rentalService, carService, clientService, ROUTE_BASE = '/rental') {
        super();
        this.rentalService = rentalService;
        this.carService = carService;
        this.clientService = clientService;
        this.ROUTE_BASE = ROUTE_BASE;
    }
    configureRoutes(app) {
        const ROUTE_BASE = this.ROUTE_BASE;
        app.get(`${ROUTE_BASE}/all`, this.getAll.bind(this));
        app.get(`${ROUTE_BASE}/new`, this.newRental.bind(this));
        app.post(`${ROUTE_BASE}/new`, this.saveNewRental.bind(this));
        app.get(`${ROUTE_BASE}/edit?:id`, this.editRental.bind(this));
        app.post(`${ROUTE_BASE}/edit?:id`, this.saveEditedRental.bind(this));
        app.get(`${ROUTE_BASE}/view?:id`, this.getById.bind(this));
        app.get(`${ROUTE_BASE}/delete?:id`, this.finish.bind(this));
    }
    newRental(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = yield this.carService.getAll();
            const clients = yield this.clientService.getAll();
            if (cars.length === 0 || clients.length === 0) {
                res.redirect('/rental');
            }
            else {
                res.render('rental/add.html', { data: { cars, clients } });
            }
        });
    }
    editRental(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.query.id) {
                throw new undefinedId_1.default();
            }
            try {
                const id = Number(req.query.id);
                const rental = yield this.rentalService.getById(id);
                const cars = yield this.carService.getAll();
                const clients = yield this.clientService.getAll();
                res.render('rental/edit.html', { data: { rental, cars, clients } });
            }
            catch (e) {
                res.redirect('/rental');
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rentals = yield this.rentalService.getAll();
                res.render('list/rental/main-page.html', {
                    data: { rentals }
                });
            }
            catch (e) {
                res.redirect('/rental');
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
                const rental = yield this.rentalService.getById(id);
                res.render('rental/view.html', { data: { rental } });
            }
            catch (e) {
                res.redirect('/rental');
            }
        });
    }
    saveNewRental(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rental = mapper_1.formToEntity(req.body);
            try {
                yield this.rentalService.saveNewRental(rental);
            }
            catch (e) { }
            res.redirect('/rental');
        });
    }
    saveEditedRental(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rental = mapper_1.formToEntity(req.body);
            try {
                yield this.rentalService.saveEditedRental(rental);
            }
            catch (e) { }
            res.redirect('/rental');
        });
    }
    finish(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.query.id) {
                throw new undefinedId_1.default();
            }
            try {
                const id = Number(req.query.id);
                const rentalToDelete = yield this.rentalService.getById(id);
                yield this.rentalService.finish(rentalToDelete);
            }
            catch (e) { }
            res.redirect('/rental');
        });
    }
}
exports.default = RentalController;
//# sourceMappingURL=rentalController.js.map