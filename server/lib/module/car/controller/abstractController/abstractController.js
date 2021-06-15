"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstractControllerError_1 = __importDefault(require("../error/abstractControllerError"));
class AbstractController {
    constructor() {
        if (new.target === AbstractController) {
            throw new abstractControllerError_1.default();
        }
    }
}
exports.default = AbstractController;
//# sourceMappingURL=abstractController.js.map