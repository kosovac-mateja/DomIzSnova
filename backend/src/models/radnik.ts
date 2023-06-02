import express from 'express';
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
    zauzet: {
        type: Boolean,
    },
});

export default mongoose.model('RadnikModel', Radnik, 'radnici');
