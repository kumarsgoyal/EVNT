const mongoose = require('./db');
const Schema = mongoose.Schema;


var Events = Schema({
    email: {
        type: String,
        required: true
    },
    events: {
        type: [{
                name: {
                    type: String,
                    required: true
                },
                desc: {
                    type: String,
                    required: false
                },
                owner: {
                    type: String,
                    required: false
                },
                date: {
                    type: String,
                    required: false
                },
                time: {
                    type: String,
                    required: false
                },
                duration: {
                    type: String,
                    required: false
                },
                venue: {
                    type: String,
                    required: false
                },
        }],
        required: true
    }
});

module.exports = EvntModel = mongoose.model("evnts", Events)


