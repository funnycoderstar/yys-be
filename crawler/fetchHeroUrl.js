const Crawler = require('crawler');
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
                    const $tables = $('tbody #pic').parent('a');
                    const tablesContent = [];
                    for (let i = 0; i < $tables.length; i++) {
                        const tableText = $tables[i].attribs.href;
                        tablesContent.push(tableText.split('\n').filter(text => {
                            if(/http:\/\/www.18183.com\/yys\/20/.test(text)){
                                return text;
                            }
                        }));
                    }
                    resolve(tablesContent);
                }
                done();
            }
        });
        c.queue('http://www.18183.com/yys/201609/699803.html');
    });
};