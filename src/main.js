const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');
mongoose.Promise = Promise;

const updateHerosTask = require('./tasks/updateHerosData');
updateHerosTask();
