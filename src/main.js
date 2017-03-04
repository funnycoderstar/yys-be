const app = require('./app');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');
mongoose.Promise = Promise;

app.listen(6600, () => {
    console.log('server is run');
});
