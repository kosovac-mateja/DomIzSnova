import express from 'express';
import AgencijaModel from '../models/agencija';

export class AgencijaController {
    registracija = (req: express.Request, res: express.Response) => {
        let agencija = new AgencijaModel(req.body);

        agencija.save((greska, agencija) => {
            if (greska) {
                console.log(greska);
            } else {
                res.json({ poruka: 'ok' });
            }
        });
    };

    azurirajPodatak = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let podatak = req.body.podatak;
        let vrednost = req.body.vrednost;

        AgencijaModel.collection.updateOne(
            { korisnickoIme: korisnickoIme },
            { $set: { [podatak]: vrednost } },
            (greska, agencija) => {
                if (greska) {
                    console.log(greska);
                } else {
                    res.json({ poruka: 'ok' });
                }
            }
        );
    };
}
