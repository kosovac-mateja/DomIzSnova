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

    dohvatiSkicu = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        SkicaModel.findOne({ _id: id }, (err, skica) => {
            if (err) console.log(err);
            else res.json(skica);
        });
    };

    promeniBoju = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let boje = req.body.boje;

        SkicaModel.updateOne({ _id: id }, { boje: boje }, (err, skica) => {
            if (err) console.log(err);
            else res.json(skica);
        });
    };

    izmeniSkicu = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let koordinate = req.body.koordinate;
        let dimenzije = req.body.dimenzije;
        let koordinateVrata = req.body.koordinateVrata;

        SkicaModel.updateOne(
            { _id: id },
            {
                koordinate: koordinate,
                dimenzije: dimenzije,
                koordinateVrata: koordinateVrata,
            },
            (err, skica) => {
                if (err) console.log(err);
                else res.json(skica);
            }
        );
    };
}
