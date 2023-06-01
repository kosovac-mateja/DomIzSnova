import express from 'express';
import { SkicaController } from '../controllers/skica.controller';

const skicaRuter = express.Router();

skicaRuter.route('/ubaciSkicu').post((req, res) => {
    new SkicaController().ubaciSkicu(req, res);
});

export default skicaRuter;
