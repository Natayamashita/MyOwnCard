const mongoose = require('./index.js');

const CardSchema = new mongoose.Schema({
    title: {
        type: "String",
        required: true
    },
    description: {
        type: "String",
        required: true
    },
    images: {
        type: "Array",
        required: false
    },
    features: {
        type: 'Array',
        required: false
    }
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;