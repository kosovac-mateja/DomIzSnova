import express from 'express';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Radnik = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    ime: {
        type: String,
    },
    prezime: {
        type: String,
    },
    mejl: {
        type: String,
    },
    telefon: {
        type: String,
    },
    specijalizacija: {
        type: String,
    },
    agencija: {
        type: String,
    },
    idPosao: {
        type: ObjectId,
    },
});

export default mongoose.model('RadnikModel', Radnik, 'radnici');
