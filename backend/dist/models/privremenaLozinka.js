"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let PrivremenaLozinka = new Schema({
    korisnickoIme: {
        type: String,
    },
    lozinka: {
        type: String,
    },
    vremeIsteka: {
        type: Date,
    },
});
exports.default = mongoose_1.default.model('PrivremenaLozinkaModel', PrivremenaLozinka, 'privremeneLozinke');
//# sourceMappingURL=privremenaLozinka.js.map