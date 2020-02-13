// 1 启动下载 - 下载状态
// 2 启动安装 - 安装状态
// 3 启动配置 - 配置状态
const gitClone = require('./../public/solution/gitClone');
const config = require('./modules/config');
function start(){
    // 1 gitClone 完成
    let url = 'git@github.com:JIEHONGAIWEB/test-clone.git';
    gitClone(url);

    // 2 进行安装

    // 3 进行配置

}

module.exports = start;

