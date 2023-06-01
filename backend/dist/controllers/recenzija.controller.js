"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecenzijaController = void 0;
const recenzija_1 = __importDefault(require("../models/recenzija"));
class RecenzijaController {
    constructor() {
        this.dohvatiRezenzijeAgencije = (req, res) => {
            let agencija = req.body.agencija;
            recenzija_1.default.find({ agencija: agencija }, (err, recenzije) => {
                if (err)
                    console.log(err);
                else
                    res.json(recenzije);
            });
        };
    }
}
exports.RecenzijaController = RecenzijaController;
//# sourceMappingURL=recenzija.controller.js.map