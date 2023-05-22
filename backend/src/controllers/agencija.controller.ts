import express from 'express';
import AgencijaModel from '../models/agencija';

export class AgencijaController {
    registracija = (req: express.Request, res: express.Response) => {
        let agencija = new AgencijaModel(req.body);
        //TODO: provera da li vec postoji korisnik sa tim korisnickim imenom

        agencija.save((greska, agencija) => {
            if (greska) {
                console.log(greska);
            } else {
                res.json({ poruka: 'ok' });
            }
        });
    };
}
