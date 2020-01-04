const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

const ChrzestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: String,
        required: true,
        trim: true
    }
});

ChrzestSchema.plugin(timeStamp);

const Contact = mongoose.model('Chrzest', ChrzestSchema, 'Chrzest-form');
module.exports = Contact;