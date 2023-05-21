"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mejl_controller_1 = require("../controllers/mejl.controller");
const mejlRuter = express_1.default.Router();
mejlRuter.route('/posaljiMejl').post((req, res) => {
    new mejl_controller_1.MejlController().posaljiMejl(req, res);
});
exports.default = mejlRuter;
//# sourceMappingURL=mejl.routes.js.map