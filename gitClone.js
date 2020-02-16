// 启动进程进行拉取代码
const { exec } = require('child_process');
const update = require('./addURL');
const { emptyDir, rmEmptyDir } = require('./tool/delete_file');
// const  = require('./tool/delete_file').rmEmptyDir;
const fs = require('fs');
const cheerio = require('cheerio');

function gitClone(url, name) {
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


}
function startExecClone(url, name) {
  let fileLocalAddress = `${__dirname}/public/solution/${name}/dist/index.html`;

  exec(`git clone ${url} ${__dirname}/public/solution/${name}/`, (error, stdout, stderr) => {
    if (error) {
      console.error('CLONE_ERROR', error);
    }
    if (stdout === '' && error === null) {
      console.log('成功', stdout);

      update(name);

      changeBaseUrl(fileLocalAddress,name);
    }
  });
}
function restartClone(url, name) {
  let fileLocalAddress = `${__dirname}/public/solution/${name}/dist/index.html`;
  exec(`git clone ${url} ${__dirname}/public/solution/${name}/`, (error, stdout, stderr) => {
    if (error) {
      console.error('CLONE_ERROR', error);
    }
    if (stdout === '' && error === null) {
      // 更新
      // update(name);
      changeBaseUrl(fileLocalAddress,name);
    }
  });
}
// 测试
// change base url

function changeBaseUrl(fileLocalAddress,name) {
  fs.readFile(fileLocalAddress, 'utf-8', function (error, data) {
let part1_pre = data.split('<base href=');
let part2_last =  part1_pre[1].indexOf("/");

let part1_last = part1_pre[1].substring(part2_last+1);



let content = part1_pre[0]+'<base href='+`"/solution/${name}/dist/`+part1_last;


    // console.log(999,test);

  //   // 通过 load 方法把 HTML 代码转换成一个 jQuery 对象
  //   let $ = cheerio.load(data);
  //   // 可以使用与 jQuery 一样的语法来操作

  //   console.log(2323, $('base').attr('href'));
  //   // $.sele('base.href').text('/test/');
  //   $('base').attr('href','/test/');
  //   console.log(2424, $('base').attr('href'));

  //  $.toString();
  //  console.log(222,$)



    // let newHtml = $.toString();
    fs.writeFile(fileLocalAddress,content,(err,data)=>{
      console.log(666,data);
    })


  });

}

module.exports = gitClone;

