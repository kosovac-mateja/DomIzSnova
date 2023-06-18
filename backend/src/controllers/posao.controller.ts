import express from 'express';
import PosaoModel from '../models/posao';
import Posao from '../models/posao';
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

    dohvatiPosloveAgencije = (req: express.Request, res: express.Response) => {
        let agencija = req.body.agencija;

        PosaoModel.find({ agencija: agencija }, (err, poslovi) => {
            if (err) console.log(err);
            else res.json(poslovi);
        });
    };

    azurirajPodatak = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let podatak = req.body.podatak;
        let vrednost = req.body.vrednost;

        PosaoModel.updateOne(
            { _id: id },
            { $set: { [podatak]: vrednost } },
            (greska) => {
                if (greska) {
                    console.log(greska);
                } else {
                    res.json({ poruka: 'ok' });
                }
            }
        );
    };

    obrisiPosao = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        PosaoModel.deleteOne({ _id: id }, (greska) => {
            if (greska) {
                console.log(greska);
            } else {
                res.json({ poruka: 'ok' });
            }
        });
    };

    dohvatiPosao = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        PosaoModel.findOne({ _id: id }, (err, posao) => {
            if (err) console.log(err);
            else res.json(posao);
        });
    };
}
