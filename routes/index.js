const router = require('koa-router')();
const start = require('./../gitClone');

router.get('/', async (ctx, next) => {
  ctx.body = 'hello koa2';
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})
// 1 通知我需要进行下载文件
// 2 参数文件名称
router.post('/download', async (ctx, next) => {
  let body = parseQueryStr(ctx.querystring);
  if(body.name && body.gitUrl){
    start(body.gitUrl, body.name);
    ctx.body = 'download...'
  }else{
    ctx.body = 'error query...'
  }
  // let URL= 'https://git.openearth.community/jing.zhang/fieldsurvelliance.git';
  
})


/*POST字符串解析JSON对象*/
function parseQueryStr(queryStr) {
  let queryData = {};
  let queryStrList = queryStr.split('&');
  console.log(queryStrList);
  // 利用了ES6提供的forOf，可以找找相关的看看
  for (let [index, queryStr] of queryStrList.entries()) {
    // 进行切割
    let itemList = queryStr.split('=');
    console.log(itemList);
    queryData[itemList[0]] = decodeURIComponent(itemList[1]);
  }
  return queryData
}
module.exports = router
