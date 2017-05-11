const Crawler = require('crawler');

function getHeroMatch(texts, text2) {
    if (!texts) {
        return;
    }
    return {
        heroMatchImg: text2,
        matchInfo: texts[0],
        matchRemark: texts[1],
    };
}
function getHeroYuxun(texts) {
    if (!texts) {
        return;
    }
    return {
        matchInfo: texts[2],
        matchRemark: texts[3],
        two: texts[5],
        four: texts[6],
        six: texts[7],
    };
}
function getHeroRemark(texts) {
    return {
        remark: texts[texts.length - 1]
    };
}
module.exports = function () {
    return new Promise((resolve, reject) => {
        const c = new Crawler({
            maxConnections: 10,
            callback: function (error, res, done) {
                if (error) {
                    reject(error);
                    return;
                } else {
                    const $ = res.$;

                    const $tables = $('center');
                    const HeroMatch = $($tables).nextAll('p').text().split('\n').filter(text => text);
                    const heroMatchImg = $('center img')[0].attribs.src;
                    const heroMatchInfo = getHeroMatch(HeroMatch, heroMatchImg);
                    const heroYuxun = getHeroYuxun(HeroMatch);
                    const heroRemark = getHeroRemark(HeroMatch);
                    const heroInfo1 = {
                        heroMatchInfo: heroMatchInfo,
                        heroYuxun: heroYuxun,
                        heroRemark: heroRemark,
                    };
                    console.log(heroInfo1);
                    resolve(heroInfo1);
                }
                done();
            }
        });
        c.queue('http://www.18183.com/yys/201610/716377.html');
    });
};
