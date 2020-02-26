// 存储用户信息
// 用户名，用户id
// 通过用户id 来创建
const redisClient = require('../controller/connect_redis');
const { LogFile } = require('../../util/log');


function StorageUserInfo(user) {
              try {
                            let userString = JSON.stringify(user);
                            redisClient.on('connect', () => {
                                          // 将用户的信息进行存储
                                          // set 语法
                                          if(user.id){
                                                        // 存儲了用戶的信息
                                                        redisClient.set(user.id, JSON.stringify(userString), function (err, data) {
                                                                      //    let dataObj = JSON.parse(data);
                                                                    return data;
                                                        })
                                          }else{
                                                        LogFile.error('user id error');
                                          }
                                         
                                          // 使用字符串的转换

                            });
              } catch (error) {

              }


}


module.exports = StorageUserInfo;