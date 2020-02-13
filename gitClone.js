// 启动进程进行拉取代码
const { exec } = require('child_process');
const update = require('./addURL');
// 参数克隆的地址
function gitClone(url,name){
exec(`git clone ${url} ${__dirname}/public/solution/${name}/`, (error, stdout, stderr) => {
if(error){
    console.error('CLONE_ERROR',error);
    // 进行错误处理
}
if(stdout === '' && error===null){
  // 确保没有错误的时候才能写入文件
    console.log('成功',stdout);
    update(name);
}
});
}

// 测试

module.exports = gitClone;

