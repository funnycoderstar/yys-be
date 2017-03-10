const koa = require('koa');
const logger = require('koa-logger');
const json = require('koa-json');
const hero = require('./routers/hero');
const serve  = require('koa-static');
const path = require('path');

const app = new koa();
app.use(logger());
app.use(json());
app.use(serve(path.resolve(__dirname, '../public/')));

app.use(hero.routes());
app.use(hero.allowedMethods());

app.use(async (ctx) => {
    ctx.body = 'hello';
});

module.exports = app;