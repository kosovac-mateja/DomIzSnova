"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blokiranje_controller_1 = require("../controllers/blokiranje.controller");
const blokiranjeRuter = express_1.default.Router();
blokiranjeRuter
    .route('/ubaci')
    .post((req, res) => new blokiranje_controller_1.BlokiranjeController().ubaci(req, res));
blokiranjeRuter
    .route('/dohvatiAgenciju')
    .post((req, res) => new blokiranje_controller_1.BlokiranjeController().dohvatiAgenciju(req, res));
blokiranjeRuter
    .route('/izbrisi')
    .post((req, res) => new blokiranje_controller_1.BlokiranjeController().izbrisi(req, res));
blokiranjeRuter
    .route('/startuj')
    .get((req, res) => new blokiranje_controller_1.BlokiranjeController().startuj(req, res));
blokiranjeRuter
    .route('/dodajPozitivnuOcenu')
    .post((req, res) => new blokiranje_controller_1.BlokiranjeController().dodajPozitivnuOcenu(req, res));
blokiranjeRuter
    .route('/dohvatiSve')
    .get((req, res) => new blokiranje_controller_1.BlokiranjeController().dohvatiSve(req, res));
exports.default = blokiranjeRuter;
//# sourceMappingURL=blokiranje.routes.js.map