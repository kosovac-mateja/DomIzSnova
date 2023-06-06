import express from 'express';
import RadnikModel from '../models/radnik';
import mongoose from 'mongoose';
import radnik from '../models/radnik';

export class RadnikController {
    dohvatiRadnikeAgencije = (req: express.Request, res: express.Response) => {
        let agencija = req.body.agencija;

        RadnikModel.find({ agencija: agencija }, (err, radnici) => {
            if (err) {
                console.log(err);
            } else {
                res.json(radnici);
            }
        });
    };

    azurirajRadnika = (req: express.Request, res: express.Response) => {
        let radnik = new RadnikModel(req.body);

        RadnikModel.updateOne(
            { _id: radnik._id },
            {
                $set: {
                    ime: radnik.ime,
                    prezime: radnik.prezime,
                    mejl: radnik.mejl,
                    telefon: radnik.telefon,
                    specijalizacija: radnik.specijalizacija,
                },
            },
            (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json({ poruka: 'ok' });
                }
            }
        );
    };

    dodajRadnika = (req: express.Request, res: express.Response) => {
        req.body._id = new mongoose.Types.ObjectId();
        let radnik = new RadnikModel(req.body);

        radnik
            .save()
            .then((radnik) => {
                res.json({ poruka: 'ok' });
            })
            .catch((err) => {
                res.json({ poruka: 'greska' });
            });
    };

    obrisiRadnika = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        RadnikModel.deleteOne({ _id: id }, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ poruka: 'ok' });
            }
        });
    };

    dohvatiDostupneRadnike = (req: express.Request, res: express.Response) => {
        let agencija = req.body.agencija;

        RadnikModel.find(
            { agencija: agencija, idPosao: null },
            (err, radnici) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(radnici);
                }
            }
        );
    };

    dohvatiRadnikeNaPoslu = (req: express.Request, res: express.Response) => {
        let idPosao = req.body.idPosao;

        RadnikModel.find({ idPosao: idPosao }, (err, radnici) => {
            if (err) {
                console.log(err);
            } else {
                res.json(radnici);
            }
        });
    };

    azurirajPosaoRadnika = (req: express.Request, res: express.Response) => {
        let idRadnik = req.body.idRadnik;
        let idPosao = req.body.idPosao;

        RadnikModel.updateOne(
            { _id: idRadnik },
            { $set: { idPosao: idPosao } },
            (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json({ poruka: 'ok' });
                }
            }
        );
    };
}
