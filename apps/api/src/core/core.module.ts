import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepositoryImpl } from './infrastructure/user.repository';
import { UserRepositoryProviderKey } from 'src/user/domain/user.repository';
import { PrismaProvider } from './infrastructure/prisma.provider';
import { ImageRepositoryProviderKey } from 'src/image/domain/image.repository';
import { ImageRepositoryImpl } from './infrastructure/image.repository';

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
  imports: [CqrsModule],
  providers: [...RepoProviders, PrismaProvider],
  exports: [CqrsModule, ...RepoProviders],
})
export class CoreModule {}
