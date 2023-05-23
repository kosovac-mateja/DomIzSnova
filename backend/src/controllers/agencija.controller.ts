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
            (greska, agencija) => {
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
}
