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
    telefon: {
        type: String,
    },
    mejl: {
        type: String,
    },
    slika: {
        type: String,
    },
});

export default mongoose.model('KorisnikModel', Korisnik, 'korisnici');
