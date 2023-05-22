"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
class KorisnikController {
    ubaci(req, res) {
        let korisnik = new korisnik_1.default(req.body);
        korisnik.save((greska, korisnik) => {
            if (greska) {
                console.log(greska);
            }
            else {
                res.json({ poruka: 'ok' });
            }
        });
    }
    dohvatiSve(req, res) {
        korisnik_1.default.find({}, (greska, korisnici) => {
            if (greska) {
                console.log(greska);
            }
            else {
                res.json(korisnici);
            }
        });
    }
    korisnikPostoji(req, res) {
        let korisnickoIme = req.body.korisnickoIme;
        korisnik_1.default.findOne({ korisnickoIme: korisnickoIme }, (greska, korisnik) => {
            if (greska) {
                console.log(greska);
            }
            else {
                if (korisnik) {
                    res.json({ postoji: 'da' });
                    console.log('korisnik postoji');
                }
                else {
                    res.json({ postoji: 'ne' });
                    console.log('korisnik ne postoji');
                }
            }
        });
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map