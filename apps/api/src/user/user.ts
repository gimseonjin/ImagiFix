import { AggregateRoot } from '@nestjs/cqrs';
import { IEvent } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';

type Props = {
  id: string;
  clerkId?: string;
  email?: string;
  username?: string;
  photo?: string;
  firstName?: string;
  lastName?: string;
  planId?: number;
  creditBalance?: number;
};

export class User extends AggregateRoot {
  constructor(public readonly props: Props) {
    super();
  }

  static create(
    clerkId: string,
    email: string,
    username: string,
    photo: string,
    firstName?: string,
    lastName?: string,
  ): User {
    const user = new User({
      id: randomUUID(),
      clerkId,
      email,
      username,
      photo,
      firstName,
      lastName,
      planId: 1,
      creditBalance: 10,
    });

    user.apply(new UserCreatedEvent(user.props.id, new Date()));
    return user;
  }

  delete(): void {
    this.apply(new UserDeletedEvent(this.props.id));
  }
}

export class UserCreatedEvent implements IEvent {
  constructor(
    public readonly userId: string,
    public readonly createdAt: Date,
  ) {}
}

export class UserDeletedEvent implements IEvent {
  constructor(
    public readonly userId: string,
  ) {}
}

export class UserCreatedPayload {
  userId: string;
  createdAt: Date;
}