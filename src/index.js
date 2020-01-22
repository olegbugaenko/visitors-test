const express = require('express');
const useragent = require('express-useragent');
const dotenv = require('dotenv').config();
require('module-alias/register');
const routes = require('@routes');
const { Mongo } = require('@helpers/mongo');

const app = express();
app.use(express.json());
app.use(useragent.express());

app.set('trust proxy', true);

app.use( (req, res, next) => {
    if(req.method.toLowerCase() !== 'get')
        return next();

    console.log(req.headers);

    if(req.headers.authorization === `Bearer ${process.env.AUTH_TOKEN}`)
        return next();

    res.status(403).send({
        message: 'You are not allowed to access this page'
    })
});

const mongo = new Mongo(app);

routes(app);

app.on('db_ready', ()=>{
    app.listen(process.env.PORT || 80);
})

