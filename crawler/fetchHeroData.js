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
