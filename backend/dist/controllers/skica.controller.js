"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkicaController = void 0;
const skica_1 = __importDefault(require("../models/skica"));
const mongoose_1 = __importDefault(require("mongoose"));
class SkicaController {
    constructor() {
        this.ubaciSkicu = (req, res) => {
            req.body._id = new mongoose_1.default.Types.ObjectId();
            let novaSkica = new skica_1.default(req.body);
            novaSkica
                .save()
                .then((skica) => {
                res.json(skica);
            })
                .catch((err) => {
                console.log(err);
            });
        };
    }
}
exports.SkicaController = SkicaController;
//# sourceMappingURL=skica.controller.js.map