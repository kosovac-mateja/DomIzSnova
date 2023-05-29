"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KlijentController = void 0;
const klijent_1 = __importDefault(require("../models/klijent"));
const klijent_2 = __importDefault(require("../models/klijent"));
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
        this.azurirajKlijenta = (req, res) => {
            let klijent = new klijent_2.default(req.body);
            klijent_1.default.collection.updateOne({ korisnickoIme: klijent.korisnickoIme }, {
                $set: {
                    korisnickoIme: klijent.korisnickoIme,
                    telefon: klijent.telefon,
                    mejl: klijent.mejl,
                    slika: klijent.slika,
                    ime: klijent.ime,
                    prezime: klijent.prezime,
                },
            }, (greska, klijent) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json({ poruka: 'ok' });
                }
            });
        };
        this.dohvatiKlijenta = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            klijent_1.default.findOne({ korisnickoIme: korisnickoIme }, (greska, klijent) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json(klijent);
                }
            });
        };
        this.dohvatiKlijentaPoMejlu = (req, res) => {
            let mejl = req.body.mejl;
            klijent_1.default.findOne({ mejl: mejl }, (greska, klijent) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json(klijent);
                }
            });
        };
        this.mejlPostoji = (req, res) => {
            let mejl = req.body.mejl;
            klijent_1.default.findOne({ mejl: mejl }, (greska, klijent) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    if (klijent) {
                        res.json({ postoji: 'da' });
                    }
                    else {
                        res.json({ postoji: 'ne' });
                    }
                }
            });
        };
    }
}
exports.KlijentController = KlijentController;
//# sourceMappingURL=klijent.controller.js.map