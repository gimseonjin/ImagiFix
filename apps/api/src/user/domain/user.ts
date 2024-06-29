import { UserCreatedEvent } from './user-created.event';
import { BaseAggregateRoot } from 'src/core/domain/base-aggregate-root';

type CreateUserProps = {
  clerkId?: string;
  email?: string;
  username?: string;
  photo?: string;
  firstName?: string;
  lastName?: string;
  planId?: number;
  creditBalance?: number;
};

export class User extends BaseAggregateRoot {
  constructor(public readonly props: CreateUserProps) {
    super();
    this.apply(
      new UserCreatedEvent({ userId: this.id, createdAt: new Date() }),
    );
  }
}
