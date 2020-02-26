const { exec } = require('child_process');
const update = require('./addURL');
const { LogFile } = require('./util/log');
const { emptyDir, rmEmptyDir } = require('./util/delete_file');
const fs = require('fs');

function gitClone(url, name) {
  try {
    LogFile.info("function gitClone", 'new solution project clone');
    let rootFile = `${__dirname}/public/solution/${name}/`;
    fs.exists(rootFile, function (exists) {
      if (!exists) {
        startExecClone(url, name);
      }
      if (exists) {
        emptyDir(rootFile);
        rmEmptyDir(rootFile);
        restartClone(url, name);
      }
    });
  } catch (error) {
    LogFile.err('gitclone', error)
  }



}
function startExecClone(url, name) {
  try {
    LogFile.info("startExecClone", "start exec clone", 'url');
    let fileLocalAddress = `${__dirname}/public/solution/${name}/dist/index.html`;
    exec(`git clone ${url} ${__dirname}/public/solution/${name}/`, (error, stdout, stderr) => {
      if (error) {
        LogFile.error('CLONE_ERROR', error);
      }
      if (stdout === '' && error === null) {
        update(name);
        changeBaseUrl(fileLocalAddress, name);
      }
    });
  } catch (error) {
    LogFile.error("startExecClone", error);
  }
}
function restartClone(url, name) {
  try {
    LogFile.info('restartClone', 'name repeat restart clone');
    let fileLocalAddress = `${__dirname}/public/solution/${name}/dist/index.html`;
    exec(`git clone ${url} ${__dirname}/public/solution/${name}/`, (error, stdout, stderr) => {
      if (error) {
        LogFile.error('CLONE_ERROR', error);
      }
      if (stdout === '' && error === null) {
        changeBaseUrl(fileLocalAddress, name);
      }
    });
  } catch (error) {
    LogFile.error('restartClone', error);
  }

}
function changeBaseUrl(fileLocalAddress, name) {
  try {
    fs.readFile(fileLocalAddress, 'utf-8', function (error, data) {
      let part1_pre = data.split('<base href=');
      let part2_last = part1_pre[1].indexOf("/");
      let part1_last = part1_pre[1].substring(part2_last + 1);
      let content = part1_pre[0] + '<base href=' + `"/solution/${name}/dist/` + part1_last;
      fs.writeFile(fileLocalAddress, content, (err, data) => {

        LogFile.info('success write', data);
        if(err){
          LogFile.err(err);
        }
      })
    });
    
  } catch (error) {
    LogFile.error('chage base url',error);
  }
}

module.exports = gitClone;

