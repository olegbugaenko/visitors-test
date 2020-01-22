const mongoose = require('mongoose');

class Mongo {

    constructor(app) {
        if(Mongo.instance)
            return Mongo.instance;
        mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {useNewUrlParser: true});
        this.db = mongoose.connection;
        Mongo.instance = this;
        this.db.once('open', ()=>{
            console.log('Successfully connected');
            app.emit('db_ready')
        });
        this.db.on('error', err => console.error(err));
    }

}

module.exports = {
    Mongo
}
