// const redis = require('redis');
// const Redis = require("ioredis");
import Redis, { Cluster } from "ioredis";
const generateRedisClient = (): Cluster => {
    const clusterNodes = [
        { host: '127.0.0.1', port: 7001, password: "a713s228" },
        { host: '127.0.0.1', port: 7002, password: "a713s228" },
        { host: '127.0.0.1', port: 7003, password: "a713s228" },
        // Add other nodes here...
      ];
      
      const redisOptions = {
        cluster: {
          // nodes: clusterNodes,
          nodes: clusterNodes,
          // scaleReads: 'slave',
          slotsRefreshTimeout: 10000,
          scaleReads: "all",
          // scaleReads: 'slave', // Optional, specify how to distribute read operations (master, slave, all)
        },
     };
    const redisClient = new Redis.Cluster(redisOptions.cluster.nodes);
    // const redisClient = Redis.createClient({ legacyMode: true });
    redisClient.on('connect', () => {
        console.info('[Redis] CONNECTED');
    });
    redisClient.on('error', (err) => {
        console.info('[Redis] DISCONNECTED');
    });

    // redisClient.connect().then()
    return redisClient;
}
export default generateRedisClient;