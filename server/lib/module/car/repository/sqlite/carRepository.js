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
const mapper_1 = require("../../mapper/mapper");
const abstractRepository_1 = __importDefault(require("../abstractRepository/abstractRepository"));
const noResultsError_1 = __importDefault(require("../error/noResultsError"));
class CarRepository extends abstractRepository_1.default {
    constructor(carModel) {
        super();
        this.carModel = carModel;
    }
    saveNewCar(newCar) {
        return __awaiter(this, void 0, void 0, function* () {
            const buildOptions = { isNewRecord: true };
            const saveCar = yield this.carModel.create(newCar, buildOptions);
            const { id } = saveCar;
            return this.getById(id);
        });
    }
    saveEditedCar(editedCar) {
        return __awaiter(this, void 0, void 0, function* () {
            const newValues = ({
                brand: editedCar.brand,
                model: editedCar.model,
                year: editedCar.year,
                mileage: editedCar.mileage,
                color: editedCar.color,
                hasAC: editedCar.hasAC,
                passengers: editedCar.passengers,
                price_per_day: editedCar.price_per_day,
                gearbox_type: editedCar.gearbox_type
            } = editedCar);
            if (editedCar.images) {
                newValues.images = editedCar.images;
            }
            const currentCarId = editedCar.id;
            const buildOptions = { isNewRecord: false, where: { id: currentCarId } };
            yield this.carModel.update(newValues, buildOptions);
            return this.getById(currentCarId);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield this.carModel.findOne({ where: { id } });
            if (!car) {
                throw new noResultsError_1.default();
            }
            return mapper_1.dbToEntity(car);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = yield this.carModel.findAll();
            if (!cars) {
                throw new noResultsError_1.default();
            }
            return cars.map(car => mapper_1.dbToEntity(car));
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const carToDelete = yield this.carModel.findByPk(id);
            if (!carToDelete) {
                throw new noResultsError_1.default();
            }
            carToDelete.destroy();
            return true;
        });
    }
}
exports.default = CarRepository;
//# sourceMappingURL=carRepository.js.map