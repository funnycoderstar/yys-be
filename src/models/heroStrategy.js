const mongoose = require('mongoose');

const heroStrategySchema = new mongoose.Schema({
    href: { type: String },
    imgSrc: { type: String },
    title: { type: String },
    desc: { type: Array },
});

module.exports = mongoose.model('heroStrategy', heroStrategySchema);
