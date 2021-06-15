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
const rental_1 = __importDefault(require("../entity/rental"));
const invalidId_1 = __importDefault(require("./error/invalidId"));
const invalidRental_1 = __importDefault(require("./error/invalidRental"));
class RentalService {
    constructor(rentalRepository) {
        this.rentalRepository = rentalRepository;
    }
    saveNewRental(rental) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(rental instanceof rental_1.default) || rental === undefined) {
                throw new invalidRental_1.default();
            }
            const currentRentalsInDate = yield this.rentalRepository.findCarRentalsBetweenDates(rental);
            if (currentRentalsInDate.length > 0) {
                throw new Error('This car is already rented during the dates entered!');
            }
            return this.rentalRepository.saveNewRental(rental);
        });
    }
    saveEditedRental(rental) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(rental instanceof rental_1.default) || rental === undefined) {
                throw new invalidRental_1.default();
            }
            const currentRentalsInDate = yield this.rentalRepository.findCarRentalsBetweenDates(rental);
            if (currentRentalsInDate.length > 0) {
                throw new Error('This car is already rented during the dates entered!');
            }
            return this.rentalRepository.saveEditedRental(rental);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof id !== 'number' || id === undefined) {
                throw new invalidId_1.default();
            }
            return this.rentalRepository.getById(id);
        });
    }
    finish(rental) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(rental instanceof rental_1.default) || rental === undefined) {
                throw new invalidRental_1.default();
            }
            rental.setFinished();
            this.rentalRepository.saveEditedRental(rental);
            return this.rentalRepository.finish(rental);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rentalRepository.getAll();
        });
    }
}
exports.default = RentalService;
//# sourceMappingURL=rentalService.js.map