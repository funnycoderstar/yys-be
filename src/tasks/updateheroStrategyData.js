const fetchHeroStrategy = require('../../crawler/fetchHeroStrategy');
const HeroStrategy = require('../models/heroStrategy');

module.exports = async function () {
    // 式神攻略数据
    const heroStrategyData = await fetchHeroStrategy();
    // console.log(heroStrategyData);
    for (const item of heroStrategyData) {
        const heroStrategy = {
            href: item.href,
            imgSrc: item.imgSrc,
            title: item.title,
            desc: item.desc,
        };
        const conditions = { href: item.href };
        const findResult = await HeroStrategy.findOne(conditions);
        if (findResult) {
            await HeroStrategy.update(conditions, heroStrategy);
        } else {
            await HeroStrategy.create(heroStrategy);
        }
    }
};