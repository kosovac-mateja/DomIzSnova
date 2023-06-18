"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlokiranjeController = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const blokiranaAgencija_1 = __importDefault(require("../models/blokiranaAgencija"));
class BlokiranjeController {
    constructor() {
        this.cronJob = node_cron_1.default.schedule('0 * * * *', () => __awaiter(this, void 0, void 0, function* () {
            try {
                const sad = new Date(new Date().getTime());
                const zaOdblokiranje = yield blokiranaAgencija_1.default.find({
                    datumOdblokiranja: { $lt: sad },
                });
                zaOdblokiranje.forEach((agencija) => {
                    blokiranaAgencija_1.default.deleteOne({
                        korisnickoIme: agencija.korisnickoIme,
                    }).then((agencija) => { });
                });
            }
            catch (greska) {
                console.error('Greska prilikom brisanja(cronJob):', greska);
            }
        }));
        this.startuj = (req, res) => {
            this.cronJob.start();
            res.json({ cronJob: 'ok' });
        };
        this.ubaci = (req, res) => {
            req.body.datumOdblokiranja = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
            let blokiranaAgencija = new blokiranaAgencija_1.default(req.body);
            blokiranaAgencija.save().then((blokiranaAgencija) => {
                res.json({ blokiranaAgencija: 'ok' });
            });
        };
        this.dohvatiAgenciju = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            blokiranaAgencija_1.default.findOne({ korisnickoIme: korisnickoIme }).then((agencija) => {
                res.json(agencija);
            });
        };
        this.izbrisi = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            blokiranaAgencija_1.default.deleteOne({ korisnickoIme: korisnickoIme }).then((agencija) => {
                res.json(agencija);
            });
        };
        this.dodajPozitivnuOcenu = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            console.log(korisnickoIme);
            blokiranaAgencija_1.default.updateOne({ korisnickoIme: korisnickoIme }, { $inc: { brojPozitivnihOcena: 1 } }).then((agencija) => {
                res.json(agencija);
            });
        };
        this.dohvatiSve = (req, res) => {
            blokiranaAgencija_1.default.find().then((agencije) => {
                res.json(agencije);
            });
        };
    }
}
exports.BlokiranjeController = BlokiranjeController;
//# sourceMappingURL=blokiranje.controller.js.map