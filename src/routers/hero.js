const Router = require('koa-router');
require('koa-cors');
const router = new Router();
const Hero = require('../models/hero');
router
    .get('/heros', async (ctx) => {
        ctx.body = await Hero.find().sort({ 'rarity': -1 });
        ctx.status = 200;
    })
    .get('/hero/:name', async (ctx) => {
        const heroResult = await Hero.find({ name: new RegExp(ctx.params.name, 'g') });
        if (heroResult) {
            ctx.body = heroResult;
        } else {
            ctx.body = {
                msg: '未查找到该式神'
            };
        }
    });

module.exports = router;