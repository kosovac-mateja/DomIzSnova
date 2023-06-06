import express from 'express';
import { RadnikController } from '../controllers/radnik.controller';

const radnikRuter = express.Router();

radnikRuter.route('/dohvatiRadnikeAgencije').post((req, res) => {
    new RadnikController().dohvatiRadnikeAgencije(req, res);
});

radnikRuter.route('/azurirajRadnika').post((req, res) => {
    new RadnikController().azurirajRadnika(req, res);
});

radnikRuter.route('/dodajRadnika').post((req, res) => {
    new RadnikController().dodajRadnika(req, res);
});

radnikRuter.route('/obrisiRadnika').post((req, res) => {
    new RadnikController().obrisiRadnika(req, res);
});

radnikRuter.route('/dohvatiDostupneRadnike').post((req, res) => {
    new RadnikController().dohvatiDostupneRadnike(req, res);
});

radnikRuter.route('/dohvatiRadnikeNaPoslu').post((req, res) => {
    new RadnikController().dohvatiRadnikeNaPoslu(req, res);
});

radnikRuter.route('/azurirajPosaoRadnika').post((req, res) => {
    new RadnikController().azurirajPosaoRadnika(req, res);
});

export default radnikRuter;
