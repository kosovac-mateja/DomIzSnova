import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PrivremenaLozinka = new Schema({
    korisnickoIme: {
        type: String,
    },
    lozinka: {
        type: String,
    },
    vremeIsteka: {
        type: Date,
    },
});

export default mongoose.model(
    'PrivremenaLozinkaModel',
    PrivremenaLozinka,
    'privremeneLozinke'
);
