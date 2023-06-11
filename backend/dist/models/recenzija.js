"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Recenzija = new Schema({
    idPosao: {
        type: mongodb_1.ObjectId,
    },
    klijent: {
        type: String,
    },
    agencija: {
        type: String,
    },
    ocena: {
        type: Number,
    },
    komentar: {
        type: String,
    },
});
exports.default = mongoose_1.default.model('RecenzijaModel', Recenzija, 'recenzije');
//# sourceMappingURL=recenzija.js.map