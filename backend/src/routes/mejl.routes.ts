import express from 'express';
import { MejlController } from '../controllers/mejl.controller';

const mejlRuter = express.Router();

mejlRuter.route('/posaljiMejl').post((req, res) => {
  new MejlController().posaljiMejl(req, res);
});

export default mejlRuter;
