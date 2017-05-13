const fetchHeroData = require('../../crawler/fetchHeroData');
const fetchHeroUrl = require('../../crawler/fetchHeroUrl');
const Hero = require('../models/hero');
const imageDownloader = require('../utils/imageDownloader');
const path = require('path');
// const fs = require('fs');

module.exports = async function () {
    const herosUrl = await fetchHeroUrl();
    for (const url of herosUrl) {
        const heroData = await fetchHeroData(url);
        console.log(heroData);

        // const stat = fs.statSync(path.join(__dirname, 'public'));
        // if (!stat.isDirectory()) {
        //     const publicPath = path.resolve(__dirname, '../../public');
        //     fs.mkdir(publicPath, function (err) {
        //         if (err) {
        //             console.error(err);
        //         }
        //     });
        // }

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