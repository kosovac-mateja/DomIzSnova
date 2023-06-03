import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Agencija = new Schema({
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
    naziv: {
        type: String,
    },
    ulica: {
        type: String,
    },
    grad: {
        type: String,
    },
    drzava: {
        type: String,
    },
    maticniBroj: {
        type: String,
    },
    opis: {
        type: String,
    },
    kapacitetRadnika: {
        type: Number,
    },
    zahtev: {
        type: Number,
    },
});

export default mongoose.model('AgencijaModel', Agencija, 'agencije');
