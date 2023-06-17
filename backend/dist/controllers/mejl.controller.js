"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MejlController = void 0;
const privremenaLozinka_1 = __importDefault(require("../models/privremenaLozinka"));
class MejlController {
    constructor() {
        this.nasumicanKarakter = (nizKaraktera) => {
            const slucajanBroj = Math.floor(Math.random() * nizKaraktera.length);
            return nizKaraktera[slucajanBroj];
        };
        this.generisiSifru = () => {
            const malaSlova = 'abcdefghijklmnopqrstuvwxyz';
            const velikaSlova = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const cifre = '0123456789';
            const specijalniKarakteri = '!"#$%&*_-+=/|:;,.<>?';
            const duzinaLozinke = Math.floor(Math.random() * 6) + 7; //izmedju 7 i 12 karaktera
            let lozinka = this.nasumicanKarakter(malaSlova + velikaSlova);
            while (lozinka.length < duzinaLozinke) {
                const kategorija = Math.floor(Math.random() * 4);
                switch (kategorija) {
                    case 0:
                        lozinka += this.nasumicanKarakter(malaSlova);
                        break;
                    case 1:
                        lozinka += this.nasumicanKarakter(velikaSlova);
                        break;
                    case 2:
                        lozinka += this.nasumicanKarakter(cifre);
                        break;
                    case 3:
                        lozinka += this.nasumicanKarakter(specijalniKarakteri);
                        break;
                }
            }
            return lozinka;
        };
        this.posaljiMejl = (req, res) => {
            let mejl = req.body.mejl;
            this.privremenaLozinka = this.generisiSifru();
            const nodemailer = require('nodemailer');
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'ottilie.marquardt61@ethereal.email',
                    pass: '2cVsFHausmGVbUbtCN',
                },
            });
            const mailOptions = {
                from: 'resetovanjelozinke@domizsnova.rs',
                to: mejl,
                subject: 'Resetovanje lozinke',
                text: 'Postovani, vasa nova lozinka je: ' +
                    this.privremenaLozinka +
                    '\n' +
                    'Imate 10 minuta da je promenite.\n\n' +
                    'Srdačan pozdrav,\nDom iz Snova',
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Greska pri slanju mejla', error);
                }
                else {
                    console.log('Mejl poslat');
                    console.log('Svi mejlovi: ', nodemailer.getTestMessageUrl(info));
                    res.json({ lozinka: this.privremenaLozinka });
                }
            });
        };
        this.ubaciPrivremenuLozinku = (req, res) => {
            const datum = new Date();
            let privremenaLozinka = new privremenaLozinka_1.default({
                korisnickoIme: req.body.korisnickoIme,
                lozinka: req.body.lozinka,
                vremeIsteka: new Date(datum.getTime() + 10 * 60000), //10 minuta
            });
            privremenaLozinka.save((greska, privremenaLozinka) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json({ poruka: 'ok' });
                }
            });
        };
        this.dohvatiPrivremeneLozinke = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            privremenaLozinka_1.default.find({ korisnickoIme: korisnickoIme }, (greska, privremeneLozinke) => {
                if (greska) {
                    console.log(greska);
                }
                else {
                    res.json(privremeneLozinke);
                }
            });
        };
        this.privremenaLozinka = '';
    }
}
exports.MejlController = MejlController;
//# sourceMappingURL=mejl.controller.js.map