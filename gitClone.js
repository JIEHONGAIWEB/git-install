// 启动进程进行拉取代码
const { exec } = require('child_process');
const update = require('./addURL');
const fs = require('fs');
// 参数克隆的地址
function gitClone(url,name){
  // 文件名称如果一致如何处理
  // 同一个项目不断的下载？
  // 检测如果是同一个solution_name，先删除再下载
  fs.exists(`${__dirname}/public/solution/${name}/`, function(exists) {
    console.log(333,exists);
    console.log(exists ? "存在" : "不存在");
    if(!exists){
      startClone(url,name);
    }

    if(exists){
      console.log('旧的solution项目的更新');

      //===========
      // 所有的文件为null
      var emptyDir = function(fileUrl){   

        var files = fs.readdirSync(fileUrl);//读取该文件夹
  
          files.forEach(function(file){
  
          var stats = fs.statSync(fileUrl+'/'+file);
  
         if(stats.isDirectory()){
  
         emptyDir(fileUrl+'/'+file);
  
         }else{
  
       fs.unlinkSync(fileUrl+'/'+file); 
  
     console.log("删除文件"+fileUrl+'/'+file+"成功");
  
            }        
  
      });   
  
   }
  
    //删除所有的空文件夹
      var rmEmptyDir = function(fileUrl){
          var files = fs.readdirSync(fileUrl);
          if(files.length>0){
              var tempFile = 0;
              files.forEach(function(fileName)
              {
                  tempFile++;
                  rmEmptyDir(fileUrl+'/'+fileName);
              });
              if(tempFile==files.length){//删除母文件夹下的所有字空文件夹后，将母文件夹也删除
                  fs.rmdirSync(fileUrl);
                  console.log('删除空文件夹'+fileUrl+'成功');
                  // 重新clone
                  // restartClone(url,name);
              }
          }else{
              fs.rmdirSync(fileUrl);
              console.log('删除空文件夹'+fileUrl+'成功');
          }
      }

      let rootFile = `${__dirname}/public/solution/${name}/`;

      emptyDir(rootFile);
      rmEmptyDir(rootFile);

      console.log('最最后');

      restartClone(url,name);
    }
  });


}
 function startClone(url,name){
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
 function restartClone(url,name){
  exec(`git clone ${url} ${__dirname}/public/solution/${name}/`, (error, stdout, stderr) => {
    if(error){
        console.error('CLONE_ERROR',error);
        // 进行错误处理
    }
    if(stdout === '' && error===null){
      // 确保没有错误的时候才能写入文件
        console.log('重新clone成功',stdout);
        // update(name);
    }
    });
 }
// 测试
module.exports = gitClone;

