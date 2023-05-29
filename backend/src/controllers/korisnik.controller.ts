import express from 'express';
import KorisnikModel from '../models/korisnik';

export class KorisnikController {
    ubaci(req: express.Request, res: express.Response) {
        let korisnik = new KorisnikModel(req.body);

        korisnik.save((greska, korisnik) => {
            if (greska) {
                console.log(greska);
            } else {
                res.json({ poruka: 'ok' });
            }
        });
    }

    dohvatiSve(req: express.Request, res: express.Response) {
        KorisnikModel.find({}, (greska, korisnici) => {
            if (greska) {
                console.log(greska);
            } else {
                res.json(korisnici);
            }
        });
    }

    dohvatiKorisnika(req: express.Request, res: express.Response) {
        let korisnickoIme = req.body.korisnickoIme;

        KorisnikModel.findOne(
            { korisnickoIme: korisnickoIme },
            (greska, korisnik) => {
                if (greska) {
                    console.log(greska);
                } else {
                    res.json(korisnik);
                }
            }
        );
    }

    korisnikPostoji(req: express.Request, res: express.Response) {
        let korisnickoIme = req.body.korisnickoIme;

        KorisnikModel.findOne(
            { korisnickoIme: korisnickoIme },
            (greska, korisnik) => {
                if (greska) {
                    console.log(greska);
                } else {
                    if (korisnik) {
                        res.json({ postoji: 'da' });
                    } else {
                        res.json({ postoji: 'ne' });
                    }
                }
            }
        );
    }

    azurirajStatus(req: express.Request, res: express.Response) {
        let korisnickoIme = req.body.korisnickoIme;
        let vrednost = req.body.vrednost;

        KorisnikModel.updateOne(
            { korisnickoIme: korisnickoIme },
            { $set: { status: vrednost } },
            (greska, korisnik) => {
                if (greska) {
                    console.log(greska);
                } else {
                    res.json({ poruka: 'ok' });
                }
            }
        );
    }

    obrisi(req: express.Request, res: express.Response) {
        let korisnickoIme = req.body.korisnickoIme;

        KorisnikModel.deleteOne(
            { korisnickoIme: korisnickoIme },
            (greska, korisnik) => {
                if (greska) {
                    console.log(greska);
                } else {
                    res.json({ poruka: 'ok' });
                }
            }
        );
    }
}
