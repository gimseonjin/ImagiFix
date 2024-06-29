import { UserCreatedEvent } from './user-created.event';
import { BaseAggregateRoot } from 'src/core/domain/base-aggregate-root';

type CreateUserProps = {
  id?: string;
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
  public readonly clerkId?: string;
  public readonly email?: string;
  public readonly username?: string;
  public readonly photo?: string;
  public readonly firstName?: string;
  public readonly lastName?: string;
  public readonly planId: number;
  public readonly creditBalance: number;

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

    this.apply(
      new UserCreatedEvent({ userId: this.id, createdAt: new Date() }),
    );
  }
}
