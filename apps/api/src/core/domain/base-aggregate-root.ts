import { AggregateRoot } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';

export abstract class BaseAggregateRoot extends AggregateRoot {
  public readonly id: string;

  constructor() {
    super();
    this.id = randomUUID();
    this.autoCommit = true;
  }
}
