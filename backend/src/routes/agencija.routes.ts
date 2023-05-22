import express from 'express';
import { AgencijaController } from '../controllers/agencija.controller';

const agencijaRouter = express.Router();

agencijaRouter
    .route('/registracija')
    .post((req, res) => new AgencijaController().registracija(req, res));

agencijaRouter.route('/azurirajPodatak').post((req, res) => {
    new AgencijaController().azurirajPodatak(req, res);
});

export default agencijaRouter;
