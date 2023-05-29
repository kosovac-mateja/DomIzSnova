"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const korisnik_controller_1 = require("../controllers/korisnik.controller");
const korisnikRouter = express_1.default.Router();
korisnikRouter
    .route('/ubaci')
    .post((req, res) => new korisnik_controller_1.KorisnikController().ubaci(req, res));
korisnikRouter
    .route('/dohvatiKorisnike')
    .get((req, res) => new korisnik_controller_1.KorisnikController().dohvatiSve(req, res));
korisnikRouter.route('/dohvatiKorisnika').post((req, res) => {
    new korisnik_controller_1.KorisnikController().dohvatiKorisnika(req, res);
});
korisnikRouter
    .route('/korisnikPostoji')
    .post((req, res) => new korisnik_controller_1.KorisnikController().korisnikPostoji(req, res));
korisnikRouter.route('/azurirajStatus').post((req, res) => {
    new korisnik_controller_1.KorisnikController().azurirajStatus(req, res);
});
korisnikRouter.route('/obrisi').post((req, res) => {
    new korisnik_controller_1.KorisnikController().obrisi(req, res);
});
exports.default = korisnikRouter;
//# sourceMappingURL=korisnik.routes.js.map