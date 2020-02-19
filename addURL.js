
const fs = require('fs')
const { LogFile } = require('./tool/log');

function update(dirname) {
  const app = require('./app');
  app.use(require('koa-static')(__dirname + `/public/solution/${dirname}/dist`))

  let solutionConfig = __dirname + `/public/solution/${dirname}/dist/assets/config.json`;
  let configFile = __dirname + `/public/config/config.json`;
  // 1.
  fs.readFile(solutionConfig, 'utf-8', (error, data) => {
    try {

      LogFile.info('get project config');
      let solutionConfigData = JSON.parse(data);
      let name = solutionConfigData['projectName'];
      let iconPath = `http://127.0.0.1:6161/solution/${dirname}/dist/` + solutionConfigData['iconPath'].split('./')[1];
      fs.readFile(configFile, 'utf-8', function (error, data) {
        try {
          LogFile.info('set list config');
          let configData = JSON.parse(data);
          let tempInfo = {
            "name": name,
            "addressUrl": `http://127.0.0.1:6161/solution/${dirname}/dist`,
            "iconPath": iconPath
          }
          configData.list.push(tempInfo);
          let newData = JSON.stringify(configData);
          fs.writeFile(configFile, newData, function (error) {
            if (error) {
              LogFile.error('write config url error', error);
            } else {
              LogFile.info('write config url success');
            }
          });
        } catch (error) {
          LogFile.error('read config file error');
        }
      });
    } catch (error) {

    }
  })


}

module.exports = update;