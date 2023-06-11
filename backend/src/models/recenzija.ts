import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Recenzija = new Schema({
    idPosao: {
        type: ObjectId,
    },
    klijent: {
        type: String,
    },
    agencija: {
        type: String,
    },
    ocena: {
        type: Number,
    },
    komentar: {
        type: String,
    },
});

export default mongoose.model('RecenzijaModel', Recenzija, 'recenzije');
