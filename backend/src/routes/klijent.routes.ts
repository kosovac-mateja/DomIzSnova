import express from 'express';
import { KlijentController } from '../controllers/klijent.controller';

const klijentRouter = express.Router();

klijentRouter
    .route('/registracija')
    .post((req, res) => new KlijentController().registracija(req, res));

klijentRouter.route('/azurirajPodatak').post((req, res) => {
    new KlijentController().azurirajPodatak(req, res);
});
export default klijentRouter;
