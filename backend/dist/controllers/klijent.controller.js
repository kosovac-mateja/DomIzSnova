"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KlijentController = void 0;
const klijent_1 = __importDefault(require("../models/klijent"));
class KlijentController {
    constructor() {
        this.registracija = (req, res) => {
            let klijent = new klijent_1.default(req.body);
            klijent.save((greska, klijent) => {
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
            klijent_1.default.collection.updateOne({ korisnickoIme: korisnickoIme }, { $set: { [podatak]: vrednost } }, (greska, klijent) => {
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
exports.KlijentController = KlijentController;
//# sourceMappingURL=klijent.controller.js.map