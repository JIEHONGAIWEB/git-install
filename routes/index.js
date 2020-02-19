const router = require('koa-router')();
const start = require('./../gitClone');
const { LogFile } = require('./../tool/log');
const parseQueryStr = require('./../tool/parseQueryStr');


// 1 通知我需要进行下载文件
// 2 参数文件名称
router.post('/download', async (ctx, next) => {
  try {
    let body = parseQueryStr(ctx.querystring);
    if (body.name && body.gitUrl) {
      start(body.gitUrl, body.name);
      ctx.body = 'download...'
    } else {
      ctx.body = 'error query...'
    }
  } catch (error) {
    LogFile.error(error);
  }

  // let URL= 'https://git.openearth.community/jing.zhang/fieldsurvelliance.git';

})



module.exports = router
