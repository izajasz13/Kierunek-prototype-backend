const errors = require('restify-errors');
const Contact = require('../models/Contact');


module.exports = server => {
    //Get contact
    server.get('/contact', async (req, res, next) => {
        try{
            const contact = await Contact.find({});
            res.send(contact);
            next();
        } catch(err){
            return next(new errors.InvalidContentError(err));
        }
    });

    //Post contact form
    server.post('/contact', async (req, res, next) => {
        //Check for JSON
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const { name, email, message } = req.body;
        const contact = new Contact({
            name,
            email,
            message
        });

        try{
            await contact.save();
            res.send(201);
            next();
        }catch(err){
            return next(new errors.InternalError(err.message));
        }
    });
};