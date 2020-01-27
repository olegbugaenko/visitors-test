const express = require('express');
const useragent = require('express-useragent');
const dotenv = require('dotenv').config();
require('module-alias/register');
const routes = require('@routes');
const middleware = require("@middleware");
const { Mongo } = require('@helpers/mongo');

const app = express();
app.use(express.json());
app.use(useragent.express());

app.set('trust proxy', true);



const mongo = new Mongo(app);

routes(app);
middleware(app);

app.on('db_ready', ()=>{
    app.listen(process.env.PORT || 80);
})

