"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencijaController = void 0;
const agencija_1 = __importDefault(require("../models/agencija"));
class AgencijaController {
    constructor() {
        this.registracija = (req, res) => {
            let agencija = new agencija_1.default(req.body);
            agencija.save((greska, agencija) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json({ poruka: 'ok' });
                }
            });
        };
        this.azurirajPodatak = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let podatak = req.body.podatak;
            let vrednost = req.body.vrednost;
            agencija_1.default.collection.updateOne({ korisnickoIme: korisnickoIme }, { $set: { [podatak]: vrednost } }, (greska, agencija) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json({ poruka: 'ok' });
                }
            });
        };
    }
}
exports.AgencijaController = AgencijaController;
//# sourceMappingURL=agencija.controller.js.map