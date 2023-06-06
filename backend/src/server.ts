import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import mejlRuter from './routes/mejl.routes';
import korisnikRouter from './routes/korisnik.routes';
import klijentRouter from './routes/klijent.routes';
import agencijaRouter from './routes/agencija.routes';
import adminRuter from './routes/admin.routes';
import objekatRuter from './routes/objekat.routes';
import skicaRuter from './routes/skica.routes';
import recenzijaRuter from './routes/recenzija.routes';
import posaoRuter from './routes/posao.routes';
import radnikRuter from './routes/radnik.routes';
import otkazivanjeRuter from './routes/otkazivanje.routes';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/DomIzSnovaDB');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connected');
});

const router = express.Router();
router.use('/mejl', mejlRuter);
router.use('/korisnik', korisnikRouter);
router.use('/klijent', klijentRouter);
router.use('/agencija', agencijaRouter);
router.use('/admin', adminRuter);
router.use('/objekat', objekatRuter);
router.use('/skica', skicaRuter);
router.use('/recenzije', recenzijaRuter);
router.use('/radnik', radnikRuter);
router.use('/posao', posaoRuter);
router.use('/otkazivanjePosla', otkazivanjeRuter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
