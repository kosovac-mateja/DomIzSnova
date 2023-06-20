"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Posao = new Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    klijent: {
        type: String,
    },
    agencija: {
        type: String,
    },
    idObjekat: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    status: {
        type: String,
    },
    prekid: {
        Boolean,
    },
    pocetak: {
        type: Date,
    },
    kraj: {
        type: Date,
    },
    ponuda: {
        type: Number,
    },
});
exports.default = mongoose_1.default.model('PosaoModel', Posao, 'poslovi');
//# sourceMappingURL=posao.js.map