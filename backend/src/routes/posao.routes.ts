import express from 'express';
import { PossaoController } from '../controllers/posao.controller';

const posaoRuter = express.Router();

posaoRuter.route('/ubaciPosao').post((req, res) => {
    new PossaoController().ubaciPosao(req, res);
});

posaoRuter.route('/dohvatiPosloveKlijenta').post((req, res) => {
    new PossaoController().dohvatiPosloveKlijenta(req, res);
});

posaoRuter.route('/dohvatiPosloveAgencije').post((req, res) => {
    new PossaoController().dohvatiPosloveAgencije(req, res);
});

posaoRuter.route('/azurirajPodatak').post((req, res) => {
    new PossaoController().azurirajPodatak(req, res);
});

posaoRuter.route('/obrisiPosao').post((req, res) => {
    new PossaoController().obrisiPosao(req, res);
});

posaoRuter.route('/dohvatiPosao').post((req, res) => {
    new PossaoController().dohvatiPosao(req, res);
});

posaoRuter.route('/dohvatiPoslove').get((req, res) => {
    new PossaoController().dohvatiPoslove(req, res);
});

export default posaoRuter;
