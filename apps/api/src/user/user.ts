import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { randomUUID } from 'crypto';
import { AggregateRoot } from 'src/core/domain/aggregate-root';
import { domainEvent } from 'src/core/domain/domain-event';

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

export class User extends AggregateRoot<Props> {
  constructor(props: Props) {
    super(props);
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

    user.addEvent(
      new UserCreatedEvent({
        userId: user.id,
        createdAt: new Date(),
      }),
    );

    return user;
  }
}

export class UserCreatedPayload {
  @IsString()
  userId: string;

  @Type(() => Date)
  createdAt: Date;
}

export class UserCreatedEvent extends domainEvent<UserCreatedPayload>(
  'user.created',
) {}

export class UserDeletedEvent extends domainEvent<{ userId: string }>(
  'user.deleted',
) {}
