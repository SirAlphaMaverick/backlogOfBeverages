const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const backlogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    beverage: {
        type: String,
        required: true,
        trim: true
    },

    type: {
        type: String,
        required: true
    }

});

const Backlog = mongoose.model('Backlog', backlogSchema);
module.exports = Backlog;