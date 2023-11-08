
import Redis, { Cluster } from "ioredis";
import * as AWS from "aws-sdk";
import { Pool } from "mysql2";
import generatePool from "src/actions/database/generatePool";
import generateRedisClient from "src/actions/redis/generateRedisClient";
import generateDynamoClient from "src/actions/database/generateDynamoClient";



declare global {
    var pubClient: Redis;
    var subClient: Redis;
    var pool: Pool;
    var redisClient: Redis;
    var geoRedis: any;
    var dynamoClient: AWS.DynamoDB.DocumentClient;
}


export { };
