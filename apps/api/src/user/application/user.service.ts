import { Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { EventPublisher } from '@nestjs/cqrs';
import { ICreateUser } from './user.interface';

@Injectable()
export default class UserService {
  constructor(private readonly publisher: EventPublisher) {}

  async create(props: ICreateUser) {
    const userModel = this.publisher.mergeClassContext(User);
    new userModel(props);
  }
}
