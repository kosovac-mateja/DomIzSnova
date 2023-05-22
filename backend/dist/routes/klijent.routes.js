"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const klijent_controller_1 = require("../controllers/klijent.controller");
const klijentRouter = express_1.default.Router();
klijentRouter
    .route('/registracija')
    .post((req, res) => new klijent_controller_1.KlijentController().registracija(req, res));
exports.default = klijentRouter;
//# sourceMappingURL=klijent.routes.js.map