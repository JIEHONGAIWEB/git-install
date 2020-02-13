function update(dirname){
const app = require('./app');

  app.use(require('koa-static')(__dirname + `/public/solution/${dirname}/dist`))

}

module.exports = update;