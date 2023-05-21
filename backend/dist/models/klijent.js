"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Klijent = new Schema({
    korisnickoIme: {
        type: String,
    },
    ime: {
        type: String,
    },
    prezime: {
        type: String,
    },
});
exports.default = mongoose_1.default.model('KlijentModel', Klijent, 'klijenti');
//# sourceMappingURL=klijent.js.map