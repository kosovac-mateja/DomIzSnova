import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Klijent = new Schema({
    korisnickoIme: {
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
    ime: {
        type: String,
    },
    prezime: {
        type: String,
    },
});

export default mongoose.model('KlijentModel', Klijent, 'klijenti');
