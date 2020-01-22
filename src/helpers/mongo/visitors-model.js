const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
    pageId: String,
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

VisitorSchema.index({ pageId: 1 });
VisitorSchema.index({ userId: 1 });
VisitorSchema.index({ browser: 1 });
VisitorSchema.index({ country: 1 });

const VisitorModel = mongoose.model("visitors", VisitorSchema);

module.exports = {
    VisitorModel,
}
