const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})
// 1 通知我需要进行下载文件
// 2 
router.get('/download', async (ctx, next) => {
 // (1) 启动
})

module.exports = router
