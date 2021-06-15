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
const sequelize_1 = require("sequelize");
class ClientRepository extends abstractRepository_1.default {
    constructor(rentalModel, clientModel, carModel) {
        super();
        this.rentalModel = rentalModel;
        this.clientModel = clientModel;
        this.carModel = carModel;
    }
    saveNewRental(newRental) {
        return __awaiter(this, void 0, void 0, function* () {
            const buildOptions = { isNewRecord: true };
            let saveRental;
            saveRental = yield this.rentalModel.build(newRental, buildOptions);
            saveRental.setDataValue('status', 'active');
            saveRental = yield saveRental.save();
            const { id } = saveRental;
            return this.getById(id);
        });
    }
    saveEditedRental(editedRental) {
        return __awaiter(this, void 0, void 0, function* () {
            const newValues = ({
                date_from: editedRental.date_from,
                date_until: editedRental.date_until,
                price_per_day: editedRental.price_per_day,
                total_price: editedRental.total_price,
                payment_method: editedRental.payment_method,
                is_paid: editedRental.is_paid,
                status: editedRental.status,
                fk_car: editedRental.fk_car,
                fk_client: editedRental.fk_client
            } = editedRental);
            const currentRentalId = editedRental.id;
            const buildOptions = { isNewRecord: false, where: { id: currentRentalId } };
            yield this.rentalModel.update(newValues, buildOptions);
            return this.getById(currentRentalId);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rental = yield this.rentalModel.findOne({
                where: { id },
                include: [
                    { model: this.carModel, paranoid: false },
                    { model: this.clientModel, paranoid: false }
                ]
            });
            if (!rental) {
                throw new noResultsError_1.default();
            }
            return mapper_1.dbToEntity(rental);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rentals = yield this.rentalModel.findAll({
                include: [
                    { model: this.carModel, paranoid: false },
                    { model: this.clientModel, paranoid: false }
                ]
            });
            if (!rentals) {
                throw new noResultsError_1.default();
            }
            return rentals.map(rental => mapper_1.dbToEntity(rental));
        });
    }
    finish(rental) {
        return __awaiter(this, void 0, void 0, function* () {
            const setInactive = yield this.rentalModel.findByPk(rental.id);
            if (!setInactive) {
                throw new noResultsError_1.default();
            }
            setInactive.destroy();
            return true;
        });
    }
    findCarRentalsBetweenDates(rental) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date_from, date_until, fk_car, id } = rental;
            const toCompare = yield this.rentalModel.sequelize.query(`SELECT date_from, date_until, id, fk_car FROM Rents WHERE
      (fk_car = "${fk_car}") AND
      (("${date_from}" >= date_from AND "${date_from}" <= date_until) OR
      ("${date_until}" >= date_from AND "${date_until}" <= date_until) OR
      ("${date_from}" <= date_from AND "${date_until}" >= date_until)) AND
      (status = "active") AND (id <> "${id}")
      `, { type: sequelize_1.QueryTypes.SELECT, model: this.rentalModel });
            const mappedList = yield toCompare.map(result => mapper_1.dbToEntity(result));
            return mappedList;
        });
    }
}
exports.default = ClientRepository;
//# sourceMappingURL=rentalRepository.js.map