"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posao_controller_1 = require("../controllers/posao.controller");
const posaoRuter = express_1.default.Router();
posaoRuter.route('/ubaciPosao').post((req, res) => {
    new posao_controller_1.PossaoController().ubaciPosao(req, res);
});
posaoRuter.route('/dohvatiPosloveKlijenta').post((req, res) => {
    new posao_controller_1.PossaoController().dohvatiPosloveKlijenta(req, res);
});
posaoRuter.route('/dohvatiPosloveAgencije').post((req, res) => {
    new posao_controller_1.PossaoController().dohvatiPosloveAgencije(req, res);
});
posaoRuter.route('/azurirajPodatak').post((req, res) => {
    new posao_controller_1.PossaoController().azurirajPodatak(req, res);
});
posaoRuter.route('/obrisiPosao').post((req, res) => {
    new posao_controller_1.PossaoController().obrisiPosao(req, res);
});
exports.default = posaoRuter;
//# sourceMappingURL=posao.routes.js.map