import express from 'express';
import { PossaoController } from '../controllers/posao.controller';

const posaoRuter = express.Router();

posaoRuter
    .route('/ubaciPosao')
    .post((req, res) => new PossaoController().ubaciPosao(req, res));

posaoRuter
    .route('/dohvatiPosloveKlijenta')
    .post((req, res) =>
        new PossaoController().dohvatiPosloveKlijenta(req, res)
    );

export default posaoRuter;
