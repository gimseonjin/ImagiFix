import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import UserController from './user.controller';
import { WebhookController } from './webhook.controller';
import { SvixWebhookGuard } from './guard/svix-webhook.guard';
import { ImageModule } from 'src/image/image.module';
import ImageController from './image.controller';
import { HttpLoggerMiddleware } from './middleware/http-logger.middleware';

@Module({
  imports: [UserModule, ImageModule],
  controllers: [UserController, WebhookController, ImageController],
  providers: [SvixWebhookGuard],
})
export class ApiModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
