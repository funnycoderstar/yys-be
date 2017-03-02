const Crawler = require('crawler');
const c = new Crawler({
    maxConnections: 10,
    callback: function (error, res, done) {
        if (error) {
            return;
        } else {
            const $ = res.$;

            const $tables = $('table a');
            // console.log($tables[0].attribs.href);
            const tablesContent = [];
            for (let i = 0; i < $tables.length; i++) {
                const tableText = $tables[i].attribs.href;
                tablesContent.push(tableText.split('\n').filter(text => text));
            }
            console.log(tablesContent);

        }
        done();
    }
});
c.queue('http://www.18183.com/yys/201609/699803.html');