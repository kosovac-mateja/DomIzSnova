"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_1 = __importDefault(require("../models/admin"));
class AdminController {
    constructor() {
        this.dohvatiSve = (req, res) => {
            let admin = new admin_1.default(req.body);
            admin_1.default.find({}, (err, admin) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(admin);
                }
            });
        };
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map