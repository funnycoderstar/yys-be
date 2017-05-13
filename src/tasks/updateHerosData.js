const fetchHeroData = require('../../crawler/fetchHeroData');
const fetchHeroUrl = require('../../crawler/fetchHeroUrl');
const Hero = require('../models/hero');
const imageDownloader = require('../utils/imageDownloader');
const path = require('path');
// const fs = require('fs');

module.exports = async function () {
    // 式神数据
    const herosUrl = await fetchHeroUrl();
    for (const url of herosUrl) {
        const heroData = await fetchHeroData(url);
        await imageDownloader(
            /^http/.test(heroData.heroImg) ? heroData.heroImg : 'http:' + heroData.heroImg,
            path.resolve(__dirname, `../../public/${heroData.name}.jpg`)
        );
        const hero = {
            name: heroData.name,
            cv: heroData.cv,
            rarity: heroData.rarity,
            type: heroData.type,
            pkExponent: heroData.pkExponent,
            brushMapExponent: heroData.brushMapExponent,
            awaken: heroData.awaken,
            skills: heroData.skills,
            heroMatchInfo: heroData.heroMatchInfo,
            heroYuxun: heroData.heroYuxun,
            heroRemark: heroData.heroRemark,
        };
        const conditions = { name: heroData.name };
        const findResult = await Hero.findOne(conditions);
        if (findResult) {
            await Hero.update(conditions, hero);
        } else {
            await Hero.create(hero);
        }
    }
};