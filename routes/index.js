const router = require('koa-router')();
const start =  require('./../gitClone');
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})
// 1 通知我需要进行下载文件
// 2 参数文件名称
router.get('/download/solution_name*', async (ctx, next) => {
let name =ctx.request.url.split('/download/')[1];
  let URL= 'git@github.com:JIEHONGAIWEB/test-clone.git';
  start(URL,name);
ctx.body = 'download...'
})

module.exports = router
