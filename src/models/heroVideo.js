const mongoose = require('mongoose');

const heroVideoSchema = new mongoose.Schema({
    href: { type: String },
    imgSrc: { type: String },
    title: { type: String },
    desc: { type: Array },
});

module.exports = mongoose.model('heroVideo', heroVideoSchema);