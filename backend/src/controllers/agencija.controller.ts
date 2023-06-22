import express from 'express';
import AgencijaModel from '../models/agencija';
import Agencija from '../models/agencija';

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
            (greska) => {
                if (greska) {
                    console.log(greska);
                } else {
                    res.json({ poruka: 'ok' });
                }
            }
        );
    };

    azurirajAgenciju = (req: express.Request, res: express.Response) => {
        let agencija = new Agencija(req.body);

        AgencijaModel.collection.updateOne(
            { korisnickoIme: agencija.korisnickoIme },
            {
                $set: {
                    korisnickoIme: agencija.korisnickoIme,
                    mejl: agencija.mejl,
                    slika: agencija.slika,
                    naziv: agencija.naziv,
                    ulica: agencija.ulica,
                    grad: agencija.grad,
                    drzava: agencija.drzava,
                    maticniBroj: agencija.maticniBroj,
                    opis: agencija.opis,
                },
            },
            (greska, agencija) => {
                if (greska) {
                    console.log(greska);
                } else {
                    res.json({ poruka: 'ok' });
                }
            }
        );
    };

    dohvatiAgenciju = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        AgencijaModel.findOne(
            { korisnickoIme: korisnickoIme },
            (greska, agencija) => {
                if (greska) {
                    console.log(greska);
                } else {
                    res.json(agencija);
                }
            }
        );
    };

    dohvatiAgencije = (req: express.Request, res: express.Response) => {
        AgencijaModel.find({}, (greska, agencije) => {
            if (greska) {
                console.log(greska);
            } else {
                res.json(agencije);
            }
        });
    };

    dohvatiAgencijePoNazivu = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;

        AgencijaModel.find(
            { naziv: { $regex: naziv, $options: 'i' } },
            (greska, agencije) => {
                if (greska) {
                    console.log(greska);
                } else {
                    res.json(agencije);
                }
            }
        );
    };

    dohvatiAgencijePoAdresi = (req: express.Request, res: express.Response) => {
        let adresa = req.body.adresa;

        AgencijaModel.find(
            { ulica: { $regex: adresa, $options: 'i' } },
            (greska, agencije) => {
                if (greska) {
                    console.log(greska);
                } else {
                    res.json(agencije);
                }
            }
        );
    };

    dohvatiAgencijePoNazivuIAdresi = (
        req: express.Request,
        res: express.Response
    ) => {
        let naziv = req.body.naziv;
        let adresa = req.body.adresa;

        AgencijaModel.find(
            {
                naziv: { $regex: naziv, $options: 'i' },
                ulica: { $regex: adresa, $options: 'i' },
            },
            (greska, agencije) => {
                if (greska) {
                    console.log(greska);
                } else {
                    res.json(agencije);
                }
            }
        );
    };

    mejlPostoji = (req: express.Request, res: express.Response) => {
        let mejl = req.body.mejl;

        AgencijaModel.findOne({ mejl: mejl }, (greska, agencija) => {
            if (greska) {
                console.log(greska);
            } else {
                if (agencija) {
                    res.json({ postoji: 'da' });
                } else {
                    res.json({ postoji: 'ne' });
                }
            }
        });
    };

    dohvatiAgencijuPoMejlu = (req: express.Request, res: express.Response) => {
        let mejl = req.body.mejl;

        AgencijaModel.findOne({ mejl: mejl }, (greska, agencija) => {
            if (greska) {
                console.log(greska);
            } else {
                res.json(agencija);
            }
        });
    };

    otkaziPosao = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        AgencijaModel.updateOne(
            { korisnickoIme: korisnickoIme },
            { $inc: { brojOtkazanih: 1 } },
            (greska) => {
                if (greska) {
                    console.log(greska);
                } else {
                    res.json({ poruka: 'ok' });
                }
            }
        );
    };

    obrisiAgenciju = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        AgencijaModel.deleteOne({ korisnickoIme: korisnickoIme }, (greska) => {
            if (greska) {
                console.log(greska);
            } else {
                res.json({ poruka: 'ok' });
            }
        });
    };
}
