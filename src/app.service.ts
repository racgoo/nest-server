import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import Expo from 'expo-server-sdk';

@Injectable()
export class AppService {

  getHello(req: Request): string {
    return 'Hello World!';
  }

  postHello(req: Request): string {
    return 'Hello World!';
  }

  async pushTest(req: Request): Promise<string> {
    let expo = new Expo();
    let messages = [];
    messages.push({
      to: "ExponentPushToken[DzowTSEosxVORXB3cgWTRN]",
      sound: 'default',
      body: 'hihi\naa',
      // data: { pathname: "MainTabs", tabPathname: "Calendar" },
      data: {  },
    })
    let chunks = expo.chunkPushNotifications(messages);
    chunks.some(async(chunk) => {
      await expo.sendPushNotificationsAsync(chunk);
    })
    return "hi"
  }
  
}
