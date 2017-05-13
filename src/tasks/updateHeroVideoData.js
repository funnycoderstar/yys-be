const fetchHeroVideo = require('../../crawler/fetchHeroVideo');
const HeroVideo = require('../models/heroVideo');

module.exports = async function () {
     // 式神视频数据
    const heroVideoData = await fetchHeroVideo();
    // console.log(heroStrategyData);
    for (const item of heroVideoData) {
        const heroVideo = {
            href: item.href,
            imgSrc: item.imgSrc,
            title: item.title,
            desc: item.desc,
        };
        const conditions = { href: item.href };
        const findResult = await HeroVideo.findOne(conditions);
        if (findResult) {
            // console.log('更新式神视频数据');
            await HeroVideo.update(conditions, heroVideo);
        } else {
            // console.log('添加式神视频数据');
            await HeroVideo.create(heroVideo);
        }
    }
};