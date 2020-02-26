const redis = require('redis');
// 连接对象
const client = redis.createClient(6379, '127.0.0.1');
client.on('connect', function () {

    // 基于用户id进行信息
    let temp = {
        id: 111,
        name: 'oliva'
    };


    // set 语法
    client.set('keyValue', JSON.stringify(temp), function (err, data) {
        //    let dataObj = JSON.parse(data);
        console.log(data)
    })

    // get 语法
    client.get('keyValue', function (err, data) {
        let dataObj = JSON.parse(data);
        console.log(888,dataObj.name)
    })

    client.lpush('class', 1, function (err, data) {
        console.log(data)
    })

    client.lrange('class', 0, -1, function (err, data) {
        console.log(data)
    })
});