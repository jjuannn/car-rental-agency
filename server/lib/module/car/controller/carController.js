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
class CarController extends abstractController_1.default {
    constructor(uploadMiddleware, carService, ROUTE_BASE = '/car') {
        super();
        this.uploadMiddleware = uploadMiddleware;
        this.carService = carService;
        this.ROUTE_BASE = ROUTE_BASE;
    }
    configureRoutes(app) {
        const ROUTE_BASE = this.ROUTE_BASE;
        app.get(`${ROUTE_BASE}`, this.getAll.bind(this));
        app.get(`${ROUTE_BASE}/all`, this.getAll.bind(this));
        app.post(`${ROUTE_BASE}/new`, this.uploadMiddleware.single('car_image'), this.saveNewCar.bind(this));
        app.post(`${ROUTE_BASE}/edit?:id`, this.uploadMiddleware.single('car_image'), this.saveEditedCar.bind(this));
        app.get(`${ROUTE_BASE}/view?:id`, this.getById.bind(this));
        app.get(`${ROUTE_BASE}/delete?:id`, this.delete.bind(this));
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cars = yield this.carService.getAll();
                console.log(cars);
                res.send(cars);
            }
            catch (e) {
                console.error(e);
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
                const car = yield this.carService.getById(id);
                res.render('car/view.html', { data: { car } });
            }
            catch (e) {
                res.redirect('/car');
            }
        });
    }
    saveNewCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = mapper_1.formToEntity(req.body);
            try {
                const savedCar = yield this.carService.saveNewCar(car);
                console.log(savedCar);
                res.send('working! ');
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    saveEditedCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = mapper_1.formToEntity(req.body);
            try {
                yield this.carService.saveEditedCar(car);
            }
            catch (e) { }
            res.redirect('/car');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.query.id) {
                throw new undefinedId_1.default();
            }
            try {
                const id = Number(req.query.id);
                yield this.carService.delete(id);
            }
            catch (e) { }
            res.redirect('/car');
        });
    }
}
exports.default = CarController;
//# sourceMappingURL=carController.js.map