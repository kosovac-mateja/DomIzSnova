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
        this.dohvatiRecenzijeKlijenta = (req, res) => {
            let klijent = req.body.klijent;
            recenzija_1.default.find({ klijent: klijent }, (err, recenzije) => {
                if (err)
                    console.log(err);
                else
                    res.json(recenzije);
            });
        };
        this.ubaciRecenziju = (req, res) => {
            let recenzija = new recenzija_1.default(req.body);
            recenzija
                .save()
                .then((recenzija) => {
                res.json({ poruka: 'ok' });
            })
                .catch((err) => {
                res.status(400).send('recenzija nije ubacena');
            });
        };
        this.azurirajRecenziju = (req, res) => {
            let idPosao = req.body.idPosao;
            let ocena = req.body.ocena;
            let komentar = req.body.komentar;
            console.log(idPosao, ocena, komentar);
            recenzija_1.default.updateOne({ idPosao: idPosao }, {
                $set: {
                    ocena: ocena,
                    komentar: komentar,
                },
            })
                .then((recenzija) => {
                res.json({ poruka: 'ok' });
            })
                .catch((err) => {
                res.status(400).send('recenzija nije azurirana');
            });
        };
        this.obrisiRecenziju = (req, res) => {
            let idPosao = req.body.idPosao;
            recenzija_1.default.deleteOne({ idPosao: idPosao })
                .then((recenzija) => {
                res.json({ poruka: 'ok' });
            })
                .catch((err) => {
                res.status(400).send('recenzija nije obrisana');
            });
        };
    }
}
exports.RecenzijaController = RecenzijaController;
//# sourceMappingURL=recenzija.controller.js.map