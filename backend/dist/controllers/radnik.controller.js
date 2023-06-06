"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadnikController = void 0;
const radnik_1 = __importDefault(require("../models/radnik"));
const mongoose_1 = __importDefault(require("mongoose"));
class RadnikController {
    constructor() {
        this.dohvatiRadnikeAgencije = (req, res) => {
            let agencija = req.body.agencija;
            radnik_1.default.find({ agencija: agencija }, (err, radnici) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(radnici);
                }
            });
        };
        this.azurirajRadnika = (req, res) => {
            let radnik = new radnik_1.default(req.body);
            radnik_1.default.updateOne({ _id: radnik._id }, {
                $set: {
                    ime: radnik.ime,
                    prezime: radnik.prezime,
                    mejl: radnik.mejl,
                    telefon: radnik.telefon,
                    specijalizacija: radnik.specijalizacija,
                },
            }, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ poruka: 'ok' });
                }
            });
        };
        this.dodajRadnika = (req, res) => {
            req.body._id = new mongoose_1.default.Types.ObjectId();
            let radnik = new radnik_1.default(req.body);
            radnik
                .save()
                .then((radnik) => {
                res.json({ poruka: 'ok' });
            })
                .catch((err) => {
                res.json({ poruka: 'greska' });
            });
        };
        this.obrisiRadnika = (req, res) => {
            let id = req.body.id;
            radnik_1.default.deleteOne({ _id: id }, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ poruka: 'ok' });
                }
            });
        };
        this.dohvatiDostupneRadnike = (req, res) => {
            let agencija = req.body.agencija;
            radnik_1.default.find({ agencija: agencija, idPosao: null }, (err, radnici) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(radnici);
                }
            });
        };
        this.dohvatiRadnikeNaPoslu = (req, res) => {
            let idPosao = req.body.idPosao;
            radnik_1.default.find({ idPosao: idPosao }, (err, radnici) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(radnici);
                }
            });
        };
        this.azurirajPosaoRadnika = (req, res) => {
            let idRadnik = req.body.idRadnik;
            let idPosao = req.body.idPosao;
            radnik_1.default.updateOne({ _id: idRadnik }, { $set: { idPosao: idPosao } }, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ poruka: 'ok' });
                }
            });
        };
    }
}
exports.RadnikController = RadnikController;
//# sourceMappingURL=radnik.controller.js.map