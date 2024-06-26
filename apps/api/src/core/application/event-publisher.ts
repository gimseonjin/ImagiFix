import { Injectable, Logger } from '@nestjs/common';
import { DomainEventBase } from '../domain/domain-event';
import { TransactionProvider } from '../infrastructure/transaction.provider';

/**
 * Note:
 * 
 * The publish function used here differs somewhat from traditional DDD (Domain-Driven Design) practices.
 * 
 * Typically, events should be published at the moment they are stored in the database. However, due to
 * limitations in implementing this with Prisma, we are currently saving the events to the database first,
 * and then using a scheduled task to execute them sequentially at a later time.
 * 
 * This approach needs to be improved in the future.
 */

@Injectable()
export class EventPublisher {
  constructor(
    private logger: Logger,
    private prisma: TransactionProvider,
  ) {}

  async publish(events: DomainEventBase[]) {
    this.logger.log(`Publishing ${events.length} events`);

    await this.prisma.instance.domainEvent.createMany({
      data: events.map((event) => ({
        id: event.eventId,
        type: event.eventType,
        data: JSON.stringify(event),
      })),
    });
  }
}
