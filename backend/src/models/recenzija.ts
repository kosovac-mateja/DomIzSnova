import express from 'express';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const schema = new mongoose.Schema();

const recenzijaSchema = new mongoose.Schema({
    _id: {
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

export default mongoose.model('RecenzijaModel', recenzijaSchema, 'recenzije');
