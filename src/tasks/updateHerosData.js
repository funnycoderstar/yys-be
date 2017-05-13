const fetchHeroData = require('../../crawler/fetchHeroData');
const fetchHeroUrl = require('../../crawler/fetchHeroUrl');
const fetchHeroStrategy = require('../../crawler/fetchHeroStrategy');
const fetchHeroVideo = require('../../crawler/fetchHeroVideo');
const Hero = require('../models/hero');
const HeroStrategy = require('../models/heroStrategy');
const HeroVideo = require('../models/heroVideo');
const imageDownloader = require('../utils/imageDownloader');
const path = require('path');
// const fs = require('fs');

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
        console.log(findResult);
        if (findResult) {
            console.log('更新式神视频数据');
            await HeroVideo.update(conditions, heroVideo);
        } else {
            console.log('添加式神视频数据');
            await HeroVideo.create(heroVideo);
        }
    }
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