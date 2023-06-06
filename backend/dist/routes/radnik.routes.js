"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const radnik_controller_1 = require("../controllers/radnik.controller");
const radnikRuter = express_1.default.Router();
radnikRuter.route('/dohvatiRadnikeAgencije').post((req, res) => {
    new radnik_controller_1.RadnikController().dohvatiRadnikeAgencije(req, res);
});
radnikRuter.route('/azurirajRadnika').post((req, res) => {
    new radnik_controller_1.RadnikController().azurirajRadnika(req, res);
});
radnikRuter.route('/dodajRadnika').post((req, res) => {
    new radnik_controller_1.RadnikController().dodajRadnika(req, res);
});
radnikRuter.route('/obrisiRadnika').post((req, res) => {
    new radnik_controller_1.RadnikController().obrisiRadnika(req, res);
});
radnikRuter.route('/dohvatiDostupneRadnike').post((req, res) => {
    new radnik_controller_1.RadnikController().dohvatiDostupneRadnike(req, res);
});
radnikRuter.route('/dohvatiRadnikeNaPoslu').post((req, res) => {
    new radnik_controller_1.RadnikController().dohvatiRadnikeNaPoslu(req, res);
});
radnikRuter.route('/azurirajPosaoRadnika').post((req, res) => {
    new radnik_controller_1.RadnikController().azurirajPosaoRadnika(req, res);
});
exports.default = radnikRuter;
//# sourceMappingURL=radnik.routes.js.map