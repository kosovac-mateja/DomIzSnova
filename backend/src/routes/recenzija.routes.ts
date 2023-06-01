import express from 'express';
import { RecenzijaController } from '../controllers/recenzija.controller';

const recenzijaRuter = express.Router();

recenzijaRuter.route('/dohvatiRecenzijeAgencije').post((req, res) => {
    new RecenzijaController().dohvatiRezenzijeAgencije(req, res);
});

export default recenzijaRuter;
