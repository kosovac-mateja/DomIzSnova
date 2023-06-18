"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PossaoController = void 0;
const posao_1 = __importDefault(require("../models/posao"));
const mongoose_1 = __importDefault(require("mongoose"));
class PossaoController {
    constructor() {
        this.ubaciPosao = (req, res) => {
            req.body._id = new mongoose_1.default.Types.ObjectId();
            let noviPosao = new posao_1.default(req.body);
            noviPosao
                .save()
                .then((posao) => {
                res.json(posao);
            })
                .catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiPosloveKlijenta = (req, res) => {
            let klijent = req.body.klijent;
            posao_1.default.find({ klijent: klijent }, (err, poslovi) => {
                if (err)
                    console.log(err);
                else
                    res.json(poslovi);
            });
        };
        this.dohvatiPosloveAgencije = (req, res) => {
            let agencija = req.body.agencija;
            posao_1.default.find({ agencija: agencija }, (err, poslovi) => {
                if (err)
                    console.log(err);
                else
                    res.json(poslovi);
            });
        };
        this.azurirajPodatak = (req, res) => {
            let id = req.body.id;
            let podatak = req.body.podatak;
            let vrednost = req.body.vrednost;
            posao_1.default.updateOne({ _id: id }, { $set: { [podatak]: vrednost } }, (greska) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json({ poruka: 'ok' });
                }
            });
        };
        this.obrisiPosao = (req, res) => {
            let id = req.body.id;
            posao_1.default.deleteOne({ _id: id }, (greska) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json({ poruka: 'ok' });
                }
            });
        };
        this.dohvatiPosao = (req, res) => {
            let id = req.body.id;
            posao_1.default.findOne({ _id: id }, (err, posao) => {
                if (err)
                    console.log(err);
                else
                    res.json(posao);
            });
        };
    }
}
exports.PossaoController = PossaoController;
//# sourceMappingURL=posao.controller.js.map