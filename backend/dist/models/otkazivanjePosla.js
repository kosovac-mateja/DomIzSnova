"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let OtkazivanjePosla = new Schema({
    idPosao: {
        type: mongodb_1.ObjectId,
    },
    razlog: {
        type: String,
    },
    status: {
        type: String,
    },
});
exports.default = mongoose_1.default.model('OtkazivanjePoslaModel', OtkazivanjePosla, 'otkazivanjePosla');
//# sourceMappingURL=otkazivanjePosla.js.map