import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CoreModule,
    UserModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
