import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let OtkazivanjePosla = new Schema({
    idPosao: {
        type: ObjectId,
    },
    razlog: {
        type: String,
    },
    status: {
        type: String,
    },
});

export default mongoose.model(
    'OtkazivanjePoslaModel',
    OtkazivanjePosla,
    'otkazivanjePosla'
);
