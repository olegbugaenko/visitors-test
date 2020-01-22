const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
    pageId: String,
    sessionId: mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        default: Date.now()
    },
    /*browser: String,
    os: String,
    ip: String,
    country: String,
    city: String*/
});

VisitorSchema.index({ pageId: 1 });
VisitorSchema.index({ userId: 1 });
VisitorSchema.index({ sessionId: 1 });

const VisitorModel = mongoose.model("visits", VisitorSchema);

module.exports = {
    VisitorModel,
}
