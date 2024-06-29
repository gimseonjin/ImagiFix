import { IEvent } from '@nestjs/cqrs';

export class UserCreatedEvent implements IEvent {
  constructor(public readonly payload: UserCreatedPayload) {}
}

export class UserCreatedPayload {
  userId: string;
  createdAt: Date;
}
