import express from 'express';
import SkicaModel from '../models/skica';
import mongoose from 'mongoose';

export class SkicaController {
    ubaciSkicu = (req: express.Request, res: express.Response) => {
        req.body._id = new mongoose.Types.ObjectId();
        let novaSkica = new SkicaModel(req.body);
        novaSkica
            .save()
            .then((skica) => {
                res.json(skica);
            })
            .catch((err) => {
                console.log(err);
            });
    };
}
