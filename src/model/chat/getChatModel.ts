interface getChatModelProps {
    chat_room_id: number,
    limit: number
}

interface getChatModelType {
    Items: chatType[]
    Count: number
    ScannedCount: number
  }
  
  export interface chatType {
    displayTn: string
    user_id: number
    register_date: number
    chat_room_id: number
    message: string
    chat_id: string
    update_date: number
  }
  
const getChatModel = async ({chat_room_id=0, limit=30}: getChatModelProps) => {
    let result = await dynamoClient.query({
        TableName: "chat",
        IndexName: "register_date-index",
        KeyConditionExpression: "chat_room_id = :chat_room_id",
        ExpressionAttributeValues: {
            ":chat_room_id": chat_room_id
        },
        ScanIndexForward: false,
        Limit: limit
    }).promise();
    return result;
}
export default getChatModel;