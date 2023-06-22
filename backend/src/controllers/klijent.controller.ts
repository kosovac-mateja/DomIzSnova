import express from 'express';
import KlijentModel from '../models/klijent';
import Klijent from '../models/klijent';

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

    azurirajKlijenta = (req: express.Request, res: express.Response) => {
        let klijent = new Klijent(req.body);

        KlijentModel.collection.updateOne(
            { korisnickoIme: klijent.korisnickoIme },
            {
                $set: {
                    korisnickoIme: klijent.korisnickoIme,
                    telefon: klijent.telefon,
                    mejl: klijent.mejl,
                    slika: klijent.slika,
                    ime: klijent.ime,
                    prezime: klijent.prezime,
                },
            },
            (greska, klijent) => {
                if (greska) {
                    console.log(greska);
                } else {
                    res.json({ poruka: 'ok' });
                }
            }
        );
    };

    dohvatiKlijenta = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        KlijentModel.findOne(
            { korisnickoIme: korisnickoIme },
            (greska, klijent) => {
                if (greska) {
                    console.log(greska);
                } else {
                    res.json(klijent);
                }
            }
        );
    };

    dohvatiKlijentaPoMejlu = (req: express.Request, res: express.Response) => {
        let mejl = req.body.mejl;

        KlijentModel.findOne({ mejl: mejl }, (greska, klijent) => {
            if (greska) {
                console.log(greska);
            } else {
                res.json(klijent);
            }
        });
    };

    mejlPostoji = (req: express.Request, res: express.Response) => {
        let mejl = req.body.mejl;

        KlijentModel.findOne({ mejl: mejl }, (greska, klijent) => {
            if (greska) {
                console.log(greska);
            } else {
                if (klijent) {
                    res.json({ postoji: 'da' });
                } else {
                    res.json({ postoji: 'ne' });
                }
            }
        });
    };

    dohvatiSveKlijente = (req: express.Request, res: express.Response) => {
        KlijentModel.find({}, (greska, klijenti) => {
            if (greska) {
                console.log(greska);
            } else {
                res.json(klijenti);
            }
        });
    };

    obrisiKlijenta = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        KlijentModel.deleteOne(
            { korisnickoIme: korisnickoIme },
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
