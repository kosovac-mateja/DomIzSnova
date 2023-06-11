import express from 'express';
import { RecenzijaController } from '../controllers/recenzija.controller';

const recenzijaRuter = express.Router();

recenzijaRuter.route('/dohvatiRecenzijeAgencije').post((req, res) => {
    new RecenzijaController().dohvatiRezenzijeAgencije(req, res);
});

recenzijaRuter.route('/dohvatiRecenzijeKlijenta').post((req, res) => {
    new RecenzijaController().dohvatiRecenzijeKlijenta(req, res);
});

recenzijaRuter.route('/ubaciRecenziju').post((req, res) => {
    new RecenzijaController().ubaciRecenziju(req, res);
});

recenzijaRuter.route('/azurirajRecenziju').post((req, res) => {
    new RecenzijaController().azurirajRecenziju(req, res);
});

recenzijaRuter.route('/obrisiRecenziju').post((req, res) => {
    new RecenzijaController().obrisiRecenziju(req, res);
});

export default recenzijaRuter;
