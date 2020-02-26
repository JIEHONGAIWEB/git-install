const redis = require('redis');
// 连接对象
const client = redis.createClient(6379, '127.0.0.1');
client.on('connect', function () {

    // 基于用户id进行信息

    // set 语法
    client.set('name', 'TestName', function (err, data) {
        console.log(data)
    })
    // get 语法
    client.get('name', function (err, data) {
        console.log(data)
    })

    client.lpush('class', 1, function (err, data) {
        console.log(data)
    })

    client.lrange('class', 0, -1, function (err, data) {
        console.log(data)
    })
});
        // You may now connect a client to the Redis
        // server bound to port 6379.
