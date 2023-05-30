import express from 'express';
import ObjekatModel from '../models/objekat';

export class ObjekatController {
    dohvatiObjekteVlasnika = (req: express.Request, res: express.Response) => {
        let vlasnik = req.body.vlasnik;

        ObjekatModel.find({ vlasnik: vlasnik }, (err, objekti) => {
            if (err) console.log(err);
            else res.json(objekti);
        });
    };

    obrisiObjekat = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        ObjekatModel.deleteOne({ _id: id }, (err) => {
            if (err) console.log(err);
            else res.json({ obrisan: 'da' });
        });
    };

    dodajObjekat = (req: express.Request, res: express.Response) => {
        let objekat = new ObjekatModel(req.body);

        objekat
            .save()
            .then((objekat) => {
                res.json({ objekat: 'dodat' });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    azurirajObjekat = (req: express.Request, res: express.Response) => {
        let objekat = new ObjekatModel(req.body);

        ObjekatModel.collection.updateOne(
            { _id: objekat._id },
            {
                $set: {
                    vlasnik: objekat.vlasnik,
                    tip: objekat.tip,
                    adresa: objekat.adresa,
                    brProstorija: objekat.brProstorija,
                    kvadratura: objekat.kvadratura,
                    idSkica: objekat.idSkica,
                },
            },
            (greska, objekat) => {
                if (greska) {
                    console.log(greska);
                } else {
                    res.json({ poruka: 'ok' });
                }
            }
        );
    };
}
