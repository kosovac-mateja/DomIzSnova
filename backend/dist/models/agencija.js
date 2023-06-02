"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Agencija = new Schema({
    korisnickoIme: {
        type: String,
    },
    telefon: {
        type: String,
    },
    mejl: {
        type: String,
    },
    slika: {
        type: String,
    },
    naziv: {
        type: String,
    },
    ulica: {
        type: String,
    },
    grad: {
        type: String,
    },
    drzava: {
        type: String,
    },
    maticniBroj: {
        type: String,
    },
    opis: {
        type: String,
    },
    kapacitetRadnika: {
        type: Number,
    },
});
exports.default = mongoose_1.default.model('AgencijaModel', Agencija, 'agencije');
//# sourceMappingURL=agencija.js.map