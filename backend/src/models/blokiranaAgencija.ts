import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let BlokiranaAgencija = new Schema({
    korisnickoIme: {
        type: String,
    },
    datumOdblokiranja: {
        type: Date,
    },
    brojPozitivnihOcena: {
        type: Number,
    },
});

export default mongoose.model(
    'BlokiranaAgencijaModel',
    BlokiranaAgencija,
    'blokiraneAgencije'
);
