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
const invalidId_1 = __importDefault(require("./error/invalidId"));
const invalidCar_1 = __importDefault(require("./error/invalidCar"));
class Service {
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    saveNewCar(car) {
        return __awaiter(this, void 0, void 0, function* () {
            if (car === undefined) {
                throw new invalidCar_1.default();
            }
            return this.carRepository.saveNewCar(car);
        });
    }
    saveEditedCar(car) {
        return __awaiter(this, void 0, void 0, function* () {
            if (car === undefined) {
                throw new invalidCar_1.default();
            }
            return this.carRepository.saveEditedCar(car);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === undefined) {
                throw new invalidId_1.default();
            }
            return this.carRepository.getById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === undefined) {
                throw new invalidId_1.default();
            }
            return this.carRepository.delete(id);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.carRepository.getAll();
        });
    }
}
exports.default = Service;
//# sourceMappingURL=carService.js.map