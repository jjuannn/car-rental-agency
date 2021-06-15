"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbToEntity = exports.formToEntity = void 0;
const car_1 = __importDefault(require("../entity/car"));
function formToEntity(car) {
    const { id, brand, model, year, mileage, color, hasAC, passengers, gearbox_type, price_per_day, images } = car;
    return new car_1.default(Number(id), brand, model, year, mileage, color, hasAC, passengers, gearbox_type, price_per_day, images);
}
exports.formToEntity = formToEntity;
function dbToEntity(carModel) {
    const { id, brand, model, year, mileage, color, hasAC, passengers, gearbox_type, price_per_day, images } = carModel.toJSON();
    return new car_1.default(id, brand, model, year, mileage, color, hasAC, passengers, gearbox_type, price_per_day, images);
}
exports.dbToEntity = dbToEntity;
//# sourceMappingURL=mapper.js.map