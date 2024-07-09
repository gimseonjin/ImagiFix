import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import Logger from '../logger';
import { UseCls } from 'nestjs-cls';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PrismaProvider
  extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
  implements OnModuleInit
{
  logger: Logger;
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });

  }

  async onModuleInit() {
    await this.$connect();

    this.$on('query', (e) => {
      this.logger = new Logger('Prisma');
      this.logger.info(
        `Query: ${e.query}, Params: ${e.params}, Duration: ${e.duration}ms`,
      );
    });
  }
}
