"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const otkazivanje_controller_1 = require("../controllers/otkazivanje.controller");
const otkazivanjeRuter = express_1.default.Router();
otkazivanjeRuter
    .route('/ubaci')
    .post((req, res) => new otkazivanje_controller_1.OtkazivanjePoslaController().ubaci(req, res));
otkazivanjeRuter
    .route('/dohvatiOtkazivanja')
    .get((req, res) => new otkazivanje_controller_1.OtkazivanjePoslaController().dohvatiOtkazivanja(req, res));
otkazivanjeRuter
    .route('/promeniStatus')
    .post((req, res) => new otkazivanje_controller_1.OtkazivanjePoslaController().promeniStatus(req, res));
otkazivanjeRuter
    .route('/zahtevPostoji')
    .post((req, res) => new otkazivanje_controller_1.OtkazivanjePoslaController().zahtevPostoji(req, res));
exports.default = otkazivanjeRuter;
//# sourceMappingURL=otkazivanje.routes.js.map