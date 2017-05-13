const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1:27017/test', (err) => {
    if (err) {
        console.log('数据库连接失败,请连接数据库服务!');
        process.exit(0);
    }
});

const updateHerosData = require('../src/tasks/updateHerosData');
updateHerosData()
.then(() => {
    console.log('式神数据更新完成');
    process.exit(0);
});
const updateHeroStrategyData = require('../src/tasks/updateheroStrategyData');
updateHeroStrategyData()
.then(() => {
    console.log('式神攻略数据更新完成');
    process.exit(0);
});
const updateHeroVideoData = require('../src/tasks/updateHeroVideoData');
updateHeroVideoData()
.then(() => {
    console.log('式神视频数据更新完成');
    process.exit(0);
});