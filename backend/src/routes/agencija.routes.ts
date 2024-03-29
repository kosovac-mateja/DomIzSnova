import express from 'express';
import { AgencijaController } from '../controllers/agencija.controller';

const agencijaRouter = express.Router();

agencijaRouter
    .route('/registracija')
    .post((req, res) => new AgencijaController().registracija(req, res));

agencijaRouter.route('/azurirajPodatak').post((req, res) => {
    new AgencijaController().azurirajPodatak(req, res);
});

agencijaRouter.route('/azurirajAgenciju').post((req, res) => {
    new AgencijaController().azurirajAgenciju(req, res);
});

agencijaRouter.route('/dohvatiAgenciju').post((req, res) => {
    new AgencijaController().dohvatiAgenciju(req, res);
});

agencijaRouter.route('/dohvatiAgencije').get((req, res) => {
    new AgencijaController().dohvatiAgencije(req, res);
});

agencijaRouter.route('/dohvatiAgencijePoNazivu').post((req, res) => {
    new AgencijaController().dohvatiAgencijePoNazivu(req, res);
});

agencijaRouter.route('/dohvatiAgencijePoAdresi').post((req, res) => {
    new AgencijaController().dohvatiAgencijePoAdresi(req, res);
});

agencijaRouter.route('/dohvatiAgencijePoNazivuIAdresi').post((req, res) => {
    new AgencijaController().dohvatiAgencijePoNazivuIAdresi(req, res);
});

agencijaRouter.route('/mejlPostoji').post((req, res) => {
    new AgencijaController().mejlPostoji(req, res);
});

agencijaRouter.route('/dohvatiAgencijuPoMejlu').post((req, res) => {
    new AgencijaController().dohvatiAgencijuPoMejlu(req, res);
});

agencijaRouter.route('/otkaziPosao').post((req, res) => {
    new AgencijaController().otkaziPosao(req, res);
});

agencijaRouter.route('/obrisiAgenciju').post((req, res) => {
    new AgencijaController().obrisiAgenciju(req, res);
});

export default agencijaRouter;
