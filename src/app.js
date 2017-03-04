const koa = require('koa');
const logger = require('koa-logger');
const json = require('koa-json');
const hero = require('./routers/hero');

const app = new koa();
app.use(logger());
app.use(json());

app.use(hero.routes());
app.use(hero.allowedMethods());

app.use(async (ctx) => {
    ctx.body = 'hello';
});

module.exports = app;