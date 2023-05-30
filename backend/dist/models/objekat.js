"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Objekat = new Schema({
    _id: {
        type: mongodb_1.ObjectId,
    },
    vlasnik: {
        type: String,
    },
    tip: {
        type: String,
    },
    adresa: {
        type: String,
    },
    brProstorija: {
        type: Number,
    },
    kvadratura: {
        type: Number,
    },
    idSkica: {
        type: mongodb_1.ObjectId,
    },
});
exports.default = mongoose_1.default.model('ObjekatModel', Objekat, 'objekti');
//# sourceMappingURL=objekat.js.map