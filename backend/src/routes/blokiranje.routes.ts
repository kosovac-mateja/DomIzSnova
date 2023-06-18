import express from 'express';
import { BlokiranjeController } from '../controllers/blokiranje.controller';

const blokiranjeRuter = express.Router();

blokiranjeRuter
    .route('/ubaci')
    .post((req, res) => new BlokiranjeController().ubaci(req, res));

blokiranjeRuter
    .route('/dohvatiAgenciju')
    .post((req, res) => new BlokiranjeController().dohvatiAgenciju(req, res));

blokiranjeRuter
    .route('/izbrisi')
    .post((req, res) => new BlokiranjeController().izbrisi(req, res));

blokiranjeRuter
    .route('/startuj')
    .get((req, res) => new BlokiranjeController().startuj(req, res));

blokiranjeRuter
    .route('/dodajPozitivnuOcenu')
    .post((req, res) =>
        new BlokiranjeController().dodajPozitivnuOcenu(req, res)
    );

blokiranjeRuter
    .route('/dohvatiSve')
    .get((req, res) => new BlokiranjeController().dohvatiSve(req, res));

export default blokiranjeRuter;
