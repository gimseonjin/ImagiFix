import { Module } from '@nestjs/common';
import { SendWelcomeEmailHandler } from './send-welcome-mail.handler';

@Module({
  providers: [SendWelcomeEmailHandler],
})
export class NotificationModule {}
