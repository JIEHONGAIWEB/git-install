const router = require('koa-router')();
const start = require('./../gitClone');
const { LogFile } = require('../util/log');
const parseQueryStr = require('../util/parse_query_str');
const StorageUserInfo = require('./../controller/user_info/storage-user-info');
const GetUserInfo = require('./../controller/user_info/get-user-info');



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

});

// 将当前用户信息进行保存
router.post('/currentUser', async (ctx, next) => {
  try {
    let body = parseQueryStr(ctx.querystring);
    if (body.currentUser) {
      let result = StorageUserInfo(body.currentUser);
    } else {
      ctx.body = 'error user info...'
    }
  } catch (error) {
    LogFile.error(error);
  }
});

// 将当前用户信息进行保存
router.get('/currentUser', async (ctx, next) => {
  let body = parseQueryStr(ctx.querystring);
  if (body.userId) {
    //  let result =  GetUserInfo(body.userId);
  }
});
// 将当前用户信息进行保存
router.get('/test', async (ctx, next) => {
test(ctx)
});
let test = (ctx)=>{
  const redis = require('redis');
  const redisClient = redis.createClient(6379, '127.0.0.1');
  console.log(11,ctx);
  // ctx.body = 11;
 
} 
  // ctx.body =123;



module.exports = router
