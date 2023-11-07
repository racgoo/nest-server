
import generateDynamoClient from '../database/generateDynamoClient';
import generatePool from '../database/generatePool';
import generateRedisClient from '../redis/generateRedisClient';
const initGlobalVariables = () => {
    global.pubClient = generateRedisClient(); 
    global.subClient = generateRedisClient();
    global.pool = generatePool();
    global.redisClient = generateRedisClient();
    global.geoRedis  =  require('georedis').initialize(generateRedisClient());
    global.dynamoClient = generateDynamoClient();
}
export default initGlobalVariables;