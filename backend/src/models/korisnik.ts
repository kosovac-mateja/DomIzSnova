import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    korisnickoIme: {
        type: String,
    },
    lozinka: {
        type: String,
    },
    tip: {
        type: String,
    },
    status: {
        type: String,
    },
});

export default mongoose.model('KorisnikModel', Korisnik, 'korisnici');
