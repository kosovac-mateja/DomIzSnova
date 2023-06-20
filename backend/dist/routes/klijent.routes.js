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
klijentRouter.route('/azurirajPodatak').post((req, res) => {
    new klijent_controller_1.KlijentController().azurirajPodatak(req, res);
});
klijentRouter.route('/azurirajKlijenta').post((req, res) => {
    new klijent_controller_1.KlijentController().azurirajKlijenta(req, res);
});
klijentRouter.route('/dohvatiKlijenta').post((req, res) => {
    new klijent_controller_1.KlijentController().dohvatiKlijenta(req, res);
});
klijentRouter.route('/mejlPostoji').post((req, res) => {
    new klijent_controller_1.KlijentController().mejlPostoji(req, res);
});
klijentRouter.route('/dohvatiKlijentaPoMejlu').post((req, res) => {
    new klijent_controller_1.KlijentController().dohvatiKlijentaPoMejlu(req, res);
});
klijentRouter.route('/dohvatiKlijente').get((req, res) => {
    new klijent_controller_1.KlijentController().dohvatiSveKlijente(req, res);
});
exports.default = klijentRouter;
//# sourceMappingURL=klijent.routes.js.map