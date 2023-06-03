"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencijaController = void 0;
const agencija_1 = __importDefault(require("../models/agencija"));
const agencija_2 = __importDefault(require("../models/agencija"));
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
            console.log(korisnickoIme, podatak, vrednost);
            agencija_1.default.collection.updateOne({ korisnickoIme: korisnickoIme }, { $set: { [podatak]: vrednost } }, (greska) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json({ poruka: 'ok' });
                }
            });
        };
        this.azurirajAgenciju = (req, res) => {
            let agencija = new agencija_2.default(req.body);
            agencija_1.default.collection.updateOne({ korisnickoIme: agencija.korisnickoIme }, {
                $set: {
                    korisnickoIme: agencija.korisnickoIme,
                    mejl: agencija.mejl,
                    slika: agencija.slika,
                    naziv: agencija.naziv,
                    ulica: agencija.ulica,
                    grad: agencija.grad,
                    drzava: agencija.drzava,
                    maticniBroj: agencija.maticniBroj,
                    opis: agencija.opis,
                },
            }, (greska, agencija) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json({ poruka: 'ok' });
                }
            });
        };
        this.dohvatiAgenciju = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            agencija_1.default.findOne({ korisnickoIme: korisnickoIme }, (greska, agencija) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json(agencija);
                }
            });
        };
        this.dohvatiAgencije = (req, res) => {
            agencija_1.default.find({}, (greska, agencije) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json(agencije);
                }
            });
        };
        this.dohvatiAgencijePoNazivu = (req, res) => {
            let naziv = req.body.naziv;
            agencija_1.default.find({ naziv: { $regex: naziv, $options: 'i' } }, (greska, agencije) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json(agencije);
                }
            });
        };
        this.dohvatiAgencijePoAdresi = (req, res) => {
            let adresa = req.body.adresa;
            agencija_1.default.find({ ulica: { $regex: adresa, $options: 'i' } }, (greska, agencije) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json(agencije);
                }
            });
        };
        this.dohvatiAgencijePoNazivuIAdresi = (req, res) => {
            let naziv = req.body.naziv;
            let adresa = req.body.adresa;
            agencija_1.default.find({
                naziv: { $regex: naziv, $options: 'i' },
                ulica: { $regex: adresa, $options: 'i' },
            }, (greska, agencije) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json(agencije);
                }
            });
        };
        this.mejlPostoji = (req, res) => {
            let mejl = req.body.mejl;
            agencija_1.default.findOne({ mejl: mejl }, (greska, agencija) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    if (agencija) {
                        res.json({ postoji: 'da' });
                    }
                    else {
                        res.json({ postoji: 'ne' });
                    }
                }
            });
        };
        this.dohvatiAgencijuPoMejlu = (req, res) => {
            let mejl = req.body.mejl;
            agencija_1.default.findOne({ mejl: mejl }, (greska, agencija) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json(agencija);
                }
            });
        };
    }
}
exports.AgencijaController = AgencijaController;
//# sourceMappingURL=agencija.controller.js.map