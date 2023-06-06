"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtkazivanjePoslaController = void 0;
const otkazivanjePosla_1 = __importDefault(require("../models/otkazivanjePosla"));
class OtkazivanjePoslaController {
    constructor() {
        this.ubaci = (req, res) => {
            let otkazivanjePosla = new otkazivanjePosla_1.default(req.body);
            otkazivanjePosla
                .save()
                .then((otkazivanjePosla) => {
                res.json({ poruka: 'ok' });
            })
                .catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiOtkazivanja = (req, res) => {
            otkazivanjePosla_1.default.find({ status: 'na cekanju' }, (err, otkazivanja) => {
                if (err)
                    console.log(err);
                else
                    res.json(otkazivanja);
            });
        };
        this.promeniStatus = (req, res) => {
            let idPosao = req.body.idPosao;
            let status = req.body.status;
            otkazivanjePosla_1.default.updateOne({ idPosao: idPosao }, { $set: { status: status } }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ poruka: 'ok' });
            });
        };
        this.zahtevPostoji = (req, res) => {
            let idPosao = req.body.idPosao;
            otkazivanjePosla_1.default.findOne({ idPosao: idPosao }, (err, otkazivanje) => {
                if (err)
                    console.log(err);
                else {
                    if (otkazivanje)
                        res.json({ poruka: 'postoji' });
                    else
                        res.json({ poruka: 'ne postoji' });
                }
            });
        };
    }
}
exports.OtkazivanjePoslaController = OtkazivanjePoslaController;
//# sourceMappingURL=otkazivanje.controller.js.map