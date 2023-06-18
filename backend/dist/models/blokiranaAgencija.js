"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let BlokiranaAgencija = new Schema({
    korisnickoIme: {
        type: String,
    },
    datumOdblokiranja: {
        type: Date,
    },
    brojPozitivnihOcena: {
        type: Number,
    },
});
exports.default = mongoose_1.default.model('BlokiranaAgencijaModel', BlokiranaAgencija, 'blokiraneAgencije');
//# sourceMappingURL=blokiranaAgencija.js.map