import { AggregateRoot } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';

export abstract class BaseAggregateRoot extends AggregateRoot {
  public readonly id: string;

  constructor(id?: string) {
    super();
    this.id = id ?? randomUUID();
    this.autoCommit = true;
  }
}
