const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    }
});

ContactSchema.plugin(timeStamp);

const Contact = mongoose.model('Contact', ContactSchema, 'Contact-form');
module.exports = Contact;