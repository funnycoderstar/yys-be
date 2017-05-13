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
                    // a链接的href
                    const $tables = $('.list-detail .clearfix');
                    const tablesContent = [];
                    for (let i = 0; i < $tables.length; i++) {
                        const tableText = $tables[i].attribs.href;
                        if (tableText !== undefined && /http:\/\/www.18183.com\/yys\/20/.test(tableText) ) {
                            tablesContent.push(tableText);
                        }
                    }
                    // console.log(tablesContent.length);
                    // 攻略标题
                    const $title = $('.list-detail .tit');
                    const tablesTitle = [];
                    for (let i = 0; i < $title.length; i++) {
                        const tableText = $($title[i]).text();
                        tablesTitle.push(tableText);
                    }
                    // console.log(tablesTitle.length);
                    // 攻略dec
                    const $dec = $('.list-detail .desc');
                    const tablesDec = [];
                    for (let i = 0; i < $dec.length; i++) {
                        const tableText = $($dec[i]).text();
                        tablesDec.push(tableText.split('\n').filter(text => text));
                    }
                    // console.log(tablesDec);
                    // 攻略图片
                    const $img = $('.ani-pic img');
                    const tablesImg = [];
                    for (let i = 0; i < $img.length; i++) {
                        const tableText = $img[i].attribs['data-original'];
                        tablesImg.push(tableText);
                    }
                    const video = [];
                    for (let i = 0; i < $img.length; i++) {
                        video.push(
                            {
                                href: tablesContent[i],
                                imgSrc: tablesImg[i],
                                title: tablesTitle[i],
                                desc: tablesDec[i],
                            }
                        );
                    }
                    // console.log(video);
                    resolve(video);
                }
                done();
            }
        });
        c.queue('http://www.18183.com/yys/shipin/');
    });
};
