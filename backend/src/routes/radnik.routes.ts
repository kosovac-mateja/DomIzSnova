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

export default radnikRuter;
