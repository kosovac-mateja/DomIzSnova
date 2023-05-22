import express from 'express';
import { KlijentController } from '../controllers/klijent.controller';

const klijentRouter = express.Router();

klijentRouter
    .route('/registracija')
    .post((req, res) => new KlijentController().registracija(req, res));

export default klijentRouter;
