// const redis = require('redis');
// const Redis = require("ioredis");
import Redis, { Cluster } from "ioredis";

const generateRedisClient = (): Redis => {
    const clusterNodes = JSON.parse(process.env.REDIS_PORTS).map((port: number)=>({ 
      host: process.env.REDIS_HOST,
      port: port,
      password: process.env.REDIS_PASSWORD,
      requirepass: process.env.REDIS_PASSWORD
    }));
    console.log(clusterNodes)
    
    const redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: 7001,
      password: process.env.REDIS_PASSWORD,
    });
    // const redisClient = new Redis.Cluster(clusterNodes,{
    //   redisOptions: {
    //     lazyConnect: false,
    //     connectTimeout: 1000000,
    //     // disconnectTimeout: 10000,
    //   },
    //   clusterRetryStrategy: function (times) {
    //     const delay = Math.min(100 + times * 2, 2000);
    //     return 200000;
    //   }
    // });

    // const redisClient = Redis.createClient({ legacyMode: true });
    // redisClient.addListener("connect",(test)=>{
    //   console.log(test)
    //   console.log("connet");
    // })
    redisClient.on("*",(res)=>{
      console.log(res)
    })
    redisClient.on('connect', (stream) => {
      console.info('[Redis] CONNECTED');
    })

      setTimeout(()=>{
        redisClient.get("test222",(d)=>{console.log("hi",d)})
      },2000);

    redisClient.on('disconnect', () => {
      console.info('[Redis] DISCONNECTED');
    });

    redisClient.on('error', (err) => {
      console.info('[Redis] ERROR',err);
    });

    // redisClient.connect().then()
    return redisClient;
}
export default generateRedisClient;