const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1:27017/test', (err) => {
    if (err) {
        console.log('数据库连接失败,请连接数据库服务!');
        process.exit(0);
    }
});

const updateHerosData = require('../src/tasks/updateHerosData');
const updateHeroStrategyData = require('../src/tasks/updateheroStrategyData');
const updateHeroVideoData = require('../src/tasks/updateHeroVideoData');

(async function updateData(params) {
    // await Promise.all([updateHerosData(), updateHeroStrategyData(), updateHeroVideoData()]);
    console.log('开始更新式神数据');
    await updateHerosData();
    console.log('式神数据更新完成');
    console.log('开始更新式神攻略数据');
    await updateHeroStrategyData();
    console.log('式神攻略数据更新完成');

    console.log('开始更新式神视频数据');
    await updateHeroVideoData();
    console.log('式神视频数据更新完成');
    process.exit(0);
})();