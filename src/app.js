const koa = require('koa');
const logger = require('koa-logger');
const json = require('koa-json');

const app = new koa();
app.use(logger());
app.use(json());

app.use(async (ctx) => {
    ctx.body = 'hello';
});

module.exports = app;