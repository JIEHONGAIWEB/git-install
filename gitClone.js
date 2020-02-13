// 
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const update = require('./addURL');

// 参数克隆的地址

function gitClone(url,name){
 // 1.开始下载文件
   //  console.log("下载地址",url);
 // 2.装载文件资源 origin_source/ 文件下

//  当前文件夹下
// let dir = __dirname;

// console.log(21,__dirname);
// console.log(21,__filename);
// console.log(21,process.cwd());

// let tempUrl = path.resolve('./../../')+'/origin_source'

// let name = 'tt2';
exec(`git clone ${url} ${__dirname}/public/solution/${name}/`, (error, stdout, stderr) => {
if(error){
    console.log('出现错误');
}
if(stdout === ''){
    console.log('成功',stdout);
    update(name);

}
});
}

// 测试

module.exports = gitClone;

