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
        this.dohvatiSkicu = (req, res) => {
            let id = req.body.id;
            skica_1.default.findOne({ _id: id }, (err, skica) => {
                if (err)
                    console.log(err);
                else
                    res.json(skica);
            });
        };
        this.promeniBoju = (req, res) => {
            let id = req.body.id;
            let boje = req.body.boje;
            skica_1.default.updateOne({ _id: id }, { boje: boje }, (err, skica) => {
                if (err)
                    console.log(err);
                else
                    res.json(skica);
            });
        };
    }
}
exports.SkicaController = SkicaController;
//# sourceMappingURL=skica.controller.js.map