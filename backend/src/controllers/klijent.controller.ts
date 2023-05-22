import express from 'express';
import KlijentModel from '../models/klijent';

export class KlijentController {
    registracija = (req: express.Request, res: express.Response) => {
        let klijent = new KlijentModel(req.body);
        //TODO: provera da li vec postoji korisnik sa tim korisnickim imenom

        klijent.save((greska, klijent) => {
            if (greska) {
                console.log(greska);
            } else {
                res.json({ poruka: 'ok' });
            }
        });
    };
}
