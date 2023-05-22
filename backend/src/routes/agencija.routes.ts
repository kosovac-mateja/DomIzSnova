import express from 'express';
import { AgencijaController } from '../controllers/agencija.controller';

const agencijaRouter = express.Router();

agencijaRouter
    .route('/registracija')
    .post((req, res) => new AgencijaController().registracija(req, res));

export default agencijaRouter;
