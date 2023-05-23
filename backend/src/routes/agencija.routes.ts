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

export default agencijaRouter;
