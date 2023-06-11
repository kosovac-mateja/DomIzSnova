import express from 'express';
import RecenzijaModel from '../models/recenzija';

export class RecenzijaController {
    dohvatiRezenzijeAgencije = (
        req: express.Request,
        res: express.Response
    ) => {
        let agencija = req.body.agencija;

        RecenzijaModel.find({ agencija: agencija }, (err, recenzije) => {
            if (err) console.log(err);
            else res.json(recenzije);
        });
    };

    dohvatiRecenzijeKlijenta = (
        req: express.Request,
        res: express.Response
    ) => {
        let klijent = req.body.klijent;

        RecenzijaModel.find({ klijent: klijent }, (err, recenzije) => {
            if (err) console.log(err);
            else res.json(recenzije);
        });
    };

    ubaciRecenziju = (req: express.Request, res: express.Response) => {
        let recenzija = new RecenzijaModel(req.body);

        recenzija
            .save()
            .then((recenzija) => {
                res.json({ poruka: 'ok' });
            })
            .catch((err) => {
                res.status(400).send('recenzija nije ubacena');
            });
    };

    azurirajRecenziju = (req: express.Request, res: express.Response) => {
        let idPosao = req.body.idPosao;
        let ocena = req.body.ocena;
        let komentar = req.body.komentar;

        console.log(idPosao, ocena, komentar);

        RecenzijaModel.updateOne(
            { idPosao: idPosao },
            {
                $set: {
                    ocena: ocena,
                    komentar: komentar,
                },
            }
        )
            .then((recenzija) => {
                res.json({ poruka: 'ok' });
            })
            .catch((err) => {
                res.status(400).send('recenzija nije azurirana');
            });
    };

    obrisiRecenziju = (req: express.Request, res: express.Response) => {
        let idPosao = req.body.idPosao;

        RecenzijaModel.deleteOne({ idPosao: idPosao })
            .then((recenzija) => {
                res.json({ poruka: 'ok' });
            })
            .catch((err) => {
                res.status(400).send('recenzija nije obrisana');
            });
    };
}
