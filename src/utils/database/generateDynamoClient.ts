import * as AWS from "aws-sdk";
require("dotenv").config();
const generateDynamoClient = (): AWS.DynamoDB.DocumentClient => {
    AWS.config.update(
        {
            region: 'ap-northeast-2',
            accessKeyId: process.env.AWS_DATABASE_USER_ACCESS_KEY,
            secretAccessKey: process.env.AWS_DATABASE_USER_SECRET_KEY
        }
    );
    
    const dynamodbClient = new AWS.DynamoDB.DocumentClient();
    return dynamodbClient;
};
export default generateDynamoClient;