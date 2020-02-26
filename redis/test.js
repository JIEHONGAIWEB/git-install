const RedisServer = require('redis-server');

// Simply pass the port that you want a Redis server to listen on.
const server = new RedisServer({
    port: 6379,
//     bin: 'D:/Users/jiehong.wang/Downloads/Redis-x64-3.0.504/redis-server'
});
server.open((err) => {
    console.log(111);
}).then(() => {
    // You may now connect a client to the Redis server bound to `server.port`.
    console.log(123);
  });;