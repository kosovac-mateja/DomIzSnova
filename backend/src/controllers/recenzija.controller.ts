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
}
