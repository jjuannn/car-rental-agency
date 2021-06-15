"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbToEntity = exports.formToEntity = void 0;
const rental_1 = __importDefault(require("../entity/rental"));
function formToEntity(rental) {
    const { id, fk_car, fk_client, price_per_day, date_from, date_until, payment_method, total_price, is_paid, status } = rental;
    return new rental_1.default(Number(id), fk_car, fk_client, price_per_day, date_from, date_until, payment_method, total_price, is_paid, status, {}, {});
}
exports.formToEntity = formToEntity;
function dbToEntity(rentalModel) {
    const { id, fk_car, fk_client, price_per_day, date_from, date_until, payment_method, total_price, is_paid, status, Car, Client } = rentalModel;
    return new rental_1.default(id, fk_car, fk_client, price_per_day, date_from, date_until, payment_method, total_price, is_paid, status, Car, Client);
}
exports.dbToEntity = dbToEntity;
//# sourceMappingURL=mapper.js.map