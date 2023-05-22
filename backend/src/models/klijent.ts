import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Klijent = new Schema({
    korisnickoIme: {
        type: String,
    },
    lozinka: {
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
    status: {
        type: String,
    },
    ime: {
        type: String,
    },
    prezime: {
        type: String,
    },
});

export default mongoose.model('KlijentModel', Klijent, 'klijenti');
