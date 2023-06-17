import express from 'express';
import { SkicaController } from '../controllers/skica.controller';

const skicaRuter = express.Router();

skicaRuter.route('/ubaciSkicu').post((req, res) => {
    new SkicaController().ubaciSkicu(req, res);
});

skicaRuter.route('/dohvatiSkicu').post((req, res) => {
    new SkicaController().dohvatiSkicu(req, res);
});

skicaRuter.route('/promeniBoju').post((req, res) => {
    new SkicaController().promeniBoju(req, res);
});

skicaRuter.route('/izmeniSkicu').post((req, res) => {
    new SkicaController().izmeniSkicu(req, res);
});

export default skicaRuter;
