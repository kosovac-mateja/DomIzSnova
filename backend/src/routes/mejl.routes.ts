import express from 'express';
import { MejlController } from '../controllers/mejl.controller';

const mejlRuter = express.Router();

mejlRuter.route('/posaljiMejl').post((req, res) => {
    new MejlController().posaljiMejl(req, res);
});

mejlRuter.route('/ubaciPrivremenuLozinku').post((req, res) => {
    new MejlController().ubaciPrivremenuLozinku(req, res);
});

mejlRuter.route('/dohvatiPrivremeneLozinke').post((req, res) => {
    new MejlController().dohvatiPrivremeneLozinke(req, res);
});

export default mejlRuter;
