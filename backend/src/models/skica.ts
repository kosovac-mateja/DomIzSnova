import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Skica = new Schema({
    _id: {
        type: ObjectId,
    },
    koordinate: {
        type: Array,
    },
    dimenzije: {
        type: Array,
    },
    boje: {
        type: Array,
    },
    koordinateVrata: {
        type: Array,
    },
});

export default mongoose.model('SkicaModel', Skica, 'skice');
