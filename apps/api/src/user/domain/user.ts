import { UserCreatedEvent } from './user-created.event';
import { BaseAggregateRoot } from '../../core/domain/base-aggregate-root';
import { UserDeletedEvent } from './user-deleted.event';

type CreateUserProps = {
  id?: string;
  clerkId: string;
  email: string;
  username?: string;
  photo?: string;
  firstName?: string;
  lastName?: string;
  planId?: number;
  creditBalance?: number;
};

type UpdateUserProps = {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

export class User extends BaseAggregateRoot {
  public readonly clerkId: string;
  public readonly email: string;
  public readonly planId: number;
  public creditBalance: number;
  public username?: string;
  public photo?: string;
  public firstName?: string;
  public lastName?: string;

  constructor(props: CreateUserProps) {
    super(props.id);
    this.clerkId = props.clerkId;
    this.email = props.email;
    this.username = props.username;
    this.photo = props.photo;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.planId = props.planId ?? 1;
    this.creditBalance = props.creditBalance ?? 10;
  }

  create() {
    this.apply(
      new UserCreatedEvent({
        username: this.username,
        email: this.email,
        createdAt: new Date(),
      }),
    );
  }

  update(props: UpdateUserProps) {
    this.username = props.username;
    this.photo = props.photo;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
  }

  delete() {
    this.apply(
      new UserDeletedEvent({ userId: this.id, deletedAt: new Date() }),
    );
  }

  decreaseCreditBalance(amount: number) {
    if (this.creditBalance < amount) {
      throw new Error('Insufficient credit balance');
    }
    this.creditBalance -= amount;
  }
}
