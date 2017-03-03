const fetchHeroData = require('../../crawler/fetchHeroData');
const fetchHeroUrl = require('../../crawler/fetchHeroUrl');
const Hero = require('../models/hero');

module.exports = async function () {
    const herosUrl = await fetchHeroUrl();
    for (const url of herosUrl) {
        const heroData = await fetchHeroData(url);
        const hero = {
            name: heroData.name,
            cv: heroData.cv,
            rarity: heroData.rarity,
            type: heroData.type,
            pkExponent: heroData.pkExponent,
            brushMapExponent: heroData.brushMapExponent,
            awaken: heroData.awaken,
            skills: heroData.skills,
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