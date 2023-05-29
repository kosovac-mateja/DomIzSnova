"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agencija_controller_1 = require("../controllers/agencija.controller");
const agencijaRouter = express_1.default.Router();
agencijaRouter
    .route('/registracija')
    .post((req, res) => new agencija_controller_1.AgencijaController().registracija(req, res));
agencijaRouter.route('/azurirajPodatak').post((req, res) => {
    new agencija_controller_1.AgencijaController().azurirajPodatak(req, res);
});
agencijaRouter.route('/azurirajAgenciju').post((req, res) => {
    new agencija_controller_1.AgencijaController().azurirajAgenciju(req, res);
});
agencijaRouter.route('/dohvatiAgenciju').post((req, res) => {
    new agencija_controller_1.AgencijaController().dohvatiAgenciju(req, res);
});
agencijaRouter.route('/dohvatiAgencije').get((req, res) => {
    new agencija_controller_1.AgencijaController().dohvatiAgencije(req, res);
});
agencijaRouter.route('/dohvatiAgencijePoNazivu').post((req, res) => {
    new agencija_controller_1.AgencijaController().dohvatiAgencijePoNazivu(req, res);
});
agencijaRouter.route('/dohvatiAgencijePoAdresi').post((req, res) => {
    new agencija_controller_1.AgencijaController().dohvatiAgencijePoAdresi(req, res);
});
agencijaRouter.route('/dohvatiAgencijePoNazivuIAdresi').post((req, res) => {
    new agencija_controller_1.AgencijaController().dohvatiAgencijePoNazivuIAdresi(req, res);
});
agencijaRouter.route('/mejlPostoji').post((req, res) => {
    new agencija_controller_1.AgencijaController().mejlPostoji(req, res);
});
agencijaRouter.route('/dohvatiAgencijuPoMejlu').post((req, res) => {
    new agencija_controller_1.AgencijaController().dohvatiAgencijuPoMejlu(req, res);
});
exports.default = agencijaRouter;
//# sourceMappingURL=agencija.routes.js.map