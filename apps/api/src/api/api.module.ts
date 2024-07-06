import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import UserController from './user.controller';
import { WebhookController } from './webhook.controller';
import { SvixWebhookGuard } from './guard/svix-webhook.guard';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [UserModule, ImageModule],
  controllers: [UserController, WebhookController],
  providers: [SvixWebhookGuard],
})
export class ApiModule {}
