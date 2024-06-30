import { IEvent } from '@nestjs/cqrs';

export class UserDeletedEvent implements IEvent {
  constructor(public readonly payload: UserDeletedEventPayload) {}
}

export class UserDeletedEventPayload {
  userId: string;
  deletedAt: Date;
}
