import express from 'express';
import KlijentModel from '../models/klijent';

export class KlijentController {
    registracija = (req: express.Request, res: express.Response) => {
        let klijent = new KlijentModel(req.body);

        klijent.save((greska, klijent) => {
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

        KlijentModel.collection.updateOne(
            { korisnickoIme: korisnickoIme },
            { $set: { [podatak]: vrednost } },
            (greska, klijent) => {
                if (greska) {
                    console.log(greska);
                } else {
                    res.json({ poruka: 'ok' });
                }
            }
        );
    };
}
