const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name: { type: String },
    cv: { type: String },
    rarity: { type: String },
    type: { type: String },
    pkExponent: { type: String },
    brushMapExponent: { type: String },
    awaken: { type: Object },
    skills: { type: Array },
});

module.exports = mongoose.model('heros', heroSchema);
