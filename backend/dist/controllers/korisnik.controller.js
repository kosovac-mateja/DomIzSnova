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
    dohvatiKorisnika(req, res) {
        let korisnickoIme = req.body.korisnickoIme;
        korisnik_1.default.findOne({ korisnickoIme: korisnickoIme }, (greska, korisnik) => {
            if (greska) {
                console.log(greska);
            }
            else {
                res.json(korisnik);
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
                }
                else {
                    res.json({ postoji: 'ne' });
                }
            }
        });
    }
    azurirajStatus(req, res) {
        let korisnickoIme = req.body.korisnickoIme;
        let vrednost = req.body.vrednost;
        korisnik_1.default.updateOne({ korisnickoIme: korisnickoIme }, { $set: { status: vrednost } }, (greska, korisnik) => {
            if (greska) {
                console.log(greska);
            }
            else {
                res.json({ poruka: 'ok' });
            }
        });
    }
    obrisi(req, res) {
        let korisnickoIme = req.body.korisnickoIme;
        korisnik_1.default.deleteOne({ korisnickoIme: korisnickoIme }, (greska, korisnik) => {
            if (greska) {
                console.log(greska);
            }
            else {
                res.json({ poruka: 'ok' });
            }
        });
    }
    azurirajLozinku(req, res) {
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;
        korisnik_1.default.updateOne({ korisnickoIme: korisnickoIme }, { $set: { lozinka: lozinka } }, (greska, korisnik) => {
            if (greska) {
                console.log(greska);
            }
            else {
                res.json({ poruka: 'ok' });
            }
        });
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map