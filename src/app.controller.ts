import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import TelegramBot from 'node-telegram-bot-api';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
    ) {
    const token = this.configService.get<string>('TOKEN');
    const bot = new TelegramBot(token, {polling: true});
    bot.on( "message", (msg) => {
      const chatId = msg.chat.id
      const reply = msg.text.toLowerCase() === "hello"
        ? `Hello, ${msg.from.first_name} ${msg.from.last_name} !`
        : msg.text.toLowerCase() === "bye"
        ? `Bye, ${msg.from.first_name} ${msg.from.last_name} !`
        : `<i>Let's talk...</i>`
      bot.sendMessage(chatId, reply, {
        parse_mode:"HTML"
      })
    })
  } 
}
