const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
    dateStart: {
        type: Date,
        default: Date.now()
    },
    expirationDateTime: {
        type: Date,
        default: Date.now() + process.env.SESSION_LIFETIME * 1000,
    },
    lastActivityDateTime: {
        type: Date,
        default: Date.now() + process.env.SESSION_LIFETIME * 1000,
    },
    userId: String,
    date: {
        type: Date,
        default: Date.now()
    },
    browser: String,
    os: String,
    ip: String,
    country: String,
    city: String
});

UserSessionSchema.index({ dateStart: -1 });
UserSessionSchema.index({ expirationDateTime: -1});
UserSessionSchema.index({ userId: 1 });
UserSessionSchema.index({ browser: 1 });
UserSessionSchema.index({ country: 1 });
UserSessionSchema.index({ os: 1 });

const UserSessionModel = mongoose.model("sessions", UserSessionSchema);



module.exports = {
    UserSessionModel,
}
