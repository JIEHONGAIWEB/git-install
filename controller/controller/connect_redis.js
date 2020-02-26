const redis = require('redis');
// 连接对象
const redisClient = redis.createClient(6379, '127.0.0.1');
function test() {
           return   new Promise((resolve, reject) => {
                            redisClient.on('connect', function () {
              
                                          // 基于用户id进行信息
              
                                          // set 语法
                                          redisClient.set('name', 'TestName', function (err, data) {
                                                        console.log(data)
                                          })
                                          // get 语法
                                          redisClient.get('name', function (err, data) {
                                                        resolve(data);
                                                        return data;
                                          })
              
                                          //     client.lpush('class',1,function (err,data) {
                                          //         console.log(data)
                                          //     })
              
                                          //     client.lrange('class',0,-1,function (err,data) {
                                          //         console.log(data)
                                          //     })
                            });
              });

}


test().then((data) => {
              console.log(78, data);
})