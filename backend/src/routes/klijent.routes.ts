import express from 'express';
import { KlijentController } from '../controllers/klijent.controller';

const klijentRouter = express.Router();

klijentRouter
    .route('/registracija')
    .post((req, res) => new KlijentController().registracija(req, res));

klijentRouter.route('/azurirajPodatak').post((req, res) => {
    new KlijentController().azurirajPodatak(req, res);
});

klijentRouter.route('/azurirajKlijenta').post((req, res) => {
    new KlijentController().azurirajKlijenta(req, res);
});

klijentRouter.route('/dohvatiKlijenta').post((req, res) => {
    new KlijentController().dohvatiKlijenta(req, res);
});

klijentRouter.route('/mejlPostoji').post((req, res) => {
    new KlijentController().mejlPostoji(req, res);
});

klijentRouter.route('/dohvatiKlijentaPoMejlu').post((req, res) => {
    new KlijentController().dohvatiKlijentaPoMejlu(req, res);
});

klijentRouter.route('/dohvatiKlijente').get((req, res) => {
    new KlijentController().dohvatiSveKlijente(req, res);
});

klijentRouter.route('/obrisiKlijenta').post((req, res) => {
    new KlijentController().obrisiKlijenta(req, res);
});

export default klijentRouter;
