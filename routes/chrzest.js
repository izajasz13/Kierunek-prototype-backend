const errors = require('restify-errors');
const Chrzest = require('../models/Chrzest');


module.exports = server => {
    server.get('/chrzest', async (req, res, next) => {
        try{
            const chrzest = await Chrzest.find({});
            res.send(chrzest);
            next();
        } catch(err){
            return next(new errors.InvalidContentError(err));
        }
    });

    server.post('/chrzest', async (req, res, next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const { name, surname, number } = req.body;
        const chrzest = new Chrzest({
            name,
            surname,
            number
        });

        try{
            await chrzest.save();
            res.send(201);
            next();
        }catch(err){
            return next(new errors.InternalError(err.message));
        }
    });
};