import Expo from 'expo-server-sdk';
interface sendPushMessageProps {
    expo_push_token: string;
    title: string;
    description?: string; 
    data?: any;
}
const sendPushMessage = async({
    expo_push_token,
    title,
    description = "",
    data = {}
}) => {
    let expo = new Expo();
    let messages = [];
    messages.push({
      to: expo_push_token,
      sound: 'default',
      body: title,
      // data: { pathname: "MainTabs", tabPathname: "Calendar" },
      data: {  },
    })
    let chunks = expo.chunkPushNotifications(messages);
    chunks.some(async(chunk) => {
      await expo.sendPushNotificationsAsync(chunk);
    })
}
export default sendPushMessage;