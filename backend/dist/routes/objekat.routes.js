"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const objekat_controller_1 = require("../controllers/objekat.controller");
const objekatRuter = express_1.default.Router();
objekatRuter
    .route('/dohvatiObjekteVlasnika')
    .post((req, res) => new objekat_controller_1.ObjekatController().dohvatiObjekteVlasnika(req, res));
objekatRuter
    .route('/obrisiObjekat')
    .post((req, res) => new objekat_controller_1.ObjekatController().obrisiObjekat(req, res));
objekatRuter
    .route('/dodajObjekat')
    .post((req, res) => new objekat_controller_1.ObjekatController().dodajObjekat(req, res));
objekatRuter
    .route('/azurirajObjekat')
    .post((req, res) => new objekat_controller_1.ObjekatController().azurirajObjekat(req, res));
exports.default = objekatRuter;
//# sourceMappingURL=objekat.routes.js.map