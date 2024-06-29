import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepositoryImpl } from './infrastructure/user.repository';
import { UserRepositoryProviderKey } from 'src/user/domain/user.repository';
import { PrismaProvider } from './infrastructure/prisma.provider';

const RepoProviders = [
  {
    provide: UserRepositoryProviderKey,
    useClass: UserRepositoryImpl,
  },
];

@Global()
@Module({
  imports: [CqrsModule],
  providers: [...RepoProviders, PrismaProvider],
  exports: [CqrsModule, ...RepoProviders],
})
export class CoreModule {}
