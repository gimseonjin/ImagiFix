import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepositoryImpl } from './infrastructure/user.repository';
import { UserRepositoryProviderKey } from 'src/user/domain/user.repository';
import { PrismaProvider } from './infrastructure/prisma.provider';
import { ImageRepositoryProviderKey } from 'src/image/domain/image.repository';
import { ImageRepositoryImpl } from './infrastructure/image.repository';
import { MailSender } from './infrastructure/mail.sender';
import Logger from './logger';
import { ClsModule } from 'nestjs-cls';

const RepoProviders = [
  {
    provide: UserRepositoryProviderKey,
    useClass: UserRepositoryImpl,
  },
  {
    provide: ImageRepositoryProviderKey,
    useClass: ImageRepositoryImpl,
  },
];

@Global()
@Module({
  imports: [
    CqrsModule,
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
  ],
  providers: [...RepoProviders, PrismaProvider, MailSender, Logger],
  exports: [CqrsModule, ...RepoProviders, MailSender, Logger],
})
export class CoreModule {}
