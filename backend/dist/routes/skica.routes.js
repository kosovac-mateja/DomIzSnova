"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const skica_controller_1 = require("../controllers/skica.controller");
const skicaRuter = express_1.default.Router();
skicaRuter.route('/ubaciSkicu').post((req, res) => {
    new skica_controller_1.SkicaController().ubaciSkicu(req, res);
});
skicaRuter.route('/dohvatiSkicu').post((req, res) => {
    new skica_controller_1.SkicaController().dohvatiSkicu(req, res);
});
skicaRuter.route('/promeniBoju').post((req, res) => {
    new skica_controller_1.SkicaController().promeniBoju(req, res);
});
skicaRuter.route('/izmeniSkicu').post((req, res) => {
    new skica_controller_1.SkicaController().izmeniSkicu(req, res);
});
exports.default = skicaRuter;
//# sourceMappingURL=skica.routes.js.map