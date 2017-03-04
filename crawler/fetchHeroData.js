const Crawler = require('crawler');

function getHeroAttribute(texts) {
    if (!texts) {
        // console.log(texts);
        return;
    }
    return {
        name: texts[1],
        cv: texts[3],
        rarity: texts[5],
        type: texts[7],
        pkExponent: texts[9].length,
        brushMapExponent: texts[11].length,
    };
}
function getHeroAwaken(texts) {
    if (!texts) {
        // console.log(texts);
        return;
    }
    return {
        attack: getSkillUp(texts[5]),
        life: getSkillUp(texts[6]),
        defense: getSkillUp(texts[7]),
        speed: getSkillUp(texts[8]),
        crit: getSkillUp(texts[9]),
        material: getMaterial(texts),
        skil: texts[texts.length - 1],
    };
}
function getSkillUp(skill) {
    return {
        from: skill.substr(0, 1),
        to: skill.substr(2, 1),
    };
}
function getMaterial(material) {
    const materialList = [];
    let data = {};
    for (let i = 0; i < 4; i++) {
        data.name = material[i + 16],
            data.count = material[i + 20],
            materialList.push(data);
        data = {};
    }
    return materialList;
}
function getHeroSkil(texts) {
    if (!texts) {
        // console.log(texts);
        return;
    }
    return {
        name: texts[0],
        Consumption: parseInt(texts[2]),
        effect: texts[4],
        upgrade: [
            texts[6],
            texts[7],
            texts[8],
            texts[9],
        ].filter(up => up),
    };
}

module.exports = function (url) {
    return new Promise((resolve, reject) => {
        const c = new Crawler({
            maxConnections: 10,
            callback: function (error, res, done) {
                if (error) {
                    reject(error);
                    return;
                } else {
                    const $ = res.$;

                    const $tables = $('table');
                    const tablesContent = [];
                    for (let i = 0; i < $tables.length; i++) {
                        const tableText = $($tables[i]).text();
                        tablesContent.push(tableText.split('\n').filter(text => text));
                    }


                    const heroInfo = getHeroAttribute(tablesContent[0]);
                    heroInfo.awaken = getHeroAwaken(tablesContent[1]);
                    heroInfo.heroImg = $('table img')[0].attribs.src;
                    heroInfo.skills = [
                        getHeroSkil(tablesContent[2]),
                        getHeroSkil(tablesContent[3]),
                        getHeroSkil(tablesContent[4]),
                    ];
                    resolve(heroInfo);
                }
                done();
            }
        });
        c.queue(url);
    });
};
