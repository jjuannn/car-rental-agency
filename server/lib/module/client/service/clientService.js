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
const invalidClient_1 = __importDefault(require("./error/invalidClient"));
class Service {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    saveNewClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (client === undefined) {
                throw new invalidClient_1.default();
            }
            return this.clientRepository.saveNewClient(client);
        });
    }
    saveEditedClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (client === undefined) {
                throw new invalidClient_1.default();
            }
            return this.clientRepository.saveEditedClient(client);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === undefined) {
                throw new invalidId_1.default();
            }
            return this.clientRepository.getById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === undefined) {
                throw new invalidId_1.default();
            }
            return this.clientRepository.delete(id);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clientRepository.getAll();
        });
    }
}
exports.default = Service;
//# sourceMappingURL=clientService.js.map