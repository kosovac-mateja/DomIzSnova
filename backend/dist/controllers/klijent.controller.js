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
            //TODO: provera da li vec postoji korisnik sa tim korisnickim imenom
            klijent.save((greska, klijent) => {
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