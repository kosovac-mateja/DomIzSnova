import express from 'express';
import mongoose from 'mongoose';
import OtkazivanjePoslaModel from '../models/otkazivanjePosla';

export class OtkazivanjePoslaController {
    ubaci = (req: express.Request, res: express.Response) => {
        let otkazivanjePosla = new OtkazivanjePoslaModel(req.body);

        otkazivanjePosla
            .save()
            .then((otkazivanjePosla) => {
                res.json({ poruka: 'ok' });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    dohvatiOtkazivanja = (req: express.Request, res: express.Response) => {
        OtkazivanjePoslaModel.find(
            { status: 'na cekanju' },
            (err, otkazivanja) => {
                if (err) console.log(err);
                else res.json(otkazivanja);
            }
        );
    };

    promeniStatus = (req: express.Request, res: express.Response) => {
        let idPosao = req.body.idPosao;
        let status = req.body.status;

        OtkazivanjePoslaModel.updateOne(
            { idPosao: idPosao },
            { $set: { status: status } },
            (err) => {
                if (err) console.log(err);
                else res.json({ poruka: 'ok' });
            }
        );
    };

    zahtevPostoji = (req: express.Request, res: express.Response) => {
        let idPosao = req.body.idPosao;

        OtkazivanjePoslaModel.findOne(
            { idPosao: idPosao },
            (err, otkazivanje) => {
                if (err) console.log(err);
                else {
                    if (otkazivanje) res.json({ poruka: 'postoji' });
                    else res.json({ poruka: 'ne postoji' });
                }
            }
        );
    };
}
