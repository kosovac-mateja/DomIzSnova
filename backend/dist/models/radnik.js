"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Radnik = new Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    ime: {
        type: String,
    },
    prezime: {
        type: String,
    },
    mejl: {
        type: String,
    },
    telefon: {
        type: String,
    },
    specijalizacija: {
        type: String,
    },
    agencija: {
        type: String,
    },
    zauzet: {
        type: Boolean,
    },
});
exports.default = mongoose_1.default.model('RadnikModel', Radnik, 'radnici');
//# sourceMappingURL=radnik.js.map