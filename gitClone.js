// 启动进程进行拉取代码
const { exec } = require('child_process');
const update = require('./addURL');
const {emptyDir,rmEmptyDir} = require('./tool/delete_file');
// const  = require('./tool/delete_file').rmEmptyDir;
const fs = require('fs');

function gitClone(url,name){
  let rootFile = `${__dirname}/public/solution/${name}/`;
  fs.exists(rootFile, function(exists) {
    if(!exists){
      startExecClone(url,name);
    }
    if(exists){
      emptyDir(rootFile);
      rmEmptyDir(rootFile);
      restartClone(url,name);
    }
  });


}
function startExecClone(url,name){
  exec(`git clone ${url} ${__dirname}/public/solution/${name}/`, (error, stdout, stderr) => {
    if(error){
        console.error('CLONE_ERROR',error);
    }
    if(stdout === '' && error===null){
        console.log('成功',stdout);
        update(name);
    }
    });
 }
function restartClone(url,name){
  exec(`git clone ${url} ${__dirname}/public/solution/${name}/`, (error, stdout, stderr) => {
    if(error){
        console.error('CLONE_ERROR',error);
    }
    if(stdout === '' && error===null){
      // 更新
      // update(name);
    }
    });
 }
// 测试
module.exports = gitClone;

