const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const corsMiddleware = require('restify-cors-middleware');

const server = restify.createServer();

//Middleware
server.use(restify.plugins.bodyParser());

//CORS
const cors = corsMiddleware({  
    origins: ["*"],
    allowHeaders: ["Authorization"],
    exposeHeaders: ["Authorization"]
});
server.pre(cors.preflight);  
server.use(cors.actual);

//Start
server.listen(config.PORT, () => {
    mongoose.connect(
        config.MONGODB_URI,
        { 
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    );
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
    require('./routes/contact')(server);
    require('./routes/chrzest')(server);
    console.log(`Server started on port ${config.PORT}`);
})