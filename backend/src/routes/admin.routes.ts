import express from 'express';
import { AdminController } from '../controllers/admin.controller';

const adminRuter = express.Router();

adminRuter.get('/dohvatiSve', (req, res) =>
    new AdminController().dohvatiSve(req, res)
);

export default adminRuter;
