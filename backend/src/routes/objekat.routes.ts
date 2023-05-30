import express from 'express';
import { ObjekatController } from '../controllers/objekat.controller';

const objekatRuter = express.Router();

objekatRuter
    .route('/dohvatiObjekteVlasnika')
    .post((req, res) =>
        new ObjekatController().dohvatiObjekteVlasnika(req, res)
    );

objekatRuter
    .route('/obrisiObjekat')
    .post((req, res) => new ObjekatController().obrisiObjekat(req, res));

objekatRuter
    .route('/dodajObjekat')
    .post((req, res) => new ObjekatController().dodajObjekat(req, res));

objekatRuter
    .route('/azurirajObjekat')
    .post((req, res) => new ObjekatController().azurirajObjekat(req, res));

export default objekatRuter;
