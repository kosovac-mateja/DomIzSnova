import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Objekat = new Schema({
    _id: {
        type: ObjectId,
    },
    vlasnik: {
        type: String,
    },
    tip: {
        type: String,
    },
    adresa: {
        type: String,
    },
    brProstorija: {
        type: Number,
    },
    kvadratura: {
        type: Number,
    },
    idSkica: {
        type: ObjectId,
    },
});

export default mongoose.model('ObjekatModel', Objekat, 'objekti');
