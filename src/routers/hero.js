const Router = require('koa-router');
const router = new Router();
const Hero = require('../models/hero');

router
    .get('/heros', async (ctx) => {
        ctx.body = await Hero.find();
        ctx.status = 200;
    })
    .get('/hero/:name', async (ctx) => {
        const heroResult = await Hero.findOne({ name: ctx.params.name });
        if (heroResult) {
            ctx.body = heroResult;
        } else {
            ctx.body = {
                msg: '未查找到该式神'
            };
        }
    });

module.exports = router;