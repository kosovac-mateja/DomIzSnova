"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recenzija_controller_1 = require("../controllers/recenzija.controller");
const recenzijaRuter = express_1.default.Router();
recenzijaRuter.route('/dohvatiRecenzijeAgencije').post((req, res) => {
    new recenzija_controller_1.RecenzijaController().dohvatiRezenzijeAgencije(req, res);
});
exports.default = recenzijaRuter;
//# sourceMappingURL=recenzija.routes.js.map