"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PossaoController = void 0;
const posao_1 = __importDefault(require("../models/posao"));
const mongoose_1 = __importDefault(require("mongoose"));
class PossaoController {
    constructor() {
        this.ubaciPosao = (req, res) => {
            req.body._id = new mongoose_1.default.Types.ObjectId();
            let noviPosao = new posao_1.default(req.body);
            noviPosao
                .save()
                .then((posao) => {
                res.json(posao);
            })
                .catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiPosloveKlijenta = (req, res) => {
            let klijent = req.body.klijent;
            posao_1.default.find({ klijent: klijent }, (err, poslovi) => {
                if (err)
                    console.log(err);
                else
                    res.json(poslovi);
            });
        };
    }
}
exports.PossaoController = PossaoController;
//# sourceMappingURL=posao.controller.js.map