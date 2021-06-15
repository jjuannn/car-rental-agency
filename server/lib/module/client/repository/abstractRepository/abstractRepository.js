"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstractRepositoryError_1 = __importDefault(require("../error/abstractRepositoryError"));
class AbstractRepository {
    constructor() {
        if (new.target === AbstractRepository) {
            throw new abstractRepositoryError_1.default();
        }
    }
}
exports.default = AbstractRepository;
//# sourceMappingURL=abstractRepository.js.map