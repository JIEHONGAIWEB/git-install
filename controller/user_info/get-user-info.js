// 存储用户信息
// 用户名，用户id
// 通过用户id 来创建
const redisClient = require('../controller/connect_redis');
const { LogFile } = require('../../util/log');
function GetUserInfo(userId) {
              try {

                            redisClient.on('connect', () => {
                                          // 将用户的信息进行存储
                                          // set 语法
                                          console.log('in...',userId);

                                          if (userId) {

                                                        // 存儲了用戶的信息
                                                        redisClient.get(userId, (err, userInfo) => {
                                                                      let userInfoObj = JSON.parse(userInfo);
                                                                      let result = JSON.parse(userInfoObj);

                                                                      console.log(666,result);
                                                                      return result;
                                                        })
                                          } else {
                                                        LogFile.error('user id error');
                                          }

                                          // 使用字符串的转换

                            });
              } catch (error) {

              }


}


module.exports = GetUserInfo;