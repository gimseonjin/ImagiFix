import { IEvent } from '@nestjs/cqrs';
import { Image } from './image';

export class ImageCreatedEvent implements IEvent {
  constructor(public readonly payload: ImageCreatedPayload) {}
}

export class ImageCreatedPayload {
  image: Image;
}
