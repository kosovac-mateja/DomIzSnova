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
            agencija_1.default.collection.updateOne({ korisnickoIme: korisnickoIme }, { $set: { [podatak]: vrednost } }, (greska, agencija) => {
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
    }
}
exports.AgencijaController = AgencijaController;
//# sourceMappingURL=agencija.controller.js.map