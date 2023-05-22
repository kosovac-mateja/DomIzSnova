import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter = express.Router();

korisnikRouter
    .route('/ubaci')
    .post((req, res) => new KorisnikController().ubaci(req, res));

korisnikRouter
    .route('/dohvatiKorisnike')
    .get((req, res) => new KorisnikController().dohvatiSve(req, res));

korisnikRouter
    .route('/korisnikPostoji')
    .post((req, res) => new KorisnikController().korisnikPostoji(req, res));

export default korisnikRouter;
