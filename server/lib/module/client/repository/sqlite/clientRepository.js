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
class ClientRepository extends abstractRepository_1.default {
    constructor(clientModel) {
        super();
        this.clientModel = clientModel;
    }
    saveNewClient(newclient) {
        return __awaiter(this, void 0, void 0, function* () {
            const buildOptions = { isNewRecord: true };
            const saveclient = yield this.clientModel.create(newclient, buildOptions);
            const { id } = saveclient;
            return this.getById(id);
        });
    }
    saveEditedClient(editedclient) {
        return __awaiter(this, void 0, void 0, function* () {
            const newValues = ({
                name: editedclient.name,
                surname: editedclient.surname,
                doc_type: editedclient.doc_type,
                doc_num: editedclient.doc_num,
                address: editedclient.address,
                phone: editedclient.phone,
                e_mail: editedclient.e_mail,
                nationality: editedclient.nationality,
                birthdate: editedclient.birthdate
            } = editedclient);
            const currentclientId = editedclient.id;
            const buildOptions = { isNewRecord: false, where: { id: currentclientId } };
            yield this.clientModel.update(newValues, buildOptions);
            return this.getById(currentclientId);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.clientModel.findOne({ where: { id } });
            if (!client) {
                throw new noResultsError_1.default();
            }
            return mapper_1.dbToEntity(client);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield this.clientModel.findAll();
            if (!clients) {
                throw new noResultsError_1.default();
            }
            return clients.map(client => mapper_1.dbToEntity(client));
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientToDelete = yield this.clientModel.findByPk(id);
            if (!clientToDelete) {
                throw new noResultsError_1.default();
            }
            clientToDelete.destroy();
            return true;
        });
    }
}
exports.default = ClientRepository;
//# sourceMappingURL=clientRepository.js.map