"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjekatController = void 0;
const objekat_1 = __importDefault(require("../models/objekat"));
class ObjekatController {
    constructor() {
        this.dohvatiObjekteVlasnika = (req, res) => {
            let vlasnik = req.body.vlasnik;
            objekat_1.default.find({ vlasnik: vlasnik }, (err, objekti) => {
                if (err)
                    console.log(err);
                else
                    res.json(objekti);
            });
        };
        this.obrisiObjekat = (req, res) => {
            let id = req.body.id;
            objekat_1.default.deleteOne({ _id: id }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ obrisan: 'da' });
            });
        };
        this.dodajObjekat = (req, res) => {
            let objekat = new objekat_1.default(req.body);
            objekat
                .save()
                .then((objekat) => {
                res.json({ objekat: 'dodat' });
            })
                .catch((err) => {
                console.log(err);
            });
        };
        this.azurirajObjekat = (req, res) => {
            let objekat = new objekat_1.default(req.body);
            objekat_1.default.collection.updateOne({ _id: objekat._id }, {
                $set: {
                    vlasnik: objekat.vlasnik,
                    tip: objekat.tip,
                    adresa: objekat.adresa,
                    brProstorija: objekat.brProstorija,
                    kvadratura: objekat.kvadratura,
                    idSkica: objekat.idSkica,
                },
            }, (greska, objekat) => {
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
exports.ObjekatController = ObjekatController;
//# sourceMappingURL=objekat.controller.js.map