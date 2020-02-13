const fs = require('fs');
const emptyDir = function(fileUrl){   

              let files = fs.readdirSync(fileUrl);
        
                files.forEach(function(file){
        
                let stats = fs.statSync(fileUrl+'/'+file);
        
               if(stats.isDirectory()){
        
               emptyDir(fileUrl+'/'+file);
        
               }else{
        
             fs.unlinkSync(fileUrl+'/'+file); 
        
        
                  }        
        
            });   
        
         }
        
const rmEmptyDir = function(fileUrl){
                let files = fs.readdirSync(fileUrl);
                if(files.length>0){
                    let tempFile = 0;
                    files.forEach(function(fileName)
                    {
                        tempFile++;
                        rmEmptyDir(fileUrl+'/'+fileName);
                    });
                    if(tempFile==files.length){//删除母文件夹下的所有字空文件夹后，将母文件夹也删除
                        fs.rmdirSync(fileUrl);
                    }
                }else{
                    fs.rmdirSync(fileUrl);
                }
            }

module.exports = {rmEmptyDir,emptyDir};