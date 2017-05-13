const app = require('./app');
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const updateHerosData = require('../src/tasks/updateHerosData');
const updateHeroStrategyData = require('../src/tasks/updateheroStrategyData');
const updateHeroVideoData = require('../src/tasks/updateHeroVideoData');
mongoose.connect('mongodb://127.0.0.1:27017/test');
mongoose.Promise = Promise;

const rule = new schedule.RecurrenceRule();
rule.hour = [0, 6, 12, 18];
schedule.scheduleJob(rule, function () {
    updateHerosData();
    updateHeroStrategyData();
    updateHeroVideoData();
    const now = new Date();
    console.log(now.getFullYear() + '年' + now.getHours + '月' + now.getDate() + '日' + now.getHours + '时' + now.getMinutes + '分' + now.getSeconds + '秒' ,'获取完成');
});

app.listen(6600, () => {
    console.log('server is run');
});
