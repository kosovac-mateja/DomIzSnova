import express from 'express';
import cron from 'node-cron';
import BlokiranaAgencijaModel from '../models/blokiranaAgencija';

export class BlokiranjeController {
    cronJob = cron.schedule('0 * * * *', async () => {
        try {
            const sad = new Date(new Date().getTime());
            const zaOdblokiranje = await BlokiranaAgencijaModel.find({
                datumOdblokiranja: { $lt: sad },
            });

            zaOdblokiranje.forEach((agencija) => {
                BlokiranaAgencijaModel.deleteOne({
                    korisnickoIme: agencija.korisnickoIme,
                }).then((agencija) => {});
            });
        } catch (greska) {
            console.error('Greska prilikom brisanja(cronJob):', greska);
        }
    });

    startuj = (req: express.Request, res: express.Response) => {
        this.cronJob.start();
        res.json({ cronJob: 'ok' });
    };

    ubaci = (req: express.Request, res: express.Response) => {
        req.body.datumOdblokiranja = new Date(
            new Date().getTime() + 7 * 24 * 60 * 60 * 1000
        );
        let blokiranaAgencija = new BlokiranaAgencijaModel(req.body);

        blokiranaAgencija.save().then((blokiranaAgencija) => {
            res.json({ blokiranaAgencija: 'ok' });
        });
    };

    dohvatiAgenciju = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        BlokiranaAgencijaModel.findOne({ korisnickoIme: korisnickoIme }).then(
            (agencija) => {
                res.json(agencija);
            }
        );
    };

    izbrisi = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        BlokiranaAgencijaModel.deleteOne({ korisnickoIme: korisnickoIme }).then(
            (agencija) => {
                res.json(agencija);
            }
        );
    };

    dodajPozitivnuOcenu = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        console.log(korisnickoIme);
        BlokiranaAgencijaModel.updateOne(
            { korisnickoIme: korisnickoIme },
            { $inc: { brojPozitivnihOcena: 1 } }
        ).then((agencija) => {
            res.json(agencija);
        });
    };

    dohvatiSve = (req: express.Request, res: express.Response) => {
        BlokiranaAgencijaModel.find().then((agencije) => {
            res.json(agencije);
        });
    };
}
