const config = require('./public/config/config.json');
function update(dirname){
const app = require('./app');
  
  app.use(require('koa-static')(__dirname + `/public/solution/${dirname}/dist`))
  
  let addressUrl = __dirname + `/public/solution/${dirname}/dist`;
  let configFile = __dirname + `/public/config/config.json`;
  var fs = require('fs')

  fs.readFile(configFile,'utf-8', function (error, data) {
    if (error) {
      console.log('读取文件失败了')
    } else {
    let configData = JSON.parse(data);
    let tempInfo = {
      "name":dirname,
      "addressUrl":`http://127.0.0.1:6161/solution/${dirname}/dist`
    }
    configData.list.push(tempInfo);
    let newData = JSON.stringify(configData);
      console.log(123,configData);
      fs.writeFile(configFile,newData, function (error) {
        if (error) {
          console.log('写入失败')
        } else {
          console.log('写入成功了')
        }
      })
    }
  });

  
}

module.exports = update;