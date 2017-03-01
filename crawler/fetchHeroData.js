const Crawler = require('crawler');

const c = new Crawler({
    maxConnections: 10,
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;
            const $tables = $('table');
            const tablesContent = [];
            for (let i = 0; i < $tables.length; i++) {
                const tableText = $($tables[i]).text();
                tablesContent.push(tableText.split('\n').filter(text => text));
            }
            console.log(getHeroAttribute(tablesContent[0]));
            console.log(getHeroAwaken(tablesContent[1]));
            console.log(getHeroSkil(tablesContent[2]));

        }
        done();
    }
});

c.queue('http://www.18183.com/yys/201701/784802.html');


function getHeroAttribute(texts) {
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
    return {
        skil: {
            name: texts[0],
            Consumption: texts[2],
            effect: texts[4],
            upgrade: [
                texts[6],
                texts[7],
                texts[8],
                texts[9],
            ],
        }
    };
}
