"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbToEntity = exports.formToEntity = void 0;
const client_1 = __importDefault(require("../entity/client"));
function formToEntity(client) {
    const { id, name, surname, doc_type, doc_num, address, phone, e_mail, nationality, birthdate } = client;
    return new client_1.default(Number(id), name, surname, doc_type, doc_num, address, phone, e_mail, nationality, birthdate);
}
exports.formToEntity = formToEntity;
function dbToEntity(clientModel) {
    const { id, name, surname, doc_type, doc_num, address, phone, e_mail, nationality, birthdate } = clientModel.toJSON();
    return new client_1.default(id, name, surname, doc_type, doc_num, address, phone, e_mail, nationality, birthdate);
}
exports.dbToEntity = dbToEntity;
//# sourceMappingURL=mapper.js.map