import express from 'express';
import AdminModel from '../models/admin';

export class AdminController {
    dohvatiSve = (req: express.Request, res: express.Response) => {
        let admin = new AdminModel(req.body);

        AdminModel.find({}, (err, admin) => {
            if (err) {
                console.log(err);
            } else {
                res.json(admin);
            }
        });
    };
}
