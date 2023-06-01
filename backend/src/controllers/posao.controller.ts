import express from 'express';
import PosaoModel from '../models/posao';
import mongoose from 'mongoose';

export class PossaoController {
    ubaciPosao = (req: express.Request, res: express.Response) => {
        req.body._id = new mongoose.Types.ObjectId();
        let noviPosao = new PosaoModel(req.body);
        noviPosao
            .save()
            .then((posao) => {
                res.json(posao);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    dohvatiPosloveKlijenta = (req: express.Request, res: express.Response) => {
        let klijent = req.body.klijent;

        PosaoModel.find({ klijent: klijent }, (err, poslovi) => {
            if (err) console.log(err);
            else res.json(poslovi);
        });
    };
}
